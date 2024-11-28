import React, { useEffect, useMemo, useState } from "react";
import { useRelatedApi } from "../../helpers/api.helper";

const ReservationDetailModal = ({
  handleClose,
  reservationId,
  isFromCustomerModal,
}) => {
  const venueId = localStorage.getItem("venueId");
  const [reservationDetail, setreservationDetail] = useState(null);
  const fetchReservationDetail = async () => {
    const response = await useRelatedApi(
      `reservations/${reservationId}`,
      "get",
      ""
    );
    if (response.success) {
      setreservationDetail(response.data);
    }
  };
  useEffect(() => {
    fetchReservationDetail();
  }, []);
  const handleCancellation = async () => {
    const response = await useRelatedApi(`reservations/${reservationId}`, "delete", '')
    if(response.success){
      handleClose()
    }
  };
  return (
    <div
      className="modal show fade modal-md"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div
        className={`modal-dialog ${
          isFromCustomerModal && "modal-dialog-centered"
        }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reservation Detail</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <table className="table table-borderless border border caption-top">
            <caption>Customer Info</caption>
              <tbody>
                <tr>
                  <th scope="row">Full Name</th>
                  <td>
                    {reservationDetail?.user
                      ? reservationDetail?.user.fullName
                      : reservationDetail?.guestUser.fullName}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>
                    {reservationDetail?.user
                      ? reservationDetail?.user.email
                      : reservationDetail?.guestUser.email}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Contact</th>
                  <td>
                    {reservationDetail?.user
                      ? reservationDetail?.user.contact
                      : reservationDetail?.guestUser.contact}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Is Registered</th>
                  <td>{reservationDetail?.user ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-borderless border caption-top">
            <caption>Reservation Info</caption>
              <tbody>
                <tr>
                  <th scope="row">Date</th>
                  <td>{reservationDetail?.slot.date}</td>
                </tr>
                <tr>
                  <th scope="row">Time</th>
                  <td>{`${reservationDetail?.slot.startTime} - ${reservationDetail?.slot.endTime}`}</td>
                </tr>

                <tr>
                  <th scope="row">Is Holiday / Weekend</th>
                  <td>
                    {reservationDetail?.slot.isHoliday ||
                    reservationDetail?.slot.isWeekend
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>

                <tr>
                  <th scope="row">Price</th>
                  <td>
                    Rs.&nbsp;
                    {reservationDetail?.slot.isHoliday ||
                    reservationDetail?.slot.isWeekend
                      ? reservationDetail?.slot.dynamicPrice
                      : reservationDetail?.slot.basePrice}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div
              className="alert alert-success d-flex flex-column text-success"
              role="alert"
            >
              <h5>{customer.user.fullName}</h5>
              <span>Email: {customer.user.email}</span>
              <span>Contact: {customer.user.contact}</span>
            </div> */}

            {/* <button
                  type="button"
                  className="btn btn-success btn-sm form-control"
                  onClick={handleSubmit}
                >
                  Add
                </button> */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            {!isFromCustomerModal && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancellation}
              >
                Cancel Reservation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailModal;
