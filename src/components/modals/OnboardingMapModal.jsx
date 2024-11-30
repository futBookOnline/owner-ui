import React, { useState, useEffect } from "react";
import Map from "../Map";
const OnboardingMapModal = ({ close, onChange }) => {
  const [location, setLocation] = useState(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {}
      );
    } else {
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const handlePositionChange = (position) => {
    setLocation(position);
    // onChange(position)
  };
  const handleChange = () => {
    onChange(location);
    close();
  };
  return (
    <div
      className="modal show fade modal-lg"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {location && (
              <Map
                location={location}
                onPositionChange={handlePositionChange}
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleChange}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingMapModal;
