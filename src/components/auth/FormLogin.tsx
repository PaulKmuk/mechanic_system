"use client"
import React, { useState } from 'react'
import { CircleUserRound, KeyRound, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const FormLogin = () => {
    
    const route = useRouter();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (login != "" && password != "") {
            console.log("Poprawne logowanie!");
            console.log(`Login: ${login}`);
            console.log(`Hasło: ${password}`);
            setLogin("");
            setPassword("");

            // Przekierowanie 
            route.push("/");
        } else {
            setError("Podany login lub hasło jest nieprawidłowe!");
            console.log(error);
        }
    }

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
                <input type="checkbox" />
                <p>Zapamiętaj mnie</p>
            </div>
            <button type='submit' className='authButton'>Zaloguj</button>
            <div className='authFooter'>
                <p>Nie masz konta?</p>
                <Link href='/register'>Zarejestruj się</Link>
            </div>
        </form>
    )
}

export default FormLogin