import { csrfFetch } from "./csrf";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const CREATE_IMAGE = "spots/CREATE_IMAGE";

//ACTION CREATORS
const createImage = (newImage) => {
  return {
    type: CREATE_IMAGE,
    newImage,
  };
};
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
export const createImageThunk = (url, preview, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, preview }),
  });
  // console.log("res.........: ", res)

  if (res.ok) {
    const image = await res.json();
    // console.log("image.........: ", image)

    dispatch(getOneSpot(image));
    return image;
  } else {
    const error = await res.json();
    console.log("err........: ", error);
    return error;
  }
};
export const createSpotThunk = (spot) => async (dispatch) => {
  let res;
  try {
    res = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    // console.log("res.........: ", res)
    const newSpot = await res.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  } catch (e) {
    return await e.json();
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
      return {
        ...state,
        oneSpot: action.spot,
        allSpots: newSpot,
      };
    default:
      return state;
  }
};

export default spotsReducer;
