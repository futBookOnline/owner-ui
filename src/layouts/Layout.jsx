import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";
const userId = localStorage.getItem("userId");
const Layout = ({ children }) => {
  const [futsal, setFutsal] = useState(null);
  const fetchFutsalData = async () => {
    const response = await useRelatedApi(
      `futsals/${userId}/futsal`,
      "get",
      ""
    );
    console.log("FUTSAL DATA: ", response);
    if (response?.success) {
      localStorage.setItem("venueId", response.data.id)
      setFutsal(response.data);
    }
  };
  useEffect(() => {
    fetchFutsalData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar futsalInfo={futsal} />
        <div className="row p-3">{children}</div>
        <div className="row position-fixed bottom-0 w-100 p-2 bg-body-tertiary">
          <div className="d-flex justify-content-between">
            <span className="text-center">&copy;&nbsp;Copyright - 2024</span>
            <span>Futsal Finder</span>
            <div>
              <Link className="text-decoration-none">Privacy</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link className="text-decoration-none">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
