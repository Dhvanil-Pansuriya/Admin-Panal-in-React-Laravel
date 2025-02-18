import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    role?: string;
}

const AddUser: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 0,
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null)


    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        // Name validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
            isValid = false;
        } else if (formData.name.length > 255) {
            newErrors.name = 'Name cannot exceed 255 characters';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Password confirmation validation
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
            isValid = false;
        }

        // Role validation
        if (formData.role === undefined || formData.role === null) {
            newErrors.role = 'Role is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error for the field being edited
        if (errors[name as keyof ValidationErrors]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage({ text: 'Please correct the errors in the form', type: 'error' });
            return;
        }

        const token = localStorage.getItem("authToken")
        if (!token) {
            setError("No authentication token found. Please log in.")
            return
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_ADMIN_API}/user`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage({ text: 'User created successfully!', type: 'success' });
            console.log('User created:', response.data.user);
            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: 0,
            });
            setErrors({});
        } catch (error: any) {
            if (error.response?.data?.message === "Email already exists") {
                setMessage({ text: 'Email already exists', type: 'error' });
                setErrors({ email: 'Email already exists' });
            } else {
                setMessage({
                    text: error.response?.data?.message || 'Failed to create user.',
                    type: 'error'
                });
            }
            console.error('There was an error creating the user!', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = (error?: string) => `
        w-full px-4 py-2 transition-all duration-300 border rounded-md 
        focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none 
        hover:border-gray-300 bg-white
        ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}
    `;
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
    const errorClasses = "mt-1 text-sm text-red-600";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Add User</h1>
                <div className="bg-gray-100 rounded-full p-2 transition-transform duration-300 hover:scale-105">
                    <UserPlus className="h-5 w-5 text-gray-600" />
                </div>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="name" className={labelClasses}>Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClasses(errors.name)}
                                    placeholder="Enter name"
                                />
                                {errors.name && <p className={errorClasses}>{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClasses}>Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses(errors.email)}
                                    placeholder="Enter email"
                                />
                                {errors.email && <p className={errorClasses}>{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className={labelClasses}>Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={inputClasses(errors.password)}
                                    placeholder="Enter password"
                                />
                                {errors.password && <p className={errorClasses}>{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className={labelClasses}>Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className={inputClasses(errors.password_confirmation)}
                                    placeholder="Confirm password"
                                />
                                {errors.password_confirmation && (
                                    <p className={errorClasses}>{errors.password_confirmation}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="role" className={labelClasses}>Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={inputClasses(errors.role)}
                                >
                                    <option value={0}>User</option>
                                    <option value={1}>Admin</option>
                                </select>
                                {errors.role && <p className={errorClasses}>{errors.role}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    'Add User'
                                )}
                            </button>
                        </div>
                    </form>

                    {message && (
                        <div className={`mt-6 p-4 rounded-md transition-all duration-500 ease-in-out animate-slideIn ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                            <div className="flex items-center">
                                {message.type === 'success' ? (
                                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                                )}
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddUser;