import { csrfFetch } from "./csrf";
const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";

//Action
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const createReview = (newReview) => ({
  type: CREATE_REVIEW,
  newReview,
});

//THUNK
export const getReviewsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const reviews = await res.json();
      dispatch(getReviews(reviews));
      return res;
    }
  } catch (e) {
    return await e.json();
  }
};

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  // let res;
  // try {
  //   res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(review),
  //   });
  //   const newReview = await res.json();
  //   dispatch(createReview(review));
  //   return newReview;
  // } catch (e) {
  //   return await e.json();
  // }
  let res;
  res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    // console.log("res for new review", res);
    const newReview = await res.json();
    dispatch(createReview(review));
    // dispatch(getSingleSpotThunk(review));
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {
  Reviews: {},
  User: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state, Reviews: {} };
      action.reviews.Reviews.forEach((review) => {
        newState.Reviews[review.id] = review;
      });
      return newState;
    case CREATE_REVIEW:
      newState = {
        ...state,
        Reviews: { ...state.Reviews },
        user: { ...state.User },
      };
      newState.Reviews[action.newReview.id] = action.newReview;
    default:
      return state;
  }
};

export default reviewsReducer;
