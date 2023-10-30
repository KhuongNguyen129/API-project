import { csrfFetch } from "./csrf";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const CREATE_IMAGE = "spots/CREATE_IMAGE";
const UPDATE_SPOT = "spots/UPDSTE_SPOT";
const DELETE_SPOT = "/spots/deleteSpot";

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
const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot,
  };
};

const createImage = (newImage) => {
  return {
    type: CREATE_IMAGE,
    newImage,
  };
};
const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

//THUNKS

export const getSpotsThunk =
  (page = 1) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/spots?page=${page}`);
    if (res.ok) {
      const spots = await res.json();
      dispatch(getSpots(spots));
      return spots;
    }
  };

export const getCurrentSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  if (res.ok) {
    const spots = await res.json();
    dispatch(getSpots(spots));
    return res;
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

    dispatch(createImage(image));
    return image;
  } else {
    const error = await res.json();
    // console.log("err........: ", error);
    return error;
  }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    const updateCurrentSpot = await res.json();
    dispatch(updateSpot(spot));
    return updateCurrentSpot;
  } catch (e) {
    return await e.json();
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      dispatch(deleteSpot(spotId));
    }
  } catch (e) {
    return await e.json();
  }
};

const initialState = {
  allSpots: {},
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = { ...state, allSpots: { ...state.allSpots } };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case GET_ONE_SPOT:
      newState = {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot,
        },
      };
      return newState;
    case CREATE_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.newSpot.id]: action.newSpot,
        },
      };

    case UPDATE_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: action.spot,
        },
      };
    case DELETE_SPOT:
      const allSpotsCopy = { ...state.allSpots };
      delete allSpotsCopy[action.spotId];
      return {
        ...state,
        allSpots: allSpotsCopy,
      };
    default:
      return state;
  }
};

export default spotsReducer;
