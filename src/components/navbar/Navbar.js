import React, { useContext } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className='navbar'>

      <div className="navContainer">
        <Link className='link' to="/">

          <span className="logo">Dantr</span>
        </Link>
        {user
          ? <h2 className='username'>{user.username}
            <button className='logoutButton' onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
          </h2>
          : <div className="navItems">
            <Link className="link" to="/register">
              <button className="navButton">Register</button>

            </Link>
            <Link className="link" to="/login">
              <button className="navButton">Login</button>

            </Link>
          </div>}
      </div>
    </div>
  )
}

export default Navbar