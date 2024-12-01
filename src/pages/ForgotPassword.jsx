import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleSearch = async () => {
    if (!formData) {
      setError("Email is required");
    } else if (!emailRegex.test(formData.email)) {
      setError("Invalid email");
    } else {
      const payload = { email: formData.email };
      const response = await useRelatedApi(
        `recover/reset-password`,
        "post",
        payload
      );
      if (response.success) {
        sessionStorage.setItem("email", formData.email)
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setError(response.message);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {alert && (
          <div
            className="alert alert-success alert-dismissible z-1 fade show position-fixed top-0 end-0  w-auto"
            role="alert"
          >
            <strong className="me-2">
              <i className="fa-solid fa-circle-check me-2 alert-success"></i>
              Success!
            </strong>
            An email has been sent to {formData.email}.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <section className="py-3 py-md-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm bg-light">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="text-center mb-3">
                      <Link to="/">
                        <img
                          src="https://w7.pngwing.com/pngs/1008/532/png-transparent-wolf-logo-symbol-thumbnail.png"
                          alt="BootstrapBrain Logo"
                          width="175"
                          height="175"
                          className="rounded-circle"
                        />
                      </Link>
                    </div>
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                      Find your account
                    </h2>
                    <small>
                      Please enter your email to search for your account.
                    </small>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating my-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            onChange={(event) => {
                              setError(null);
                              setFormData((prev) => ({
                                ...prev,
                                email: event.target.value,
                              }));
                            }}
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          {error && (
                            <small className="text-danger">{error}</small>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-lg"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center link-primary text-decoration-none">
                          Already have an account?{" "}
                          <Link to="/login">Sign in</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="row position-fixed bottom-0 w-100 p-2 bg-body-tertiary">
          <div className="d-flex justify-content-between">
            <span className="text-center">&copy;&nbsp;Copyright - 2024</span>
            <span>Futsal Finder</span>
            <div>
              <Link className="text-decoration-none">Privacy</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link className="text-decoration-none">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
