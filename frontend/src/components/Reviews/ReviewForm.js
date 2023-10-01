import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk, getReviewsThunk } from "../../store/reviews";

function ReviewForm({ spotId }) {
  const [errors, setErrors] = useState({});
  const [review, setDescription] = useState("");
  const [stars, setStarRating] = useState(0);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    let errObj = {};
    if (!review || review.length < 10)
      errObj.review = "Please enter a minimum of 10 characters for your review";

    setErrors(errObj);
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const submitReview = {
      review,
      stars,
    };

    if (Object.keys(errors).length === 0) {
      await dispatch(createReviewThunk(submitReview, spotId));
      await dispatch(getReviewsThunk(spotId));
      closeModal();
      setSubmit(false);
    }
  };

  return <></>;
}

export default ReviewForm;
