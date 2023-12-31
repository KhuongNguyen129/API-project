import { useParams } from "react-router-dom/";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { getReviewsThunk } from "../../store/reviews";
import ReviewModal from "../Reviews";
import "./oneSpot.css";

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.allSpots[spotId]);
  // console.log(spot);
  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("REVIEWS>>>>>>    ", reviews);

  // const user = useSelector((state) => state.session.user);
  // console.log("USER>>>>>>>>>>>>>     ", user);

  const reviewsArr = Object.values(reviews);

  // let userReview;
  // if (user) {
  //   userReview = reviewsArr.find(
  //     (review) =>
  //       // console.log("USERREVIEW", review.User.id);
  //       // console.log("USER", user.id);
  //       review.User.id === user.id
  //   );
  // }
  // console.log("USERREVIEW", review.User.id);
  // console.log("SPOT ONE SPOT", spot);
  // const spotArr = Object.values(spot);
  // console.log("SPOT ONE SPOT ARRAY", spotArr);
  // console.log("reviews5456456", reviews);
  // console.log(".........", spotId);

  const dateFormatter = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const newDate = new Date(date);
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear();

    return `${month} ${year}`;
  };

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId, reviewsArr.length]);

  let imageCounter = 1;

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
            <img src={image.url} className={`image${imageCounter++}`} />
          ))}
      </div>

      <div id="callout-box">
        <div className="host-detail">
          Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
          <div>
            <p>{spot.description}</p>
          </div>
        </div>
        <div className="rating-price-button">
          <div className="rating-price">
            <div className="price">
              <p>${spot.price}</p>
              <span>night</span>
            </div>
            <div className="right-side-callout">
              <i className="fa-solid fa-star"></i>
              {spot.numReviews === 0
                ? null
                : `${parseFloat(spot.avgRating).toFixed(2)}`}
              {!spot.numReviews ? " " : " · "}
              {spot.numReviews === 0
                ? `New`
                : spot.numReviews === 1
                ? `1 Review`
                : `${spot.numReviews} Reviews`}
            </div>
          </div>
          <div id="reserve-button-div">
            <button className="reserve-button" onClick={handleClick}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <p className="numReviews">
        <i className="fa-solid fa-star"></i>
        {spot.numReviews === 0
          ? null
          : `${parseFloat(spot.avgRating).toFixed(2)}`}
        {!spot.numReviews ? " " : " · "}
        {spot.numReviews === 0
          ? `New`
          : spot.numReviews === 1
          ? `1 Review`
          : `${spot.numReviews} Reviews`}
      </p>
      <ReviewModal spot={spot} />
      <div>
        {Object.values(reviews)
          .toReversed()
          .map((review) => (
            <>
              <div>{review.User?.firstName}</div>
              <div>{dateFormatter(review.createdAt)}</div>
              <p>{review.review}</p>
              {/* <p>review.User.id: {user && review.User.id}</p>
              <p>userReview.id: {user && userReview.id}</p>
              {user && review.User?.id === userReview.User?.id ? (
                <ReviewModal spot={spot} />
              ) : null}
              {userReview ? (
                <p>user review exist</p>
              ) : (
                <p>user review is not exist</p>
              )} */}
            </>
          ))}
      </div>
    </div>
  );
}

export default SpotDetails;
