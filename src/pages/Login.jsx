import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async () => {
    if (!formData?.email) setError("Email is required");
    else if (!formData?.password) setError("Password is required");
    else {
      const response = await useRelatedApi("auth/login", "post", formData);
      if (response.success) {
        localStorage.setItem("userId", response.data._id);
        sessionStorage.setItem("hasUserOnboarded", true);
        navigate("/");
      } else if (!response.success && response.data) {
        setError(response.message);
        localStorage.setItem("userId", response.data);
        sessionStorage.setItem("hasUserOnboarded", false);
        setTimeout(() => {
          navigate("/onboard");
        }, 2000);

        // const userIdResponse = await useRelatedApi("users/email", "post", {
        //   email: formData.email,
        // });
        // if (userIdResponse.success) {
        //   localStorage.setItem("userId", userIdResponse.data._id);
        // }
      } else {
        setError(response.error);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
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
                      Sign in to your account
                    </h2>
                    {error && (
                      <p className="text-danger text-center mb-3">{error}</p>
                    )}
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
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
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={(event) => {
                              setError(null);
                              setFormData((prev) => ({
                                ...prev,
                                password: event.target.value,
                              }));
                            }}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex gap-2 justify-content-between">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked
                              disabled
                              name="rememberMe"
                              id="rememberMe"
                            />
                            <label
                              className="form-check-label text-secondary"
                              htmlFor="rememberMe"
                            >
                              Keep me logged in
                            </label>
                          </div>
                          <Link
                            to="/forgot-password"
                            className="link-primary text-decoration-none"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button
                            className="btn btn-primary btn-lg"
                            onClick={handleSubmit}
                          >
                            Log in
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center link-primary text-decoration-none">
                          Don't have an account?{" "}
                          <Link to="/register">Sign up</Link>
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

export default Login;
