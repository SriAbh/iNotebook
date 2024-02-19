import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // Redirect
            localStorage.getItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success");

          } else{
            props.showAlert("Invalid details", "danger");
          }
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Your Name" name='name' onChange={onChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={onChange} minLength={5} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasiccPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name='cpassword' onChange={onChange} minLength={5} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  )
}

export default Signup
