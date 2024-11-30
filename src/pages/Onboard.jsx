import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OnboardingMapModal from "../components/modals/OnboardingMapModal";
import { useRelatedApi } from "../helpers/api.helper";
const Onboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const photoInputRef = useRef(null);
  const uploadPhoto = () => {
    photoInputRef.current.click();
  };
  const handlePhotoChange = (event) => {
    const files = event.target.files;
    console.log("Selected file:", files[0]);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const [formData, setFormData] = useState(null);
  const handlePositionChange = (position) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        type: "Point",
        coordinates: [position.longitude, position.latitude],
      },
    }));
    setErrors((prev) => {
      const { location, ...rest } = prev;
      return rest;
    });
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!formData?.contact) newErrors.contact = "Contact is required.";
    if (!formData?.opensAt) newErrors.opensAt = "Select opening time.";
    if (!formData?.closesAt) newErrors.closesAt = "Select closing time.";
    if (!formData?.street) newErrors.street = "Street is required.";
    if (!formData?.district) newErrors.district = "District is required.";
    if (!formData?.location) {
      newErrors.location = "Please pin location on map.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const payload = {
        location: formData.location,
        address: {
          district: formData.district,
          street: formData.street,
        },
        contact: formData.contact,
        opensAt: formData.opensAt,
        closesAt: formData.closesAt,
      };
      const response = await useRelatedApi(
        `futsals/${userId}/onboard`,
        "put",
        payload
      );
      if (response.success) {
        sessionStorage.setItem("hasUserOnboarded", true)
        navigate("/me");
      }
    }
  };
  return (
    <div className="container">
      <div>
        <Link to="/">
          <img
            src="https://w7.pngwing.com/pngs/1008/532/png-transparent-wolf-logo-symbol-thumbnail.png"
            alt="BootstrapBrain Logo"
            width="75"
            height="75"
            className="rounded-circle"
          />
        </Link>
      </div>
      <div className="py-2">
        <h5>Onboarding</h5>
        <p>Enter necessary futsal details</p>
      </div>
      <div className="mb-4">
        <span className="fw-bold">Futsal Photo</span>
        <input
          type="file"
          ref={photoInputRef}
          className="d-none"
          onChange={handlePhotoChange}
          accept="image/png, image/jpeg, image/jpg"
        />
        <div
          className="rounded-4 mt-2 py-3 d-flex flex-column justify-content-evenly align-items-center"
          style={{ border: "dashed 2px" }}
          role="button"
          onClick={uploadPhoto}
        >
          <i className="fa-solid fa-cloud-arrow-up text-secondary"></i>
          <small className="fw-bold  text-secondary">Upload an image</small>

          <small className="text-secondary">
            Supported files: jpeg, jpg, png
          </small>
        </div>
      </div>
      <div className="mb-4">
        <span className="fw-bold">Map Location</span>
        {show && (
          <OnboardingMapModal
            close={handleClose}
            onChange={handlePositionChange}
          />
        )}
        <div
          className="rounded-4 mt-2 py-3 r"
          style={{ border: "dashed 2px" }}
          role="button"
          onClick={() => setShow(true)}
        >
          {formData?.location ? (
            <div className="d-flex flex-column justify-content-evenly align-items-center">
              <i className="fa-solid fa-map-location-dot text-secondary"></i>

              <small className="fw-bold  text-secondary">Change location</small>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-evenly align-items-center">
              <i className="fa-solid fa-map-location-dot text-secondary"></i>
              <small className="fw-bold  text-secondary">
                Select exact location on map
              </small>

              <small className="text-secondary">
                This will help uses to find your futsal when they turn on
                location
              </small>
            </div>
          )}
        </div>
        {errors?.location && <p style={{ color: "red" }}>{errors.location}</p>}
      </div>
      <div className="">
        <span className="fw-bold">Address</span>
        <div className="row mt-2 ">
          <div className="col-sm-6 mb-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingDistrict"
                placeholder="District"
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    district: event.target.value,
                  }));
                  setErrors((prev) => {
                    const { district, ...rest } = prev; // Exclude 'street' error
                    return rest; // Return the updated error object
                  });
                }}
              />
              <label htmlFor="floatingDistrict">District</label>
            </div>
            {errors?.district && (
              <p style={{ color: "red" }}>{errors.district}</p>
            )}
          </div>
          <div className="col-sm-6 mb-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingStreet"
                placeholder="Street"
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    street: event.target.value,
                  }));
                  setErrors((prev) => {
                    const { street, ...rest } = prev;
                    return rest;
                  });
                }}
              />
              <label htmlFor="floatingStreet">Street</label>
            </div>
            {errors?.street && <p style={{ color: "red" }}>{errors.street}</p>}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <span className="fw-bold">Contact and Business Time</span>
        <div className="row mt-2 ">
          <div className="col-sm-6 mb-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingContact"
                placeholder="Contact"
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    contact: event.target.value,
                  }));
                  setErrors((prev) => {
                    const { contact, ...rest } = prev;
                    return rest;
                  });
                }}
              />
              <label htmlFor="floatingContact">Contact</label>
            </div>
            {errors?.contact && (
              <p style={{ color: "red" }}>{errors.contact}</p>
            )}
          </div>
          <div className="col-sm-6 mb-4">
            <div className="row">
              <div className="col-6">
                <div className="form-floating">
                  <select
                    className="form-control"
                    id="floatingOpeningTime"
                    placeholder="Opens At"
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        opensAt: event.target.value,
                      }));
                      setErrors((prev) => {
                        const { opensAt, ...rest } = prev;
                        return rest;
                      });
                    }}
                  >
                    <option value={""}>--select--</option>
                    <option value={"05:00"}>05:00</option>
                    <option value={"06:00"}>06:00</option>
                    <option value={"07:00"}>07:00</option>
                  </select>
                  <label htmlFor="floatingOpeningTime">Opens At</label>
                </div>
                {errors?.opensAt && (
                  <p style={{ color: "red" }}>{errors.opensAt}</p>
                )}
              </div>
              <div className="col-6">
                <div className="form-floating">
                  <select
                    className="form-control"
                    id="floatingClosingTIme"
                    placeholder="Closes At"
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        closesAt: event.target.value,
                      }));
                      setErrors((prev) => {
                        const { closesAt, ...rest } = prev;
                        return rest;
                      });
                    }}
                  >
                    <option value={""}>--select--</option>
                    <option value={"19:00"}>19:00</option>
                    <option value={"20:00"}>20:00</option>
                    <option value={"21:00"}>21:00</option>
                  </select>
                  <label htmlFor="floatingClosingTime">Closes At</label>
                </div>
                {errors?.closesAt && (
                  <p style={{ color: "red" }}>{errors.closesAt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={handleSubmit}>
          Complete Onbaording
        </button>
      </div>
    </div>
  );
};

export default Onboard;
