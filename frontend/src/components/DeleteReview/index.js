import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";

export default function DeleteReview({ review, spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteReviewThunk(review, spot));
    setDeleted(false);
    closeModal();
  };

  const closeTheModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  console.log("review ****", review);

  return (
    <>
      {deleted && (
        <div>
          <h1>Confirm Delete</h1>
          <h2>Are you sure you want to delete this review?</h2>
          <button onClick={handleSubmit}>Yes (Delete Spot)</button>
          <button onClick={closeTheModal}>No (Keep Spot)</button>
        </div>
      )}
    </>
  );
}
