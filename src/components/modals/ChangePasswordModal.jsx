import React, { useState } from "react";
import { useRelatedApi } from "../../helpers/api.helper";

const ChangePasswordModal = ({ close }) => {
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const handleSubmit = async () => {
    if (
      !formData ||
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Fields cannot be empty");
      return;
    } else {
      console.log("FORM DATA: ", formData);
      if (
        formData.oldPassword === formData.newPassword ||
        formData.oldPassword === formData.confirmPassword
      ) {
        setError("Old Password and new password cannot be same");
        return;
      } else if (formData.newPassword != formData.confirmPassword) {
        setError("Passwords do match");
        return;
      } else {
        const response = await useRelatedApi(
          `users/${userId}/change-password/`,
          "put",
          formData
        );
        console.log("RESPONSE: ", response);
        if (response.success) {
          close();
        } else {
          setError(response.message);
        }
      }
    }
  };
  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => close()}
            ></button>
          </div>
          <div className="modal-body">
            {error && <p className="text-danger text-center mb-3">{error}</p>}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingOldPassword"
                placeholder="Old Password"
                // aria-autocomplete="none"
                // autoComplete="off"
                onChange={(event) => {
                  setError(null);
                  setFormData((prev) => ({
                    ...prev,
                    oldPassword: event.target.value,
                  }));
                }}
              />
              <label htmlFor="floatingEmail">Old Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingNewPassword"
                placeholder="New Password"
                onChange={(event) => {
                  setError(null);
                  setFormData((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }));
                }}
              />
              <label htmlFor="floatingNewPassword">New Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Confirm Password"
                onChange={(event) => {
                  setError(null);
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }));
                }}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>
            <button
              type="button"
              className="btn btn-primary form-control"
              onClick={handleSubmit}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
