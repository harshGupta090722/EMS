import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

//Create leave
//POST /api/leave

export const createLeave = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });

        if (!employee)
            return res.status(404).json({ message: "Employee not found" });

        if (employee.isDeleted)
            return res.status(403).json({ message: "Your account id deactivated.You cannot create leave" });

        const { type, startDate, endDate, reason } = req.body;

        if (!type || !startDate || !endDate || !reason)
            return res.status(400).json({ message: "Please provide all the required fields" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(startDate) < today || new Date(endDate) < today)
            return res.status(400).json({ message: "Please provide valid dates" });

        if (new Date(endDate) < today || new Date(startDate) < today)
            return res.status(400).json({ message: "end date must be greater than start date" });

        const leave = await LeaveApplication.create({
            employeeId: employee._id,
            type,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            status: "PENDING"
        });

        return res.json({
            success: true,
            data: leave
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to create leave" });
    }
}

//Get leave
//GET /api/leaves
export const getLeaves = async (req, res) => {
    try {
        const session = req.session;


        const isAdmin = session.role === "ADMIN";


        if (isAdmin) {
            const status = req.query.status;
            const where = status ? { status } : {}

            const leaves = await LeaveApplication.find(where).
                populate("employeeId").sort({ createdAt: -1 });


            const data = leaves.map((l) => {
                const obj = l.toObject();

                return {
                    ...obj,
                    id: obj._id.toString(),
                    employee: obj.employeeId,
                    employeeId: obj.employeeId?._id?.toString()
                }
            })

            return res.json({
                data
            })
        } else {
            const employee = await Employee.findOne({ userId: session.userId }).lean();

            if (!employee)
                return res.status(404).json({ error: "Not Found" });

            const leaves = await LeaveApplication.find({
                employeeId: employee._id
            }).sort({ createdAt: -1 });

            return res.json({
                data: leaves,
                employee: { ...employee, id: employee._id.toString() }
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to fetch leaves" });
    }
}


//Update leave status
//PATCH /api/leaves/:id
export const updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["AP[ROVED", "REJECTED", "PENDING"].includes(status))
            return res.status(400).json({ error: "invalid status" });


        const leave = await LeaveApplication.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });

        return res.json({
            success: true,
            data: leave
        })


    } catch (error) {
        return res.status(500).json({ error: "Failed" });
    }
}