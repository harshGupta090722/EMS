import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets';
import { Loader2Icon } from 'lucide-react';

const EmployeeForm = ({ initialData, onSucess, onCancel }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const isEditMode = !!initialData;

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>
            {/* Personal Information */}
            <div className='card p-5 sm:p-6'>
                <h3 className='font-medium mb-6 pb-6 border-b border-slate-100'>Personal Information</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                    <div>
                        <label htmlFor='block mb-2'>First Name</label>
                        <input name='firstName' required defaultValue={initialData?.firstName}></input>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Last Name</label>
                        <input name='lasttName' required defaultValue={initialData?.lastName}></input>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Phone Number</label>
                        <input name='phone' required defaultValue={initialData?.phone}></input>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Join Data</label>
                        <input type="date" name="joinDate" required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split('T')[0] : ""}></input>
                    </div>

                    <div className='sm:col-span-2'>
                        <label htmlFor='block mb-2'>Bio (optional)</label>
                        <textarea name="bio" rows={3} defaultValue={initialData?.bio} className="resize-none" placeholder='Brief Description' />
                    </div>

                </div>
            </div>

            {/* Employment Details */}
            <div className="card p-5 sm:p-6">
                <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
                    Employment Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                        <label className="block mb-2">Department</label>
                        <select name="department" defaultValue={initialData?.department || ""}>
                            <option value="">Select Department</option>
                            {DEPARTMENTS.map((deptName) => (
                                <option key={deptName} value={deptName}>
                                    {deptName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Position</label>
                        <input name='position' required defaultValue={initialData?.position}></input>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Basic Salary</label>
                        <input type="number" name='basicsalary' required min="0" step="0.01" defaultValue={initialData?.basicSalary || 0}></input>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Allowances</label>
                        <input type="number" name='allowances' required min="0" step="0.01" defaultValue={initialData?.allowances || 0}></input>
                    </div>

                    <div>
                        <label htmlFor='block mb-2'>Deductions</label>
                        <input type="number" name='deductions' required min="0" step="0.01" defaultValue={initialData?.deductions || 0}></input>
                    </div>

                    {isEditMode && (
                        <div>
                            <label htmlFor='block mb-2'>status</label>
                            <select name="employmentStatus" defaultValue={initialData?.employmentStatus}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>


            {/* Account Setup */}
            <div className='card p-5 sm:p-6'>
                <h3 className='text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100'>Account Setup</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>

                    <div className='sm:col-span-2'>
                        <label htmlFor='block mb-2'>Work Email</label>
                        <input type="email" name='email' required defaultValue={initialData?.email}></input>
                    </div>

                    {!isEditMode && (
                        <div>
                            <label htmlFor='block mb-2'>Temporary Password</label>
                            <input type="password" name='password' required></input>
                        </div>
                    )}

                    {isEditMode && (
                        <div>
                            <label htmlFor='block mb-2'>Change Password(Optional)</label>
                            <input type="password" name='password' placeholder='Leave Blank to keep current'></input>
                        </div>
                    )}

                    <div>
                        <label htmlFor='block mb-2'>System Role</label>
                        <select name="role" defaultValue={initialData?.role || "EMPLOYEE"}>
                            <option value="EMPLOYEE">Employee</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>


                </div>
            </div>


            {/* buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">

                <button type="button" onClick={() => (onCancel ? onCancel() : navigate(-1))} className="btn-secondary">
                    Cancel
                </button>

                <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center ">
                    {loading && <Loader2Icon className='w-4 h-4 mr-2 animate-spin' />}
                    {isEditMode ? "Update Employee" : "Create Employee"}
                </button>
                
            </div>

        </form >
    )
}

export default EmployeeForm