import React, { useState, useEffect } from 'react';
import axios from "axios";

export const CreateUser = () => {
  const [newUser_, setNewUser] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    tb_cryptocurrency_cryptocurrency_id: '',
    stock: '',
    tb_realcurrency_realcurrency_id: "59c94fa7-d25f-4e09-be7c-3fc591942e9b",
    no_account: '',
    balance: '',
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

  formData.stock = parseFloat(formData.stock);
  formData.balance = parseFloat(formData.balance);

  console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`http://localhost:3001/api/user/`, formData)
      .then((response) => {
        // console.log(response.data);
        setNewUser(response.data);
        alert('¡Usuario Creado!');
      })
      .catch((error) => {
        console.error(error);
        setNewUser(error.response.data.message);
      });
  };

  useEffect(() => {

  }, [newUser_])

  console.log(newUser_);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Apellido"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            className="input"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            className="input"
            onChange={handleChange}
            required
          />
          <br/>
          <div>
          <select id="tb_cryptocurrency_cryptocurrency_id" name="tb_cryptocurrency_cryptocurrency_id" onChange={handleChange} className="select" required>
            <option value="">- Criptomoneda -</option>
            <option value="5eae7503-fc9f-4498-85ac-a4db89c674a8">Bitcoin</option>
            <option value="77226ccc-681a-48a9-bda4-05bd5b718571">Ethereum</option>
            <option value="2bd6944f-75d8-4251-a4d6-3c09152920a9">Tether</option>
          </select>
          <br/>
          <input
            type="number"
            id="stock"
            name="stock"
            step="any"
            placeholder="Cantidad de Monedas"
            className="input"
            onChange={handleChange}
            required
          />
          </div>
          <br/>
          <div>
          {/* <select id="tb_realcurrency_realcurrency_id" name="tb_realcurrency_realcurrency_id" onChange={handleChange} className="select" required>
            <option value="">- Tipo de Cuenta -</option>
            <option value="59c94fa7-d25f-4e09-be7c-3fc591942e9b">Dolares</option>
            <option value="6bd4aedc-96a7-4102-bf10-74427586762d">Quetzales</option>
          </select>
          <br/> */}
          <input
            type="number"
            id="no_account"
            name="no_account"
            placeholder="No. de Cuenta"
            className="input"
            onChange={handleChange}
            required
          />
          <br/>
          <input
            type="number"
            id="balance"
            name="balance"
            step="any"
            placeholder="Saldo"
            className="input"
            onChange={handleChange}
            required
          />
          </div>
          <br/>
          <button className="button" type="submit">Registrar</button>
        </form>
    </div>
  )
}
