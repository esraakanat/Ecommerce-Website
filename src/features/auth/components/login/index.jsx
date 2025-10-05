import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginSchema, loginDefaultValues } from './config';
import { loginUser } from '../../services/api';
import useAuthStore from '../../store';
import { getNextUrl, getSafeRedirectUrl } from '../../../../shared/utils/authRedirect';
import loginImage from '../../../../assets/login assets/dl.beatsnoop 1.png';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [apiError, setApiError] = useState('');
    const [searchParams] = useSearchParams();
    
    // Get the next parameter from URL and validate it
    const nextUrl = getSafeRedirectUrl(getNextUrl(searchParams));

    const {register,handleSubmit,formState: { errors, isSubmitting }} = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: loginDefaultValues
    });

    const onSubmit = async (data) => {
        try {
            setApiError('');
            
            const result = await loginUser(data);
            
            if (result.success) {
                login(result.user, result.token);
                navigate(nextUrl);
            }
        } catch (error) {
            console.error('Login error:', error);
            setApiError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <motion.div 
            className="mb-24 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="flex flex-col lg:flex-row min-h-screen lg:min-h-[calc(80vh-35px)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <motion.div 
                    className="w-full lg:w-[45%] mt-0 lg:mt-12 rounded-none md:rounded-md flex items-center justify-center relative overflow-hidden h-80 sm:h-96 md:h-[500px] lg:h-auto lg:max-h-[500px]"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.div 
                        className="relative w-full h-full flex items-center justify-center scale-95 sm:scale-100 lg:scale-100"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.img 
                            src={loginImage} 
                            alt="Shopping illustration" 
                            className="w-full h-full object-contain lg:object-cover lg:object-left"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        />
                    </motion.div>
                </motion.div>
                <motion.div 
                    className="w-full lg:w-[55%] bg-white flex items-center justify-center p-6 sm:p-8 lg:p-12"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.div 
                        className="w-full max-w-md lg:max-w-xs"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.div 
                            className="mb-6 lg:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <motion.h1 
                                className="text-xl sm:text-2xl lg:text-3xl font-bold font-inter text-black mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Log in to Exclusive
                            </motion.h1>
                            <motion.p 
                                className="text-gray-600 text-sm sm:text-base font-poppins"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                Enter your details below
                            </motion.p>
                        </motion.div>

                        {apiError && (
                            <motion.div 
                                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md"
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex">
                                    <motion.div 
                                        className="flex-shrink-0"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                    >
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                    <motion.div 
                                        className="ml-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <h3 className="text-sm font-medium text-red-800">
                                            Login Failed
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>{apiError}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        <motion.form 
                            onSubmit={handleSubmit(onSubmit)} 
                            className="space-y-5 sm:space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                           
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 }}
                            >
                                <motion.input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full py-2.5 sm:py-3 border-0 border-b font-poppins bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400 ${
                                        errors.email ? 'border-red-500' : 'border-black focus:border-gray-500'
                                    }`}
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                />
                                {errors.email && (
                                    <motion.p 
                                        className="text-red-500 text-xs mt-1 font-poppins"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 1.0 }}
                            >
                                <motion.input
                                    {...register('password')}
                                    type="password"
                                    placeholder="Password"
                                    className={`w-full py-2.5 sm:py-3 border-0 border-b font-poppins bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400 ${
                                        errors.password ? 'border-red-500' : 'border-black focus:border-gray-500'
                                    }`}
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                />
                                {errors.password && (
                                    <motion.p 
                                        className="text-red-500 text-xs mt-1 font-poppins"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {errors.password.message}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div 
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.1 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#DB4444] text-white px-6 py-3 rounded-md font-medium text-base hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Log In'}
                                </motion.button>
                                
                                <motion.a 
                                    href="/forgot-password" 
                                    className="text-[#DB4444] text-base hover:text-red-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Forget Password?
                                </motion.a>
                            </motion.div>
                        </motion.form>

                        
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    
    );
}

export default Login;