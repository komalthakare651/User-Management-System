import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

export default function Navbar() {

  const { loginWithRedirect } = useAuth0();
  const { logout,isAuthenticated,user } = useAuth0();

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Student Management System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <Link  class="btn btn-outline-light" to="/adduser">Add Student</Link>

    {
      isAuthenticated && <p>{user.name}</p>
    }



    {
      isAuthenticated ?  <button  class="btn btn-outline-light" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>  Log Out
      </button>:
        <button class="btn btn-outline-light" onClick={() => loginWithRedirect()}>Log In</button>
      
    }

   
    
    
  </div>
</nav>
      
    </div>
  )
}
