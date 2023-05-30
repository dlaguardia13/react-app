import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const CryptoValue = () => {
    const [log_, setLog] = useState([]);
    const [filterData, setFilterData] = useState({
        currency: "5eae7503-fc9f-4498-85ac-a4db89c674a8",
      });  

     const handleChange = (event) => {    
        setFilterData({
            ...filterData,
            [event.target.name]: event.target.value,
        });
    };

    const handleClick = () => {
        axios.get(`http://localhost:3001/api/operation/historical/?currency=${filterData.currency}`)
          .then((response) => {
            console.log(response.data);
            setLog(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }; 

  return (
    <div>
        <div className="div-filer">
            <select id="currency" name="currency" onChange={handleChange} className="select" required>
                <option value="">- Criptomoneda -</option>
                <option value="5eae7503-fc9f-4498-85ac-a4db89c674a8">Bitcoin</option>
                <option value="77226ccc-681a-48a9-bda4-05bd5b718571">Ethereum</option>
                <option value="2bd6944f-75d8-4251-a4d6-3c09152920a9">Tether</option>
            </select>
            <br/>
            <button className="mi-boton" onClick={handleClick}>🔍 Consular</button>
        </div>
        <br/>
        <div>
        <table className="table-log">
        <thead>
            <tr>
                <th className="th">Valor Máximo</th>
                <th className="th">Valor Mínimo</th>
                <th className="th">Fecha</th>
            </tr>
        </thead>
        <tbody>
            {
                log_.data && log_.data.map( (e, i) => {
                    return (
                        <tr>
                            <td className="td">{e.high_formated}</td>
                            <td className="td">{e.low_formated}</td>
                            <td className="td">{e.time_}</td>
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
