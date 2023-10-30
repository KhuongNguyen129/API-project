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
  // console.log("🚀 >>>>>>>>>>>>>>>>> ~ ReviewModal ~ user:", user);
  // console.log("Current User >>>>>>> user.id ", user.id);
  // const currentSpot = useSelector((state) => state.spots.oneSpot);
  //   console.log("CURRENTSPOT>>>>>>>:   ", currentSpot);

  //   const spotOwner = useSelector((state) => state.spots.oneSpot.ownerId);
  //   //   console.log("SPOTOWNER>>>>>>>:   ", spotOwner);

  const spotReviews = useSelector((state) => state.reviews.Reviews);
  //   console.log("spotReviews>>>>>>>:   ", spotReviews);

  const currentSpotReviews = Object.values(spotReviews);
  console.log(
    "currentSpotReviews>>>>>>> all reviews at current spot [array]:   ",
    currentSpotReviews
  );

  //   console.log("currReview>>>>>>>:   ", currReview);

  useEffect(() => {
    dispatch(getReviewsThunk(spot.id));
  }, [dispatch, spot]);

  // if (!user) return null;
  if (!currentSpotReviews) return null;

  let currReview;
  // find whether current user has posted a review at this spot or not
  if (user) {
    currReview = currentSpotReviews.find((review) => user.id === review.userId);
  }
  // console.log("🚀 >>>>>>>>>>>>>>>>> ~ ReviewModal ~ currReview:", currReview);
  // console.log("🚀 >>>>>>>>>>>>>>>>> currReview.User.id", currReview.User.id);

  // console.log("🚀 >>>>>>>>>>>>>>>>> spot.Owner.id", spot.Owner.id);

  // if user  && user.id !== spot.Owner.id && !currentSpotReviews && !currReview
  // SHOW "Be the first to post" a review & post review button
  // :
  // if user && user.id does not equal spot.owner.id && currentSpotReviews
  // SHOW post a review button only
  // :
  // null
  return (
    <>
      {/* <h1>user.id: {user.id}</h1>
      <h1>spot.Owner.id: {spot.Owner.id}</h1>
      <h1>
        {currReview ? (
          <p>currReview.User.id: {currReview.User.id}</p>
        ) : (
          <p>User review does not exist</p>
        )}
      </h1>
      <h1>
        {currentSpotReviews ? (
          <p>Reviews array exists</p>
        ) : (
          <p>Reviews array does not exist</p>
        )}
      </h1> */}
      <div>
        {user &&
        spot.Owner &&
        user.id !== spot.Owner.id &&
        !currReview &&
        currentSpotReviews.length === 0 ? (
          <>
            <h1>Be the first to post a review!</h1>
            <button
              className="postReview"
              type="submit"
              onClick={() => {
                setModalContent(<ReviewForm spot={spot} />);
              }}
            >
              Post Your Review
            </button>
          </>
        ) : user &&
          spot.Owner &&
          user.id !== spot.Owner.id &&
          !currReview &&
          currentSpotReviews.length >= 1 ? (
          <button
            className="postReview"
            type="submit"
            onClick={() => {
              setModalContent(<ReviewForm spot={spot} />);
            }}
          >
            Post Your Review
          </button>
        ) : user && spot.Owner && user.id !== spot.Owner.id && currReview ? (
          <div className="all-delete delete-review-button">
            <OpenModalButton
              buttonText="Delete Review"
              modalComponent={<DeleteReview review={currReview} spot={spot} />}
            />
          </div>
        ) : null}
      </div>
      {/* <div>
        {user?.id === currReview?.userId ? (
          <div className="all-delete">
            <OpenModalButton
              buttonText="Delete Review"
              modalComponent={<DeleteReview review={currReview} spot={spot} />}
            />
          </div>
        ) : null}
      </div> */}
    </>
  );
}
