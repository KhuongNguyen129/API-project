import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import ReviewForm from "./ReviewForm";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview";

export default function ReviewModal({ spot }) {
  const dispatch = useDispatch();
  const { setModalContent, setonModalClose } = useModal();
  //   console.log("SPOT>>>>>>>>>", spot);

  const user = useSelector((state) => state.session.user);
  //   console.log("USER>>>>>>>:   ", user.id);
  const currentSpot = useSelector((state) => state.spots.oneSpot);
  //   console.log("CURRENTSPOT>>>>>>>:   ", currentSpot);

  //   const spotOwner = useSelector((state) => state.spots.oneSpot.ownerId);
  //   //   console.log("SPOTOWNER>>>>>>>:   ", spotOwner);

  const spotReviews = useSelector((state) => state.reviews.Reviews);
  //   console.log("spotReviews>>>>>>>:   ", spotReviews);

  const currentSpotReviews = Object.values(spotReviews);
  //   console.log("currentSpotReviews>>>>>>>:   ", currentSpotReviews);

  //   console.log("currReview>>>>>>>:   ", currReview);

  useEffect(() => {
    dispatch(getReviewsThunk(spot.id));
  }, [dispatch, spot]);

  if (!user) return null;
  if (!currentSpotReviews) return null;
  const currReview = currentSpotReviews.find(
    (review) => user.id === review.userId
  );
  return (
    <>
      <div>
        {user?.id && user?.id !== currentSpot?.Owner?.id && !currReview ? (
          <button
            type="submit"
            onClick={() => {
              setModalContent(<ReviewForm spot={spot} />);
            }}
          >
            Post Your Review
          </button>
        ) : null}
      </div>
      <div>
        {user?.id === currReview?.userId ? (
          <OpenModalButton
            buttonText="Delete Review"
            modalComponent={<DeleteReview review={currReview} spot={spot} />}
          />
        ) : null}
      </div>
    </>
  );
}
