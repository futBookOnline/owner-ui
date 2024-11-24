import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { useRelatedApi } from "../helpers/api.helper";
import { formatDateToNepal } from "../helpers/utils.helper";

const Dashboard = () => {
  const venueId = localStorage.getItem("venueId");
  console.log("ISO DATE:", new Date())
  const now = formatDateToNepal(new Date());

  // FETCH RESERVED SLOTS
  const [reservationsCount, setReservationsCount] = useState(null);
  const fetchReservations = async () => {
    const response = await useRelatedApi(
      `slots/${venueId}?startDate=${now}`,
      "get",
      ""
    );
    console.log("NOW: ", now)
    console.log("RESERVED COUNT: ", response)
    if(response?.success && response.data &&  response.data.length > 0){
      console.log("RESERVED COUNT INSIDE: ", response)
      setReservationsCount(response.data.filter(reservation => reservation.isReserved).length)
    }
  };

  // FETCH AVAILABLE SLOTS
  const [availableSlotsCount, setAvailableSlotsCount] = useState(null);
  const fetchAvailableSlots = async () => {
    const response = await useRelatedApi(
      `slots/${venueId}?startDate=${now}`,
      "get",
      ""
    );
    if(response?.success && response.data && response.data.length > 0){
      setAvailableSlotsCount(response.data.filter(reservation => !reservation.isReserved).length)
    }
  };

  // FETCH CUSTOMERS
  const [customersCount, setCustomersCount] = useState(null);
  const fetchCustomers = async () => {
    const response = await useRelatedApi(
      `customers/${venueId}`,
      "get",
      ""
    );
    if(response?.success && response.data &&  response.data.length > 0){
      setCustomersCount(response.data.length)
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchAvailableSlots();
    fetchCustomers();
  }, []);
  return (
    <Layout>
      <h6>Dashboard</h6>
      <hr />
      <div className="py-5">
        <div className="container">
          <div className="row gx-5">
            <div className="d-flex justify-content-between text-center gap-1 fw-bold flex-wrap">
              <Link
                to={"/slots"}
                className="nav-link card  p-5 bg-primary-subtle text-primary"
              >
                <h4>{availableSlotsCount}</h4>
                <small>Available Slots</small>
              </Link>
              <Link
                to={"/reservations"}
                className="nav-link card p-5 bg-danger-subtle text-danger"
              >
                <h4>{reservationsCount}</h4>
                <small>Reservations</small>
              </Link>
              <Link
                to={"/customers"}
                className="nav-link card p-5 bg-info-subtle text-info"
              >
                <h4>{customersCount}</h4>
                <small>Customers</small>
              </Link>
              <Link
                to={"/events"}
                className="nav-link card p-5 bg-secondary-subtle text-secondary"
              >
                <h4>0</h4>
                <small>Events</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
