import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase'
import './LoginPage.css'

function SignUp() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  console.log(formData);

  function handleChange(event){
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function handleSubmit(event){
    // submit sbumits whole page and refreshes the page
    event.preventDefault()
   try {
      console.log(supabase); // This should not be undefined
      console.log(formData);
      let { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })
      if(error) throw error
      alert('Check email for verification link')
   } catch (error) {
      alert(error)
   }
    console.log("submitted!")
  }


  return (
    <div className="centered-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>
          Email Address:
          <input
            type="text"
            name="email"
            onChange={handleChange} // Handles every change on the textbox
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange} // Handles every change on the textbox
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br></br>
      <div className="link">
        <h2>Have an account already? <Link to="/">Log In!</Link></h2>
      </div>
    </div>
  );
}

export default SignUp