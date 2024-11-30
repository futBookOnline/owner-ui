import React, { useState } from "react";
import Map from "../Map";
import { useRelatedApi } from "../../helpers/api.helper";

const MapModal = ({ location, close }) => {
  console.log("LOCATION: ", location);
  const venueId = localStorage.getItem("venueId");
  // const [markerPosition, setMarkerPosition] = useState([27.7172, 85.324]);
  const [markerPosition, setMarkerPosition] = useState(location);
  console.log("NEW LOCATION: ", markerPosition);
  console.log("VENUE ID: ", venueId);
  const handlePositionChange = (position) => {
    setMarkerPosition(position);
  };

  const handleUpdate = async () => {
    const payLoad = {
      location: {
        type: "Point",
        coordinates: [markerPosition.longitude, markerPosition.latitude],
      },
    };
    const response = await useRelatedApi(`futsals/${venueId}`, "put", payLoad);
    if(response.success){
      close()
    }
    console.log("UPDATE RESPONSE: ", response);
  };
  return (
    <div
      className="modal show fade modal-lg"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Location</h5>
            <button
              type="button"
              className="btn-close"
              onClick={close}
            ></button>
          </div>
          <div className="modal-body">
            <Map location={location} onPositionChange={handlePositionChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>
              Close
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
