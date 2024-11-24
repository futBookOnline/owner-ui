import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
const userId = localStorage.getItem("userId");
const Profile = () => {
  const [futsal, setFutsal] = useState(null);
  const fetchFutsalData = async () => {
    const response = await useRelatedApi(`futsals/${userId}/futsal`, "get", "");
    if (response?.success) {
      setFutsal(response.data);
    }
  };
  useEffect(() => {
    fetchFutsalData();
  }, []);

  const [message, setMessage] = useState(null);

  const updateProfile = async () => {
    const payload = {
      name: futsal.futsalName,
      contact: futsal.contact,
      address: {
        street: futsal.address.street,
        district: futsal.address.district,
      },
      opensAt: futsal.opensAt,
      closesAt: futsal.closesAt,
    };
    const response = await useRelatedApi(
      `futsals/${futsal.id}`,
      "put",
      payload
    );
    if (response?.success) {
      setMessage(
        <p className="text-center text-success">Updated successfully</p>
      );
    } else {
      setMessage(
        <p className="text-center text-danger">Error: ${response.error}</p>
      );
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <Layout>
      <div className="py-2">
        {message}
        <div className="text-center mb-3">
          <img src={futsal?.imageUrl} height={150} width={150} />
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingFullname"
                value={futsal?.futsalName || ""}
                placeholder="Fullname"
                onChange={(event) =>
                  setFutsal((prev) => ({
                    ...prev,
                    futsalName: event.target.value,
                  }))
                }
              />
              <label htmlFor="floatingFullname">Futsal Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                value={futsal?.email || ""}
                placeholder="email"
                disabled
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingContact"
                value={futsal?.contact || ""}
                placeholder="contact"
                onChange={(event) =>
                  setFutsal((prev) => ({
                    ...prev,
                    contact: event.target.value,
                  }))
                }
              />
              <label htmlFor="floatingContact">Contact</label>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingDistrict"
                    value={futsal?.address.district || ""}
                    placeholder="District"
                    onChange={(event) =>
                      setFutsal((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          district: event.target.value,
                        },
                      }))
                    }
                  />
                  <label htmlFor="floatingDistrict">District</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingStreet"
                    value={futsal?.address.street || ""}
                    placeholder="Street"
                    onChange={(event) =>
                      setFutsal((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          street: event.target.value,
                        },
                      }))
                    }
                  />
                  <label htmlFor="floatingStreet">Street</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingOpensAt"
                    value={futsal?.opensAt || ""}
                    placeholder="opensAt"
                    onChange={(event) =>
                      setFutsal((prev) => ({
                        ...prev,
                        opensAt: event.target.value,
                      }))
                    }
                  />
                  <label htmlFor="floatingOpensAt">Opens At</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingClosesAt"
                    value={futsal?.closesAt || ""}
                    placeholder="closesAt"
                    onChange={(event) =>
                      setFutsal((prev) => ({
                        ...prev,
                        closesAt: event.target.value,
                      }))
                    }
                  />
                  <label htmlFor="floatingClosesAt">Closes At</label>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary form-control mb-3"
              onClick={updateProfile}
            >
              Update Profile
            </button>
            <button
              className="btn btn-secondary form-control"
              onClick={() => setShow(true)}
            >
              Change Password
            </button>
            {show && <ChangePasswordModal close={handleClose} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
