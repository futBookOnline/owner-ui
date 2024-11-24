import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({futsalInfo}) => {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("venueId");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/slots">
                Slots
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations">
                Reservations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
          </ul>
          <>
            <Link className="nav-link me-4" to={"/me"}>
              <img
                src={`${futsalInfo?.imageUrl}`}
                height={40}
                width={40}
                alt="profile-pic"
              />{" "}
              {futsalInfo?.futsalName}
            </Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
