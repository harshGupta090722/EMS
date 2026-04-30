import mongoose from "mongoose";



const leaveApplicationSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schhema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    type: {
        type: String,
        enum: ["SICK", "CASUAL", "ANNUAL"],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING"
    }
});


const LeaveApplication = mongoose.model("LeaveApplication", leaveApplicationSchema);
export default LeaveApplication;