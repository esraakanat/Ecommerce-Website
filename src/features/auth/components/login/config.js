import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,'Password must contain at least one uppercase letter, one lowercase letter, and one number (no special characters allowed)'
        )
});


export const loginDefaultValues = {
    email: '',
    password: ''
};
