import React, { useState, useEffect, Component } from 'react';
import axios from "axios";

export const UserFile = () => {
const [user_, setUser] = useState([]);

const getUser = async () => {
    try {
        const { data } = await axios.get("http://localhost:3001/api/user/157830bd-2c8c-4b93-b412-833c66ba9668");
        setUser(data);  
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getUser();
}, []);

const [isVisible, setIsVisible] = useState(true);

const handleToggle = () => {
  setIsVisible(!isVisible);
};

  return (
    <div className = "header">
        <button className ="corner-button" onClick={handleToggle}>Mostrar/Ocultar</button>
        {isVisible && 
        <div className = "user-info">
        <p>{user_.full_name}</p>
        <>
            {
                user_.tb_as_user_cryptocurrencies && user_.tb_as_user_cryptocurrencies.map( (e, i) => {
                    return (
                        <div className='div-currency'>
                            <p key={i}>{e.currency_data + ": " + e.currency_formated}</p>
                        </div>
                    )
                })   
            }
        </>
        <>
            {
                user_.tb_bank_accounts && user_.tb_bank_accounts.map( (e, i) => {
                    return (
                    <div className='div-data'>
                        <p key={i}>Numero de Cuenta</p>
                        <p key={i}>{e.no_account}</p>
                        <p key={i}>Saldo</p>
                        <p key={i}>{e.currency_formated}</p>
                    </div>    
                    )
                })   
            }
        </>
        </div>}
    </div>
  )
}
