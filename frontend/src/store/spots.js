import { csrfFetch } from "./csrf";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const GET_SPOTS = "spots/GET_SPOTS";

//ACTION CREATORS
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
    default:
      return state;
  }
};

export default spotsReducer;
