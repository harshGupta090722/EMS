import mongoose, { model } from "mongoose";


const PayslipSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    allowances: {
        type: Number,
        default: 0,
    },
    deductions: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
        default: 0
    }
},
    { timestamps: true });

const Payslip = mongoose.model("Payslip", PayslipSchema);
export default Payslip;