'use client';
import React, { useState } from 'react'
import { NotebookPen, KeyRound, LockKeyhole } from 'lucide-react'
import Link from 'next/link'

const FormRegister = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [errorLogin, setErrorLogin] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // setErrorLogin("przykładowey bład");
        setErrorPassword("przykładowey bład");
    } 

    return (
        <form onSubmit={handleSubmit} className='authForm'>
            <div className='authHeader'>
                <NotebookPen size={38} />
                <h2>Zarejestruj się</h2>
                <p>Mechanic System</p>
            </div>
            {/* --- LOGIN ---  */}
            <div className='authField'>
                <label htmlFor="">Login:</label>
                <div>
                    <KeyRound size={14} />
                    <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder='Podaj login' 
                        type="text"/>
                </div>            
                <p>{errorLogin}</p>
            </div>
            {/* --- PASSWORD ---  */}
            <div className='authField'>
                <label htmlFor="">Hasło:</label>
                <div>
                    <LockKeyhole size={16} />
                    <input
                        placeholder='Podaj hasło' 
                        type="password"/>
                </div>
                <p>{errorPassword}</p>
            </div>
            <div className='authField'>
                <label htmlFor="">Potwierdź hasło:</label>
                <div>
                    <LockKeyhole size={16} />
                    <input
                        placeholder='Potwierdź hasło' 
                        type="password"/>
                </div>
                <p>{errorPassword}</p>
            </div>
            <button type='submit' className='authButton'>Zarejestruj</button>
            <div className='authFooter'>
                <p>Masz już konto?</p>
                <Link href='/login'>Zaloguj się</Link>
            </div>
        </form>
    )
}

export default FormRegister