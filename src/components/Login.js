import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // Redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success");

          } else{
            props.showAlert("Invalid Credentials", "danger");
          }
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'value={credentials.email} onChange={onChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={onChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  )
}

export default Login
