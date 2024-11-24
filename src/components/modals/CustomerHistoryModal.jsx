import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRelatedApi } from "../../helpers/api.helper";

const CustomerHistoryModal = ({ handleClose, customer }) => {
  console.log("CUSTOMER: ", customer);
  const venueId = localStorage.getItem("venueId");
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

  const [customerHistory, setCustomerHistory] = useState(null)
  const fetchCustomerHistory = async () => {
    const isRegisteredUser = customer.isRegisteredUser || false;
    console.log("CUSTOMER: ", customer);
    const user = customer.user;
    console.log("USER: ", user);
    console.log("IS REGISTERED USER: ", isRegisteredUser);
    const response = await useRelatedApi(
      `customers/history/${venueId}?isRegistered=${isRegisteredUser}&user=${JSON.stringify(
        user
      )}`,
      "get",
      ""
    );
    if (response?.success) {
      console.log("CUSTOMERS HISTORY RESPONSE: ", response.data || 0);
      setCustomerHistory(response.data || []);
    }
  };

  useEffect(() => {
    fetchCustomerHistory();
  }, []);

  const handleSubmit = async () => {
    alert("SUBMITTED");
  };
  return (
    <div
      className="modal show fade modal-lg"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Customer History</h5>

            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="alert alert-success d-flex flex-column text-success"
              role="alert"
            >
              <h5>{customer.user.fullName}</h5>
              <span>Email: {customer.user.email}</span>
              <span>Contact: {customer.user.contact}</span>
            </div>
            <div className={"ag-theme-alpine"} style={{ height: "60vh" }}>
              <AgGridReact
                rowData={customerHistory}
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
                // onRowDoubleClicked={() => handleShow()}
              />
            </div>
            {/* <button
                  type="button"
                  className="btn btn-success btn-sm form-control"
                  onClick={handleSubmit}
                >
                  Add
                </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryModal;
