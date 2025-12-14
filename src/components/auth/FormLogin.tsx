"use client"

import React, { useState } from 'react';
import { CircleUserRound, KeyRound, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const FormLogin = () => {
    
    const route = useRouter();

    // dane z provider'a 
    const { login: loginUser, isLoading } = useAuth();

    // localne dane formularza
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // metoda submit formularza
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // sprawdzenie login i password
        if (!login.trim() || !password) {
            setError("Podaj login i hasło.");
            return;
        }

        // loading - blokowanie akcji po przycisku submit
        setSubmitting(true);

        try {
            // wysyłamy zapytanie do backend
            await loginUser(login.trim(), password);
            // czyszczenie inputs
            setLogin("");
            setPassword("");
            // przekierownie po zalogowaniu
            route.push("/");
        } catch (err: any) {
            setError(err?.message ?? "Nie udało się zalogować");
        } finally {
            // odblokowanie akcji
            setSubmitting(false);
        }
    };

    const disabled = isLoading || submitting;

    return (
        <form onSubmit={handleSubmit} className='authForm'>
            <div className='authHeader'>
                <CircleUserRound size={38}/>
                <h2>Zaloguj się</h2>
                <p>Mechanic System</p>
            </div>
            <div className='authField'>
                <label htmlFor="">Login:</label>
                <div>
                    <KeyRound size={14} />
                    <input                      
                        onChange={(e) => setLogin(e.target.value)}  
                        value={login}                      
                        placeholder='Podaj login' 
                        type="text"/>
                </div>       
            </div>
            <div className='authField'>
                <label htmlFor="">Hasło:</label>
                <div>
                    <LockKeyhole size={16} />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Podaj hasło' 
                        type="password"/>
                </div>
                <p>{error ? error : ""}</p>
            </div>
            <div className='authCheckbox'>
                <input type="checkbox" disabled={disabled}/>
                <p>Zapamiętaj mnie</p>
            </div>
            <button type='submit' className='authButton' disabled={disabled}>
                {submitting ? "Logowanie..." : "Zaloguj"}
            </button>
            <div className='authFooter'>
                <p>Nie masz konta?</p>
                <Link href='/register'>Zarejestruj się</Link>
            </div>
        </form>
    )
}

export default FormLogin