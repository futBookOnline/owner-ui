import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
                      Create a new account
                    </h2>
                    <form action="#!">
                      <div className="row gy-2 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="name@example.com"
                              required
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
                              value=""
                              placeholder="Password"
                              required
                            />
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              name="confirm-password"
                              id="confirm-password"
                              value=""
                              placeholder="Confirm Password"
                              required
                            />
                            <label htmlFor="confirm-password" className="form-label">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid my-3">
                            <button
                              className="btn btn-primary btn-lg"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 text-secondary text-center link-primary text-decoration-none">
                            Don't have an account? <Link to="/login">Sign in</Link>
                          </p>
                        </div>
                      </div>
                    </form>
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
export default Register;
