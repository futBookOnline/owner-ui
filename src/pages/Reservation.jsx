import React, { useState, useEffect, useMemo } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper.js";
import { AgGridReact } from "ag-grid-react";
import { formatDateToNepal } from "../helpers/utils.helper.js";
import ReservationDetailModal from "../components/modals/ReservationDetailModal.jsx";

const Reservation = () => {
  const venueId = localStorage.getItem("venueId");

  const [colDefs, setColDefs] = useState([
    { field: "fullName" },
    { field: "email" },
    { field: "contact" },
    { field: "date" },
    { field: "time" },
    { field: "price" },
    { field: "isHoliday" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
    };
  }, []);

  const [date, setDate] = useState(formatDateToNepal(new Date()));

  // FETCH RESERVATIONS
  const [reservations, setReservations] = useState(null);
  const fetchReservations = async () => {
    const response = await useRelatedApi(
      `reservations/${venueId}/venue?date=${date}`,
      "get",
      ""
    );
    if (response?.success) {
      if (!response?.data) {
        setReservations([]);
        return;
      }
      const reservationData = response.data.map((resData) => ({
        id: resData.id,
        fullName: resData.customer.fullName,
        email: resData.customer.email,
        contact: resData.customer.contact,
        date: resData.slot.slotDate,
        time: resData.slot.slotTime,
        price: resData.slot.price,
        isHoliday: resData.slot.isHoliday ? "Yes" : "No",
      }));
      setReservations(reservationData);
    }
  };
  useEffect(() => {
    fetchReservations();
  }, [date]);

  const [show, setShow] = useState({ visible: false, data: null });
  const handleShow = (id) => {
    setShow((prev) => ({ ...prev, visible: true, reservationId: id }));
  };
  const handleClose = () => {
    setShow((prev) => ({ ...prev, visible: false }));
    fetchReservations();
  };
  return (
    <Layout>
      <h6>Reservations</h6>
      <hr />
      {show.visible && (
        <ReservationDetailModal
          handleClose={() => handleClose()}
          reservationId={show.reservationId}
        />
      )}
      <div className="py-2">
        <div className="container">
          <div className="row mb-1">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className={"ag-theme-alpine"} style={{ height: "70vh" }}>
              <AgGridReact
                rowData={reservations}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={500}
                paginationPageSizeSelector={[200, 500, 1000]}
                defaultColDef={defaultColDef}
                // onRowDoubleClicked={(params) =>
                //   handleShow("edit", params.data.id)
                // }
                overlayLoadingTemplate={
                  '<span class="ag-overlay-loading-center">Please wait while your data is loading...</span>'
                }
                overlayNoRowsTemplate={
                  '<span class="ag-overlay-no-rows-center">No data to display</span>'
                }
                autoSizeStrategy={{
                  type: "fitGridWidth",
                }}
                onRowDoubleClicked={(params) => handleShow(params.data.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;
