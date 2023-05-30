import React, { useState, useEffect } from 'react'
import axios from "axios";
import { UserFile } from './userFile.component';


export const BuyInterface = (props) => {
  const [visible, setVisible] = useState(true);
  const [simulationData, setSimulationData] = useState([]);
  const [formData, setFormData] = useState({
    cryptocurrency_id: "5eae7503-fc9f-4498-85ac-a4db89c674a8",
    d_amount: '',
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
  formData.d_amount = parseFloat(formData.d_amount);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3001/api/operation/buy/${props.userData.user_id}`, formData)
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
            id="d_amount"
            name="d_amount"
            placeholder="Monto en Dolares"
            className="input"
            step="any"
            onChange={handleChange}
            required
          />
          <br/>
          <select id="cryptocurrency_id" name="cryptocurrency_id" onChange={handleChange} className="select" required>
            <option value="">- Criptomoneda -</option>
            <option value="5eae7503-fc9f-4498-85ac-a4db89c674a8">Bitcoin</option>
            <option value="77226ccc-681a-48a9-bda4-05bd5b718571">Ethereum</option>
            <option value="2bd6944f-75d8-4251-a4d6-3c09152920a9">Tether</option>
          </select>
          <br/>
          <button className="button" type="submit">Comprar</button>
          <label>
          <input type="checkbox" name="accepted" id="accepted" onChange={handleChange}/> Aceptar
          </label>
        </form>
        <br/>
      </div>
      { simulationData.accepted == false && (
      <div className='div-simulation'>
        <p>Cantidad Comprada</p>
        <p>{simulationData.cryptocurrency_formated}</p>
        <p>Nuevo Saldo</p>
        <p>{simulationData.new_stock_formated}</p>
      </div>
      )}
      { visible && simulationData.message == "Done!" && (
      <div className='div-simulation'>
        <p>Simulación Guardada 👍</p>
        <button onClick={toggleVisibility}>Aceptar</button>
        {/* <button onClick={handleRefresh}>Aceptar</button> */}
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
