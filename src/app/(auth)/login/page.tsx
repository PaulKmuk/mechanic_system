'use client';

import FormLogin from '@/components/auth/FormLogin'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (user) {
            router.replace("/");
        }
    },[user, isLoading, router]);

    if (isLoading || user) {
        return null;
    }

    return (
        <div className='authPage'>
            <FormLogin />
        </div>
    )
}

export default Login