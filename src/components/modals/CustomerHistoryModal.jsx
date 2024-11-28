import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRelatedApi } from "../../helpers/api.helper";
import ReservationDetailModal from "./ReservationDetailModal.jsx";

const CustomerHistoryModal = ({ handleModalClose, customer }) => {
  const venueId = localStorage.getItem("venueId");
  const isRegisteredUser = customer.isRegisteredUser || false;
  const user = customer.user;
  const customerId = customer.id;
  const [colDefs, setColDefs] = useState([
    { field: "date" },
    { field: "time" },
    { field: "price" },
    { field: "isHoliday" },
    { field: "action", filter: false },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const [customerHistory, setCustomerHistory] = useState(null);
  const fetchCustomerHistory = async () => {
    const response = await useRelatedApi(
      `customers/history/${venueId}?isRegistered=${isRegisteredUser}&user=${JSON.stringify(
        user
      )}`,
      "get",
      ""
    );
    if (response?.success) {
      if (!response?.data) {
        setCustomerHistory([]);
        return;
      }
      const customerHistoryData = response.data.map((cusHistory) => ({
        date: cusHistory.date,
        isHoliday: cusHistory.isHoliday ? "Yes" : "No",
        price: cusHistory.price,
        reservationId: cusHistory.reservationId,
        time: cusHistory.time,
      }));
      console.log("CUSTOMER HISTORIES: ", response.data);
      setCustomerHistory(customerHistoryData);
    }
  };

  useEffect(() => {
    fetchCustomerHistory();
  }, []);

  const [reservationModalShow, setReservationModalShow] = useState({
    visible: false,
    reservationId: null,
  });
  const handleShow = async (id) => {
    setReservationModalShow((prev) => ({
      ...prev,
      visible: true,
      reservationId: id,
    }));
  };

  const [alert, setAlert] = useState("");
  const handleRemove = async () => {
    const response = await useRelatedApi(
      `customers/${customerId}`,
      "delete",
      ""
    );
    if (response.success) {
      setAlert("succeed");
      setTimeout(() => {
        setAlert("");
        handleModalClose();
      }, 2000);
    } else {
      setAlert("failed");
      setTimeout(() => {
        setAlert("");
      }, 2000);
    }
  };
  const handleClose = () =>
    setReservationModalShow((prev) => ({ ...prev, visible: false }));

  return (
    <div
      className="modal show fade modal-lg"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      {/* Reservation Modal */}
      {reservationModalShow.visible && (
        <ReservationDetailModal
          handleClose={() => handleClose()}
          reservationId={reservationModalShow.reservationId}
          isFromCustomerModal={true}
        />
      )}
      {/* Customer Removal Alert */}
      {alert === "failed" ? (
        <div
          className="z-3 alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 w-auto"
          role="alert"
        >
          <strong className="me-2">
            <i className="fa-regular fa-circle-xmark alert-danger me-2"></i>
            Failed!
          </strong>
          Could not remove customer.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : alert === "succeed" ? (
        <div
          className="z-3 alert alert-success alert-dismissible fade show position-fixed top-0 end-0  w-auto"
          role="alert"
        >
          <strong>
            <i className="fa-solid fa-circle-check me-2 alert-success"></i>
            Success!
          </strong>
          CUstomer removed.
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
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Customer History</h5>

            <button
              type="button"
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-success d-flex align-items-end justify-content-between">
              <div
                className=" d-flex flex-column text-success flex-3"
                role="alert"
              >
                <h5>{customer.user.fullName}</h5>
                <span>Email: {customer.user.email}</span>
                <span>Contact: {customer.user.contact}</span>
              </div>
              <div className="flex-1">
                <button
                  type="button"
                  className="btn btn-danger btn-sm form-control"
                  onClick={handleRemove}
                >
                  Remove Customer
                </button>
              </div>
            </div>
            <div className={"ag-theme-alpine"} style={{ height: "60vh" }}>
              <AgGridReact
                rowData={customerHistory}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={500}
                paginationPageSizeSelector={[200, 500, 1000]}
                defaultColDef={defaultColDef}
                onRowDoubleClicked={(params) =>
                  handleShow(params.data.reservationId)
                }
                overlayLoadingTemplate={
                  '<span class="ag-overlay-loading-center">Please wait while your data is loading...</span>'
                }
                overlayNoRowsTemplate={
                  '<span class="ag-overlay-no-rows-center">No data to display</span>'
                }
                autoSizeStrategy={{
                  type: "fitGridWidth",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryModal;
