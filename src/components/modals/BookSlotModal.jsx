import React, { useEffect, useState } from "react";
import { useRelatedApi } from "../../helpers/api.helper";

const BookSlotModal = ({ handleClose, slotData, onSubmit }) => {
  const venueId = localStorage.getItem("venueId");
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [customer, setCustomer] = useState();
  const fetchCustomers = async () => {
    const response = await useRelatedApi(
      `customers/${venueId}`,
      "get",
      ""
    );
    if (response) {
      if (response.status === 404) return setCustomer([]);
      setCustomer(response.data);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async () => {
    const customerInfo = selectedCustomer.length >0 && JSON.parse(selectedCustomer);
    let payLoad = {
      slot: slotData._id,
      futsal: venueId,
    };
    if (showGuestForm) {
      payLoad.guestUser = {
        fullName: formData.fullName,
        email: formData.email,
        contact: formData.contact,
      };
    }
      else if(customerInfo.isRegistered){
        payLoad.user = customerInfo.id;
      
    } else {
      payLoad.guestUser = {
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        contact: customerInfo.contact,
      };
    }
    const response = await useRelatedApi("reservations/", 'post', payLoad)
    if(response){
      handleClose()
      onSubmit()
    }

  };

  return (
    <div
      className="modal show fade"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book Slot</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-primary mb-3  ">
              <h6 className="text-end">{slotData.date}</h6>
              <h6 className="text-end">
                {slotData.startTime} - {slotData.endTime}
              </h6>
            </div>
            <div>
            <p><span className="fw-bold">Day: </span>{slotData.isWeekend ? 'Weekend' : slotData.isHoliday ? 'Holiday' : 'Normal'}</p>
            <p><span className="fw-bold">Price: </span>Rs. {slotData.isWeekend || slotData.isHoliday ? slotData.dynamicPrice : slotData.basePrice}</p>
            {/* <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPrice"
                  placeholder="Price"
                  value={slotData.isWeeked || slotData.isHoliday ? slotData.dynamicPrice : slotData.basePrice}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingPrice">Price</label>
              </div> */}
            </div>
            <div className="form-floating mb-3">
              <select
                name=""
                id="floatingName"
                className="form-control"
                value={selectedCustomer && selectedCustomer.fullName}
                onChange={(event) => setSelectedCustomer(event.target.value)}
              >
                <option value="" disabled selected>
                  Select a customer
                </option>
                {customer &&
                  customer.length > 0 &&
                  customer.map((option) => (
                    <option
                      key={option.customerId}
                      value={JSON.stringify(option)}
                    >
                      {option.fullName}
                    </option>
                  ))}
              </select>
              <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="floatingIsGuest">Is Guest User&nbsp;&nbsp;</label>
              <input
                type="checkbox"
                className=""
                id="floatingIsGuest"
                value={formData && formData.date}
                onChange={() => setShowGuestForm((prev) => !prev)}
              />
            </div>
            <div className={`${showGuestForm ? "d-block" : "d-none"}`}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingGuestName"
                  placeholder="Fullname"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingGuestName">Fullname</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingGuestEmail"
                  placeholder="Email"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingGuestEmail">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingGuestContact"
                  placeholder="Contact"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingGuestContact">Contact</label>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary form-control"
              onClick={handleSubmit}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSlotModal