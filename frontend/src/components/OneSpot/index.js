import { useParams } from "react-router-dom/";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { getReviewsThunk } from "../../store/reviews";
import "./oneSpot.css";

function SpotDetails() {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.oneSpot);
  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("reviews5456456", reviews);
  const { spotId } = useParams();
  // console.log(spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    alert("Feature coming soon");
  };

  return (
    <div id="spot-container">
      <div className="name">
        <div>{spot ? spot.name : "Loading..."}</div>
      </div>
      <div className="rating-reviews-host-state">
        <div className="ratings">
          <i className="fa-solid fa-star"></i>
          {!spot.avgRating ? <span>NEW</span> : spot.avgRating.toFixed(2)}
        </div>
        <p className="numReviews">
          {spot.numReviews ? `${spot.numReviews} review` : <p> </p>}
        </p>
        <div className="host-detail">
          <p>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </p>
        </div>
        <div className="state">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
      </div>
      <div className="image-list">
        {spot.SpotImages.map((image) => (
          <img key={image.id} src={image.url} alt="main img" />
        ))}
      </div>
      <div>{spot.description}</div>

      <div className="price">
        <p>${spot.price} night</p>
      </div>
      <button className="reserve-button" onClick={handleClick}>
        Reserve
      </button>
      <div>
        {Object.values(reviews).map((review) => (
          <p>{review.review}</p>
        ))}
      </div>
    </div>
  );
}

export default SpotDetails;
