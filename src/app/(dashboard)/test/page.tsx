'use client';

import { login } from "@/lib/api/authApi"
import React from "react"

const Test = () => {

    async function handleButton() {
        console.log("button click!")
        try {
            const result = await login({
                login: "admin",
                password: "admin00000"
            });

            console.log("Login result:")
            console.log(result);
        } catch (err){
            console.error(err)
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Strona testowa</h1>
            <h2>Testowy opis</h2>
            <p>login:</p>
            <input type="text" className="border"/>
            <p>password:</p>
            <input type="password" className="border"/>
            <button 
                onClick={handleButton}
                className="bg-blue-600 text-white py-2 px-4 mt-6"
            >
                Action
            </button>
        </div>
    )
}

export default Test