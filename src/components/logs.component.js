import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Logs = (props) => {
    const [log_, setLog] = useState([]);
    const [filterData, setFilterData] = useState({
        cryptocurrency: '',
        type: '',
      });

    const handleChange = (event) => {    
        setFilterData({
            ...filterData,
            [event.target.name]: event.target.value,
        });
    };

    filterData.type = parseInt(filterData.type);

    const handleClick = () => {
        axios.get(`http://localhost:3001/api/operation/logs/${filterData.type}/${props.userData.user_id}?limit=&cryptocurrency=${filterData.cryptocurrency}`)
          .then((response) => {
            // console.log(response.data);
            setLog(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };


  return (
    <div>
        <div className="div-filer">
            <select id="cryptocurrency" name="cryptocurrency" onChange={handleChange} className="select" required>
                <option value="">- Criptomoneda -</option>
                <option value="5eae7503-fc9f-4498-85ac-a4db89c674a8">Bitcoin</option>
                <option value="77226ccc-681a-48a9-bda4-05bd5b718571">Ethereum</option>
                <option value="2bd6944f-75d8-4251-a4d6-3c09152920a9">Tether</option>
            </select>
            <br/>
            <select id="type" name="type" onChange={handleChange} className="select" required>
                <option value="">- Simulación -</option>
                <option value="1">Compras</option>
                <option value="2">Venta</option>
                <option value="3">Cambio</option>
                <option value="4">Sesiones</option>
            </select>
            <br/>
            <button className="mi-boton" onClick={handleClick}>🔍 Consular</button>
        </div>
        <br/>
        <div>
        <table className="table-log">
        <thead>
            {
                filterData.type == 1 && (
                    <tr>
                        <th className="th">Valor de Moneda</th>
                        <th className="th">Valor de Compra</th>
                        <th className="th">Estado de Cuenta</th>
                        <th className="th">Fecha de Compra</th>
                    </tr>
                )
            }
            {
                filterData.type == 2 && (
                    <tr>
                        <th className="th">Valor de Moneda</th>
                        <th className="th">Valor de Venta</th>
                        <th className="th">Estado de Cuenta</th>
                        <th className="th">Fecha de Venta</th>
                    </tr>
                )
            }
            {
                filterData.type == 3 && (
                    <tr>
                        <th className="th">Criptomoneda Ofrecida</th>
                        <th className="th">Criptomoneda Obtenida</th>
                        <th className="th">Fecha de Cambio</th>
                    </tr>
                )
            }
            {
                filterData.type == 4 && (
                    <tr>
                        <th className="th">Fecha de Entrada</th>
                        <th className="th">Feccha de Salida</th>
                    </tr>
                )
            }
        </thead>
        <tbody>
          {
                filterData.type == 1 && log_ && log_.map( (e, i) => {
                    return (
                        <tr>
                            <td className="td">{e.crypto_amount}</td>
                            <td className="td">{e.total}</td>
                            <td className="td">{e.balance_a}</td>
                            <td className="td">{e.buy_at}</td>
                        </tr>
                    )
                })   
            }
            {
                filterData.type == 2 && log_ && log_.map( (e, i) => {
                    return (
                        <tr>
                            <td className="td">{e.crypto_amount}</td>
                            <td className="td">{e.total}</td>
                            <td className="td">{e.balance_a}</td>
                            <td className="td">{e.sell_at}</td>
                        </tr>
                    )
                })   
            }
            {
                filterData.type == 3 && log_ && log_.map( (e, i) => {
                    return (
                        <tr>
                            <td className="td">{e.given_crypto}</td>
                            <td className="td">{e.acquired_crypto}</td>
                            <td className="td">{e.exchange_at}</td>
                        </tr>
                    )
                })   
            }
            {
                filterData.type == 4 && log_ && log_.map( (e, i) => {
                    return (
                        <tr>
                            <td className="td">{e.login}</td>
                            <td className="td">{e.logout}</td>
                        </tr>
                    )
                })   
            }
        </tbody>
      </table>
        </div>
    </div>
  )
}
