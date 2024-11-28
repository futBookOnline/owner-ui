import React, { useEffect, useState } from "react";
import { useRelatedApi } from "../../helpers/api.helper";

const EditSlotModal = ({ handleClose, slotData, onSubmit }) => {
  const numberRegex = /^\d+$/;
  const price =
    slotData.isWeekend || slotData.isHoliday
      ? slotData.dynamicPrice
      : slotData.basePrice;
  const isHoliday = slotData.Holiday;
  const isWeekend = slotData.isWeekend;
  const [formData, setFormData] = useState({ price });
  const slotId = slotData._id;
  const [error, setError] = useState(false);
  const handleUpdate = async () => {
    if (
      !formData.price ||
      (formData.price && !numberRegex.test(formData.price))
    ) {
      setError(true);
    } else {
      const payLoad =
        formData.day === "Normal"
          ? { basePrice: formData.price, isHoliday: false, isWeekend: false }
          : formData.day === "Weekend"
          ? { dynamicPrice: formData.price, isWeekend: true, isHoliday: false }
          : { dynamicPrice: formData.price, isWeekend: false, isHoliday: true };
      const response = await useRelatedApi(`slots/${slotId}`, "put", payLoad);
      if (response.success) {
        onSubmit();
      }
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
            <h5 className="modal-title">Edit Slot</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-primary mb-3">
              <h6 className="text-end">{slotData.date}</h6>
              <h6 className="text-end">
                {slotData.startTime} - {slotData.endTime}
              </h6>
            </div>
            <div className="my-5 py-5">
              <div className="form-floating mb-3">
                <select
                  className="form-control"
                  id="floatingDay"
                  placeholder="Day"
                  defaultValue={
                    !isHoliday && !isWeekend
                      ? "Normal"
                      : isHoliday
                      ? "Holiday"
                      : "Weekend"
                  }
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      day: event.target.value,
                    }))
                  }
                >
                  <option value="Normal">Normal</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Weekend">Weekend</option>
                </select>
                <label htmlFor="floatingDay">Day</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPrice"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(event) => {
                    setError(false);
                    setFormData((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }));
                  }}
                />
                <label htmlFor="floatingPrice">Price</label>
                {error && <small className="text-danger">Invalid price</small>}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary form-control"
              onClick={handleUpdate}
            >
              Update Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSlotModal;
