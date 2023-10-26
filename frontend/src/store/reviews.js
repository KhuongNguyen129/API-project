import { csrfFetch } from "./csrf";
const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "/spots/DELETE_REVIEW";

//Action
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const createReview = (newReview) => ({
  type: CREATE_REVIEW,
  newReview,
});

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

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
  let res;
  try {
    res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const newReview = await res.json();
    dispatch(createReview(newReview));
    await dispatch(getReviewsThunk(spotId));
    return newReview;
  } catch (e) {
    return await e.json();
  }
};

export const deleteReviewThunk = (review, spot) => async (dispatch) => {
  let res;
  try {
    res = await csrfFetch(`/api/reviews/${review.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      dispatch(deleteReview(review.id));
    }
  } catch (e) {
    return await e.json();
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
      };
      newState.Reviews[action.newReview.id] = action.newReview;
      return newState;
    case DELETE_REVIEW:
      newState = {
        ...state,
        Reviews: { ...state.Reviews },
      };
      delete newState.Reviews[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
