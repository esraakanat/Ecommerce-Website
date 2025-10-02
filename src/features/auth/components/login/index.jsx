import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginSchema, loginDefaultValues } from './config';
import { loginUser } from '../../services/api';
import useAuthStore from '../../store';
import { getNextUrl, getSafeRedirectUrl } from '../../../../shared/utilities/authRedirect';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [apiError, setApiError] = useState('');
    const [searchParams] = useSearchParams();
    
    // Get the next parameter from URL and validate it
    const nextUrl = getSafeRedirectUrl(getNextUrl(searchParams));

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: loginDefaultValues
    });

    const onSubmit = async (data) => {
        try {
            setApiError('');
            
            // Call login API
            const result = await loginUser(data);
            
            if (result.success) {
                // Store user data and token
                login(result.user, result.token);
                
                // Redirect to the intended page or home page
                navigate(nextUrl);
            }
        } catch (error) {
            console.error('Login error:', error);
            setApiError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        
            
            <div className="mb-24 bg-white">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[calc(80vh-35px)]">
                {/* Left Side - Image Section */}
                <div className="w-full lg:w-[45%] mt-0 lg:mt-12 rounded-none md:rounded-md flex items-center justify-center relative overflow-hidden h-80 sm:h-96 md:h-[500px] lg:h-auto lg:max-h-[500px]">
                    <div className="relative w-full h-full flex items-center justify-center scale-95 sm:scale-100 lg:scale-100">
                        {/* Original Image */}
                        <img 
                            src="/src/assets/sign up assets/dl.beatsnoop 1.png" 
                            alt="Shopping illustration" 
                            className="w-full h-full object-contain lg:object-cover lg:object-left"
                        />
                    </div>
                </div>
                
                {/* Right Side - Form Section */}
                <div className="w-full lg:w-[55%] bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12">
                    <div className="w-full max-w-md lg:max-w-xs">
                        {/* Header */}
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-inter text-black mb-2">Log in to Exclusive</h1>
                            <p className="text-gray-600 text-sm sm:text-base font-poppins">Enter your details below</p>
                        </div>

                        {/* Error Message */}
                        {apiError && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Login Failed
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>{apiError}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                           
                            {/* Email Field */}
                            <div>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full py-2.5 sm:py-3 border-0 border-b font-poppins bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400 ${
                                        errors.email ? 'border-red-500' : 'border-black focus:border-gray-500'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1 font-poppins">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <input
                                    {...register('password')}
                                    type="password"
                                    placeholder="Password"
                                    className={`w-full py-2.5 sm:py-3 border-0 border-b font-poppins bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400 ${
                                        errors.password ? 'border-red-500' : 'border-black focus:border-gray-500'
                                    }`}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1 font-poppins">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Log In Button and Forget Password Link */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#DB4444] text-white px-6 py-3 rounded-md font-medium text-base hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Log In'}
                                </button>
                                
                                <a href="/forgot-password" className="text-[#DB4444] text-base hover:text-red-700 transition-colors">
                                    Forget Password?
                                </a>
                            </div>
                        </form>

                        
                    </div>
                </div>
            </div>
            </div>
    
    );
}

export default Login;