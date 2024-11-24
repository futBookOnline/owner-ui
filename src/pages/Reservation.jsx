import React, { useState, useEffect, useMemo } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper.js";
import { AgGridReact } from "ag-grid-react";

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

  // FETCH CUSTOMERS
  const [reservations, setReservations] = useState(null);
  const fetchCustomers = async () => {
    const response = await useRelatedApi(
      `reservations/${venueId}`,
      "get",
      ""
    );
    if(response?.success){
      if(!response?.data){
        setReservations([])
        return
      }
      console.log("RESERVATION RESPONSE: ", response.data)
      const reservationData = response.data.map(resData => ({
        fullName: resData.customer.fullName,
        email: resData.customer.email,
        contact: resData.customer.contact,
        date: resData.slot.slotDate,
        time: resData.slot.slotTime,
        price: resData.slot.price,
        isHoliday: resData.slot.isHoliday ? "Yes" : "No"
      }))
      console.log("RESERVAYI DATA:", reservationData)
      setReservations(reservationData)
    }
  };
  useEffect(()=>{
    fetchCustomers()
  }, [])
  return (
    <Layout>
      <h6>Reservations</h6>
      <hr />
      <div className="py-2">
        <div className="container">
          <div className={"ag-theme-alpine"} style={{ height: "75vh" }}>
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
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;
