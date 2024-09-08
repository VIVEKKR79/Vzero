import React, { useEffect, useState } from "react";
const navigate = useNavigate();

function Home(){

    const [loggedUser, setLoggedUser] = useState("");
    useEffect(() => {
        setLoggedUser(localStorage.getItem("loggedInUser"));
    }, [])

    const handleLogout = (event) =>{
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess('User Loggedout');
        setTimeout(() =>{
            navigate('/login')
        }, 1000)
    }
    return(
        <div>
            <h1>{loggedUser}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;