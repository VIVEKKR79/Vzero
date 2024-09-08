import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { hanndleError, hanndleSuccess } from '../../utils'

function Signup() {
     
    const [signupInfo,  setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const handleChange = (event) => {

        const {name, value} = event.target;
        console.log(name, value);
        setSignupInfo({ ...signupInfo, [name]: value });
    }

    console.log('signup Info', signupInfo);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return hanndleError("name, password, eamil are required")
        }

        try{

            const url = "https://zerodha-31vm.onrender.com/auth/signup";
            const response = await fetch(url, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(signupInfo),
            })

            const result = await response.json();
            const { success, message, error } = result;

            if(success){
                hanndleSuccess(message);
                setTimeout(()=>{

                   navigate('/signup/login');

                }, 1000)
            }else if(error){
                const err = error[0];
                hanndleError(err);
            } else if (!success) {
                hanndleError(message);
              }

            


        }catch(err){

            hanndleError(err)

        }
    }
 
  return (
    <div className='form-main-container'>
      <div className="form_container">
        <h2>Signup Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your username"
              value={signupInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signupInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={signupInfo.password}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={'/signup/login'}>Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup