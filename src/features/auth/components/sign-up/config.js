import * as yup from 'yup';

// Sign up form validation schema
export const signUpSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number (no special characters allowed)'
        )
});

// Default values for sign up form
export const signUpDefaultValues = {
    name: '',
    email: '',
    password: ''
};
