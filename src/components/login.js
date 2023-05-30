import React ,{ useState, useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect, Link, Routes, useNavigate  } from 'react-router-dom';

import { Main } from './main.component';
import { CreateUser } from './createUser.component';

export const Login = () => {
const [session_, setSession] = useState([]);
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const navigate = useNavigate();

const logOut = (acSession_) => {
    delete acSession_.user_id;
    setSession(acSession_);
};

const handleClick = () => {
    navigate('/register', {replace: true});
  };

const handleChange = (event) => {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
};

const handleSubmit = (event) => {
  event.preventDefault();

  axios.post(`http://localhost:3001/api/user/login/`, formData)
    .then((response) => {
      // console.log(response.data);
      setSession(response.data);
    })
    .catch((error) => {
      console.error(error);
      // setSession(error.response.data.message);
      alert(error.response.data.message);
    });
};

console.log(session_);

useEffect(() => {

}, [session_])

  return (
    // <BrowserRouter>
    <>
    { session_.user_id ? (<Main logOut={logOut} session={session_}/>) : (
    <div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo Electrónico"
            className="input"
            onChange={handleChange}
            required
          />
          <br/>
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
          <br/>
          <button className="button" type="submit">Login</button>
          <br/>
          <br/>
          <button onClick={handleClick} className="button">Registrar</button>
        </form>
        <br/>
        <Routes>
          <Route path="/register" element={<CreateUser/>} />
      </Routes>
    </div>
    // </BrowserRouter>
  )} </>
  )
}
