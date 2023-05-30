import React, { useState, useEffect } from 'react'
import axios from "axios";
import { UserFile } from './userFile.component';


export const SellInterface = (props) => {
  const [visible, setVisible] = useState(true);
  const [simulationData, setSimulationData] = useState([]);
  const [formData, setFormData] = useState({
    cryptocurrency_id: '',
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

    axios.put(`http://localhost:3001/api/operation/sell/${props.userData.user_id}`, formData)
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
          <button className="button" type="submit">Vender</button>
          <label>
          <input type="checkbox" name="accepted" id="accepted" onChange={handleChange}/> Aceptar
          </label>
        </form>
        <br/>
      </div>
      { simulationData.accepted == false && (
      <div className='div-simulation'>
        <p>Ganancia en Dolares</p>
        <p>{simulationData.total_dollars_formated}</p>
        <p>Ganancia en Quetzales</p>
        <p>{simulationData.total_quetzal_formated}</p>
        <p>Estado de Cuenta</p>
        <p>{simulationData.new_balance_formated}</p>
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