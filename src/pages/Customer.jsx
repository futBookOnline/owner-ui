import React, { useState, useEffect, useMemo } from "react";
import Layout from "../layouts/Layout";
import { useRelatedApi } from "../helpers/api.helper.js";
import { AgGridReact } from "ag-grid-react";
import CustomerHistoryModal from "../components/modals/CustomerHistoryModal.jsx";

const Customer = () => {
  const venueId = localStorage.getItem("venueId");

  const [colDefs, setColDefs] = useState([
    { field: "fullName" },
    { field: "email" },
    { field: "contact" },
    { field: "gamesPlayed" },
    { field: "lastPlayed" },
    { field: "action", filter: false },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      floatingFilter: true,
    };
  }, []);

  // FETCH CUSTOMERS
  const [customers, setCustomers] = useState(null);
  const fetchCustomers = async () => {
    const response = await useRelatedApi(`customers/${venueId}`, "get", "");

    if (response?.success) {
      console.log("CUSTOMERS RESPONSE: ", response.data || 0);
      setCustomers(response.data || []);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const [show, setShow] = useState({ visible: false, data: null });
  const handleShow = (user) => {
    setShow((prev) => ({ ...prev, visible: true, data: user }));
  };
  const handleClose = () => setShow((prev) => ({ ...prev, visible: false }));

  return (
    <Layout>
      <h6>Customers</h6>
      <hr />
      {show.visible && (
        <CustomerHistoryModal
          handleClose={() => handleClose()}
          customer={show.data}
        />
      )}
      <div className="py-2">
        <div className="container">
          <div className={"ag-theme-alpine"} style={{ height: "72vh" }}>
            <AgGridReact
              rowData={customers}
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
              onRowDoubleClicked={(params) =>
                handleShow(
                  params.data.isRegistered
                    ? {
                        user: params.data.user,
                        isRegisteredUser: params.data.isRegistered,
                      }
                    : {
                        user: {
                          fullName: params.data.fullName,
                          email: params.data.email,
                          contact: params.data.contact,
                        },
                        isRegisteredUser: params.data.isRegistered,
                      }
                )
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customer;
