import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { hanndleError, hanndleSuccess } from '../../utils'

function Login() {
     
    const [loginInfo,  setLoginInfo] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const handleChange = (event) => {

        const {name, value} = event.target;
        console.log(name, value);
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    console.log('signup Info', loginInfo);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const {email, password} = loginInfo;
        if(!email || !password){
            return hanndleError("password, eamil are required")
        }

        try{

            const url = "https://zerodha-31vm.onrender.com/auth/login";
            const response = await fetch(url, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(loginInfo),
            })

            const result = await response.json();
            const { success, message, error, name, jwtToken } = result;

            if(success){
                hanndleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem("loggedInUser", name);
                setTimeout(()=>{

                    window.location.href = "https://zerodha-dashboard-peach.vercel.app/";
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
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
          Create a new account <Link to={"/signup/signup"}>Signup</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login