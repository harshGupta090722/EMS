import { Loader2, Plus, X } from 'lucide-react';
import React, { useState } from 'react'

const GeneratePaySlipForm = ({ employees, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen)
        return (
            <button
                onClick={() => setIsOpen(true)}
                className='btn-primary flex items-center gap-2'
            >
                <Plus size={18} />
                Generate PaySlip
            </button>
        )

    const handleSubmit = async (e) => {
        e.preventDefault();
    }



    if (!loading)

        return (
            <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                <div className='card max-w-lg w-full p-6 animate-slide-up'>
                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='text-lg font-bold text-slate-900'>Generate Monthly PaySlip</h3>
                        <button onClick={() => setIsOpen(false)} className='text-slate-400 hover:text-slate-600 p-1'>
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-4'>

                        {/* select employee */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Employee</label>
                            <select name='employeeId' required>
                                <option value="">Select Employee</option>
                                {employees.map((e) => (
                                    <option key={e._id} value={e._id}>
                                        {e.firstName} {e.lastName} ({e.position})
                                    </option>
                                ))}
                            </select>
                        </div>



                        {/* select month & year */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-700 mb-2'>
                                    Month
                                </label>
                                <select name="month" required>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-slate-700 mb-2'>Year</label>
                                <input type="number" name="year" defaultValue={new Date().getFullYear()} required />
                            </div>
                        </div>


                        {/* Basic Salary */}
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Basic Salary</label>
                            <input type="number" name="basicSalary" defaultValue={0} required />
                        </div>


                        {/*  Allowance and Deductions  */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-700 mb-2'>Allowances</label>
                                <input type="number" name="allowances" defaultValue={0} required />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-slate-700 mb-2'>Deductions</label>
                                <input type="number" name="deductions" defaultValue={0} required />
                            </div>
                        </div>


                        {/* Buttons */}
                        <div className='flex justify-end gap-3 pt-2'>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className='btn-secondary'>
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className='btn-primary flex items-center'
                                disabled={loading}>

                                {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
                                Generate

                            </button>
                        </div>


                    </form>
                </div >
            </div >
        )
}

export default GeneratePaySlipForm