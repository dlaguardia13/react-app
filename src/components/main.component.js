import React, { useState, useEffect } from 'react'
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect, Link, Routes, useNavigate } from 'react-router-dom';

import { BuyInterface } from './buyInterface.component';
import { SellInterface } from './sellInterface.component';
import { ExchangeInterface } from './exchange.component';
import { Logs } from './logs.component';
import { CryptoValue } from './cryptoValue.component';
import { Logout } from './logout';

export const Main = (props) => {
    const [user_, setUser] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    let navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/api/user/${props.session.user_id}`);
            setUser(data);  
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      getUser();
  }, []);
    
    useEffect(() => {
        getUser();
    }, [isVisible]);

    const handleOnClick = (event) => {
      event.preventDefault();
  
      axios.put(`http://localhost:3001/api/user/logout/${props.session.user_id}`, null)
        .then((response) => {
          // props.logOut(props.session);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });

      props.logOut(props.session);
  
  };
    
    const handleToggle = () => {
      setIsVisible(!isVisible);
    };

  return (
    <div>
      <div>
        <nav>
          <ul className="menu">
            <li>
              <Link className="button-link" to="/home">🏚️ Inicio</Link>
            </li>
            <li>
              <Link className="button-link" to="/home/buy">💲 Comprar</Link>
            </li>
            <li>
              <Link className="button-link" to="/home/sell">💲 Vender</Link>
            </li>
            <li>
              <Link className="button-link" to="/home/exchange">💱 Cambiar</Link>
            </li>
            <li>
              <Link className="button-link" to="/home/log">🕐 Registro de Simulaciones</Link>
            </li>
            <li>
              <Link className="button-link" to="/home/historical">🔝 Valores Historicos</Link>
            </li>
            <li>
              <Link onClick={handleOnClick} className="button-link" to="/login">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className = "header">
        <button className ="corner-button" onClick={handleToggle}>👁️‍🗨️</button>
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
      <Routes>
          <Route path="/home/buy" element={<BuyInterface userData={user_}/>}/>
          <Route path="/home/sell" element={<SellInterface userData={user_}/>} />
          <Route path="/home/exchange" element={<ExchangeInterface userData={user_}/>} />
          <Route path="/home/log" element={<Logs userData={user_}/>} />
          <Route path="/home/historical" element={<CryptoValue userData={user_}/>} />
          <Route path="/login"/>
      </Routes>
    </div>
  )
}
