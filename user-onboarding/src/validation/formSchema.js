import * as yup from 'yup';

const formSchema = yup.object().shape({ 
    first_name: yup
        .string()
        .trim()
        .required('First name is required'),
    last_name: yup
        .string()
        .trim()
        .required('Last name is required'),
    email: yup
        .string()
        .email('Must be a valid email address')
        .required('email is required'),
    password: yup
        .string()
        .required('A password is required')
        .min(8, 'Password must be at least 8 characters long'),
    tos: yup
        .boolean()
        .required('You must agree with the Terms Of Service')
        .defined('aklsjajklsf'),
})

export default formSchema;