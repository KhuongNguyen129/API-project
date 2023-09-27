import { csrfFetch } from "./csrf";
const GET_REVIEWS = "reviews/GET_REVIEWS";

//Action
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

//THUNK

export const getReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(getReviews(reviews));
    return res;
  }
};

const initialState = {
  Reviews: {},
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
    default:
      return state;
  }
};

export default reviewsReducer;
