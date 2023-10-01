import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import ReviewForm from "./ReviewForm";

export default function ReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { setModalContent, setonModalClose } = useModal();

  const user = useSelector((state) => state.session.user);
  //   console.log("USER>>>>>>>:   ", user);
  const currentSpot = useSelector((state) => state.spots.oneSpot);
  //   console.log("CURRENTSPOT>>>>>>>:   ", currentSpot);

  const currentSpotReviews = Object.values(currentSpot);
  console.log("currentSpotReviews>>>>>>>:   ", currentSpotReviews);

  const currReview = currentSpotReviews.find(
    (review) => (user.id = review.userId)
  );
  console.log("currReview>>>>>>>:   ", currReview);

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!user) return null;
  if (!currentSpotReviews) return null;
  return (
    <>
      <div>
        {user.id && user.id !== currentSpot?.Owner?.id && !currReview ? (
          <button
            type="submit"
            onClick={() => {
              setModalContent(<ReviewForm spotId={spotId} />);
            }}
          >
            {" "}
            Post Your Review
          </button>
        ) : null}
      </div>
    </>
  );
}
