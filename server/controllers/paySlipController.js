import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

//Create PaySlip
//POST /api/payslip

export const createPaySlip = async (req, res) => {
    try {
        const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;

        if (!employeeId || !month || !year || !basicSalary || !allowances || !deductions) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

        const payslip = await Payslip.create({
            employeeId,
            month: Number(month),
            year: Number(year),
            basicSalary: Number(basicSalary),
            allowances: Number(allowances),
            deductions: Number(deductions),
            netSalary
        });

        res.status(201).json({ success: true, payslip });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create payslip" });
    }
};


//get PaySlip
//GET /api/payslip

export const getPaySlips = async (req, res) => {
    try {
        const session = req.session;

        const isAdmin = session.role == "ADMIN";

        if (isAdmin) {
            const paySlips = await Payslip.find().populate("employeeId").sort({ createdAt: -1 });

            const data = paySlips.map((p) => {
                const obj = p.toObject();
                return {
                    ...obj,
                    id: obj._id.toString(),
                    employee: obj.employeeId,
                    employeeId: obj.employeeId._id?.toString(),
                }
            })

            return res.json({ data });
        } else {
            const employee = await Employee.findOne({ userId: session.userId });

            if (!employee)
                return res.status(404).json({ error: "Not found" });

            const payslips = await Payslip.find({ employeeId: employee._id }).sort({ createdAt: -1 });

            return res.json({ data: payslips });
        }
    } catch (error) {
        return res.status(500).json("Failed to get paySlip");
    }
};


//get PaySlip by ID
//GET /api/payslip/:id

export const getPaySlipById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id)
            return res.status(400).json({ message: "Not found" });

        const payslip = await Payslip.findById(id).populate("employeeId").lean();

        if (!payslip) {
            return res.status(404).json({ error: "Payslip not found" })
        }

        const result = {
            ...payslip,
            id: payslip._id.toString(),
            employee: payslip.employeeId,
        }

        return res.json(result);

    } catch (error) {
        return res.status(500).json("Failed to get payslip");
    }
};