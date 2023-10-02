import { useParams } from "react-router-dom/";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { getReviewsThunk } from "../../store/reviews";
import ReviewModal from "../Reviews";
import "./oneSpot.css";

function SpotDetails() {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.oneSpot);
  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("SPOT ONE SPOT", spot);
  // console.log("reviews5456456", reviews);
  const { spotId } = useParams();
  // console.log(".........", spotId);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) {
    return null;
  }
  if (!reviews) return null;

  const handleClick = (e) => {
    e.preventDefault();
    alert("Feature coming soon");
  };
  // console.log("SPOTIMG>>>>>>>: ", spot.SpotImages);
  // console.log("FIRSTNAME>>>>>>>: ", spot.Owner.firstName);
  // console.log("SPOT>>>>>>>: ", spot);
  return (
    <div id="spot-container">
      <div className="name">
        <div>{spot ? spot.name : "Loading..."}</div>
      </div>
      <div className="state">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>

      <div className="image-list">
        {spot.SpotImages &&
          spot.SpotImages.map((image) => (
            <img key={image.id} src={image.url} alt="main img" />
          ))}
      </div>

      <div className="host-reserve">
        <div className="host-detail">
          Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
          <div>{spot.description}</div>
        </div>

        <div className="rating-price-button">
          <div className="rating-price">
            <div className="ratings">
              <div className="price">
                <p>${spot.price} night</p>
              </div>
              <i className="fa-solid fa-star"></i>
              {!spot.avgRating || isNaN(spot.avgRating)
                ? "New"
                : parseFloat(spot.avgRating).toFixed(2)}
            </div>
          </div>
          <button className="reserve-button" onClick={handleClick}>
            Reserve
          </button>
        </div>
      </div>
      <p className="numReviews">
        {spot.numReviews ? `${spot.numReviews} review` : <p> </p>}
      </p>
      <div>
        {Object.values(reviews).map((review) => (
          <>
            <div>
              {review.User.firstName} {review.User.lastName}
            </div>
            <div>{review.createdAt}</div>
            <p>{review.review}</p>
          </>
        ))}
      </div>
      <ReviewModal spot={spot} />
    </div>
  );
}

export default SpotDetails;
