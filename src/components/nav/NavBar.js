import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()
  return (
    <ul className="navbar">
      <div className="logo">SamplStak</div>
      <div className="navbar__items">
        <li className="navbar__item">Browse</li>
        <li className="navbar__item">My Sounds</li>
        {localStorage.getItem("lu_token") !== null ? (
          <li className="nav-item">
            <button
              className="nav-link fakeLink"
              onClick={() => {
                localStorage.removeItem("lu_token")
                navigate("/login")
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}{" "}
      </div>
    </ul>
  )
}
