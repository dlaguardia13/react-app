import React, { useState, useEffect } from 'react'
import axios from "axios";
import { UserFile } from './userFile.component';


export const ExchangeInterface = (props) => {
  const [visible, setVisible] = useState(true);
  const [simulationData, setSimulationData] = useState([]);
  const [formData, setFormData] = useState({
    cryptocurrency_id: '',
    requested_cryptocurrency_id: "5eae7503-fc9f-4498-85ac-a4db89c674a8",
    cc_amount: '',
    accepted: ''
  });

  const handleChange = (event) => {

    if (event.target.name == "accepted") {
        event.target.value = event.target.checked;
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  formData.accepted = Boolean(formData.accepted);
  formData.cc_amount = parseFloat(formData.cc_amount);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3001/api/operation/exchange/${props.userData.user_id}`, formData)
      .then((response) => {
        // console.log(response.data);
        setSimulationData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setSimulationData(error.response.data.message);
      });
  };

  useEffect(() => {

  }, [simulationData])

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <header>
        {/* <UserFile/> */}
      </header>
    <br/>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="number"
            id="cc_amount"
            name="cc_amount"
            placeholder="Monto de Criptomoneda"
            className="input"
            step="any"
            onChange={handleChange}
            required
          />
          <br/>
          <select id="cryptocurrency_id" name="cryptocurrency_id" onChange={handleChange} className="select" required>
          <option value="">- Mi Criptomoneda -</option>
            {
                props.userData.tb_as_user_cryptocurrencies && props.userData.tb_as_user_cryptocurrencies.map( (e) => {
                    return <option value={e.tb_cryptocurrency_cryptocurrency_id}>{e.currency_data}</option>
                })   
            }
          </select>
          <br/>
          <select id="requested_cryptocurrency_id" name="requested_cryptocurrency_id" onChange={handleChange} className="select" required>
          <option value="">- Criptomoneda Requerida -</option>
            <option value="5eae7503-fc9f-4498-85ac-a4db89c674a8">Bitcoin</option>
            <option value="77226ccc-681a-48a9-bda4-05bd5b718571">Ethereum</option>
            <option value="2bd6944f-75d8-4251-a4d6-3c09152920a9">Tether</option>
          </select>
          <br/>
          <button className="button" type="submit">Cambiar</button>
          <label>
          <input type="checkbox" name="accepted" id="accepted" onChange={handleChange}/> Aceptar
          </label>
        </form>
        <br/>
      </div>
      { simulationData.accepted == false && (
      <div className='div-simulation'>
        <p>Criptomoneda Recibida</p>
        <p>{simulationData.requested_cryptocurrency_stock_formated}</p>
        <p>Valor en Dolares</p>
        <p>{simulationData.dolar_value}</p>
      </div>
      )}
      { visible && simulationData.message == "Done!" && (
      <div className='div-simulation'>
        <p>Simulación Guardada 👍</p>
        <button onClick={toggleVisibility}>Aceptar</button>
      </div>
      )}
      { visible && simulationData == "Operación No Valida!" && (
      <div className='div-simulation'>
        <p>{ simulationData } ❌</p>
        <button onClick={toggleVisibility}>Aceptar</button>
        {/* <button onClick={handleRefresh}>Aceptar</button> */}
      </div>
      )}
    </div>
  )
}