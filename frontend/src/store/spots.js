import { csrfFetch } from "./csrf";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";

//ACTION CREATORS
const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot,
  };
};
const getOneSpot = (spot) => {
  return {
    type: GET_ONE_SPOT,
    spot,
  };
};

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

//THUNKS
export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(getOneSpot(newSpot));
    return newSpot;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spot = await res.json();
    dispatch(getOneSpot(spot));
    return res;
  }
};
export const getSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(getSpots(spots));
    return res;
  }
};

const initialState = {
  allSpots: {},
  oneSpot: {},
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = { ...state, allSpots: {} };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case GET_ONE_SPOT:
      newState = { ...state, oneSpot: action.spot };
      return newState;
    case CREATE_SPOT:
      newState.allSpots[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
