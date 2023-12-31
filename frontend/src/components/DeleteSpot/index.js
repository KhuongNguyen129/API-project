import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpot.css";

export default function DeleteSpot({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [deleted, setDeleted] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    setDeleted(false);
    closeModal();
  };

  const closeTheModel = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      {deleted && (
        <div>
          <h2>Confirm Delete</h2>
          <h3>Are you sure you want to remove this spot from the listings?</h3>
          <button id="delete-spot" onClick={handleSubmit}>
            Yes (Delete Spot)
          </button>
          <button id="delete-spot-2" onClick={closeTheModel}>
            No (Keep Spot)
          </button>
        </div>
      )}
    </>
  );
}
