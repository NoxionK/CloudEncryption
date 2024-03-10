'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Define validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase char')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

type FormData = Yup.InferType<typeof validationSchema>;


const EncryptForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: FormData) => {
        toast.success('[EncryptForm.tsx][ToDo]: Send POST request to encrypt data with password.');
        router.push('/upload/encrypt-process');
    };

    return (
        <form className='flex flex-col justify-center w-2/3 h-full space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col justify-center space-y-2'>
                {/* <div className='font-bold' >Encyption Password:</div> */}
                <div className='flex flex-col w-full justify-center'>
                    <Input
                        label='Encyption Password:'
                        placeholder="****************"   
                        labelPlacement="outside"
                        type={showPassword ? 'text' : 'password'} {...register('password')}
                        onCopy={(e) => { e.preventDefault() }}
                        endContent={
                            <div
                                className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOffIcon></EyeOffIcon> : <EyeIcon></EyeIcon>}
                            </div>}
                        classNames={{label: 'font-bold'}
                        }
                    />

                </div>
                {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
            </div>


            <div className='flex flex-col justify-center space-y-2'>
                {/* <div className='font-bold'>Confirm Password:</div> */}
                <div className='flex flex-col w-full justify-center'>
                    <Input         
                        label='Confirm Password:'      
                        placeholder="****************"  
                        labelPlacement="outside"       
                        type={showPassword ? 'text' : 'password'} {...register('confirmPassword')}
                        onCopy={(e) => { e.preventDefault() }}
                        endContent={
                            <div
                                className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOffIcon></EyeOffIcon> : <EyeIcon></EyeIcon>}
                            </div>
                        }
                        classNames={{label: 'font-bold'}}
                    />

                </div>
                {errors.confirmPassword && <p className='text-red-500 text-xs italic'>{errors.confirmPassword.message}</p>}


            </div>

            <div className='flex flex-col w-full justify-center items-center'>
                <Button type='submit' className='w-full font-medium' color='primary'>Encrypt</Button>
            </div>

        </form>
    );

}

export default EncryptForm;