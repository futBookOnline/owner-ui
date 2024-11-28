import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper";
import SlotCard from "../components/SlotCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isBefore } from "date-fns";
import BookSlotModal from "../components/modals/BookSlotModal";
import { formatDateToNepal } from "../helpers/utils.helper";
import EditSlotModal from "../components/modals/EditSlotModal";
const Slot = () => {
  const venueId = localStorage.getItem("venueId");
  const [alert, setAlert] = useState("");
  const [startDate, setStartDate] = useState(formatDateToNepal(new Date()));

  const [slots, setSlots] = useState(null);
  const fetchSlots = async () => {
    const response = await useRelatedApi(
      `slots/${venueId}?startDate=${startDate}`,
      "get",
      ""
    );

    if (response?.success) {
      setSlots(response.data);
    }
  };
  useEffect(() => {
    fetchSlots();
  }, [startDate]);

  const [bookSlotShow, setBookSlotShow] = useState({
    visible: false,
    data: null,
  });
  const handleBookSlotModalShow = (slot) => {
    setBookSlotShow((prev) => ({ ...prev, visible: true, data: slot }));
  };
  const handleBookSlotModalClose = () =>
    setBookSlotShow((prev) => ({ ...prev, visible: false }));

  const [editSlotShow, setEditSlotShow] = useState({
    visible: false,
    data: null,
  });
  const handleEditSlotModalShow = (slot) => {
    setEditSlotShow((prev) => ({ ...prev, visible: true, data: slot }));
  };
  const handleEditSlotModalClose = () =>
    setEditSlotShow((prev) => ({ ...prev, visible: false }));

  const generateSlots = async () => {
    const payload = {
      venueId,
      date: formatDateToNepal(startDate),
    };
    const response = await useRelatedApi(
      "slots/generate-daily-slots",
      "post",
      payload
    );
    if (response.success) {
      setAlert("succeed");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      fetchSlots();
      return;
    }
    setAlert("failed");
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };
  const handleSubmit = () => {
    handleBookSlotModalClose();
    handleEditSlotModalClose();
    fetchSlots();
  };
  return (
    <Layout>
      <h6>Slots</h6>
      {alert === "failed" ? (
        <div
          className="alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 w-auto"
          role="alert"
        >
          <strong className="me-2">
            <i className="fa-regular fa-circle-xmark alert-danger me-2"></i>
            Failed!
          </strong>
          Could not generate slots.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : alert === "succeed" ? (
        <div
          className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0  w-auto"
          role="alert"
        >
          <strong>
            <i className="fa-solid fa-circle-check me-2 alert-success"></i>
            Success!
          </strong>
          Slot generated.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}
      <hr />
      {bookSlotShow.visible && (
        <BookSlotModal
          handleClose={() => handleBookSlotModalClose()}
          slotData={bookSlotShow.data}
          onSubmit={handleSubmit}
        />
      )}
      {editSlotShow.visible && (
        <EditSlotModal
          handleClose={() => handleEditSlotModalClose()}
          slotData={editSlotShow.data}
          onSubmit={handleSubmit}
        />
      )}
      <div className="py-2">
        <div className="container">
          <div className="row">
            <div className="card w-auto p-3 mb-3">
              <small>
                <span className="me-2">Total Slots:</span>
                {slots ? slots.length : 0}
              </small>
              <small>
                <span className="me-2">Reserved Slots:</span>{" "}
                {slots ? slots.filter((slot) => slot.isReserved).length : 0}
              </small>
              <small>
                <span className="me-2">Available Slots:</span>{" "}
                {slots ? slots.filter((slot) => !slot.isReserved).length : 0}
              </small>
            </div>
          </div>
          <div className="row py-3">
            <div className="col-md-8">
              {slots ? (
                <div className="d-flex flex-wrap gap-4">
                  {slots.map((slot) => (
                    <SlotCard
                      key={slot._id}
                      slotInfo={slot}
                      onBookClick={() => handleBookSlotModalShow(slot)}
                      onEditClick={() => handleEditSlotModalShow(slot)}
                    />
                  ))}
                </div>
              ) : isBefore(startDate, new Date()) ? (
                <div className="d-flex flex-column justify-content-center h-100 align-items-center">
                  <p>There are no slots</p>
                  {/* <button className="btn btn-primary btn-sm" onClick={generateSlots}>Generate</button> */}
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-center h-100 align-items-center">
                  <p>There are no slots</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={generateSlots}
                  >
                    Generate
                  </button>
                </div>
              )}
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end">
                <Calendar
                  value={new Date()}
                  onChange={(value) => {
                    setStartDate(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Slot;
