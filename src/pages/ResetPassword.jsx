import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";
import { useSearchParams } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const [userId, setUserId] = useState(null);
  const [errorToken, setErrorToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const validateResetToken = async () => {
    const respose = await useRelatedApi(
      `recover/reset-password?token=${token}`,
      "get",
      ""
    );
    if (respose.success) {
      setLoading(false);
      setUserId(respose.userId);
    } else if (!respose.success) {
      setLoading(false);
      setErrorToken(respose.data.message);
    }
  };
  useEffect(() => {
    validateResetToken();
  }, []);

  const handleResend = async () => {
    const payload = { email };
    const response = await useRelatedApi(
      `recover/reset-password`,
      "post",
      payload
    );
    if (response.success) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      // alert(response.message)
      // navigate("/recover-password");
    } else {
      setErrorToken(response.message);
    }
  };

  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!formData?.newPassword)
      newErrors.newPassword = "New password is required.";
    if (!formData?.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";
    else if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [resetMessage, setResetMessage] = useState(null);
  const handleReset = async () => {
    if (validate()) {
      const payload = { password: formData.newPassword };
      const response = await useRelatedApi(
        `users/${userId}/reset-password`,
        "post",
        payload
      );
      if (response.success) {
        setResetMessage({
          success: true,
          message: "Password has been reset successfully.",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setResetMessage({ success: false, message: response.message });
      }
    }
  };

  return (
    // <div>
    //   <h2>RecoverPassword</h2>
    //   <p>
    //     Please check your email for a message with your code. Your code is 6
    //     numbers long.
    //   </p>
    // </div>

    <div className="container-fluid">
      <div className="row">
        <section className="py-3 py-md-5">
          <div className="container">
            {alert && (
              <div
                className="alert alert-success alert-dismissible z-1 fade show position-fixed top-0 end-0  w-auto"
                role="alert"
              >
                <strong className="me-2">
                  <i className="fa-solid fa-circle-check me-2 alert-success"></i>
                  Success!
                </strong>
                An email has been sent to {email}.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-end"
                style={{ height: "40vh" }}
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
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
                        Reset your password
                      </h2>
                      {errorToken ? (
                        <div className="d-flex flex-column align-items-center gap-3 justify-content-between">
                          <small className="text-danger">{errorToken}</small>
                          <button
                            className="btn btn-primary btn-sm w-50"
                            onClick={handleResend}
                          >
                            Resend Confirmation Link
                          </button>
                        </div>
                      ) : (
                        <div className="row gy-2 overflow-hidden">
                          {resetMessage && resetMessage?.success ? (
                            <p className="text-success text-center">
                              {resetMessage?.message}
                            </p>
                          ) : (
                            <p className="text-danger text-center">
                              {resetMessage?.message}
                            </p>
                          )}
                          <div className="col-12">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                name="newPassword"
                                id="newPassword"
                                placeholder="New Password"
                                onChange={(event) => {
                                  setErrors((prev) => ({
                                    ...prev,
                                    newPassword: null,
                                  }));
                                  setFormData((prev) => ({
                                    ...prev,
                                    newPassword: event.target.value,
                                  }));
                                }}
                              />
                              <label
                                htmlFor="newPassword"
                                className="form-label"
                              >
                                New Password
                              </label>
                              {errors?.newPassword && (
                                <small className="text-danger">
                                  {errors.newPassword}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={(event) => {
                                  setErrors((prev) => ({
                                    ...prev,
                                    confirmPassword: null,
                                  }));
                                  setFormData((prev) => ({
                                    ...prev,
                                    confirmPassword: event.target.value,
                                  }));
                                }}
                              />
                              <label
                                htmlFor="confirmPassword"
                                className="form-label"
                              >
                                Confirm Password
                              </label>
                              {errors?.confirmPassword && (
                                <small className="text-danger">
                                  {errors.confirmPassword}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                className="btn btn-primary btn-lg"
                                onClick={handleReset}
                              >
                                Reset password
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
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

export default ResetPassword;
