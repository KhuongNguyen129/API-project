import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import "./manageSpots.css";

export default function ManageSpots() {
  const user = useSelector((state) => state.session.user);
  //   console.log("USER.........: ", user);
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  //   console.log("SPOT>>>>>>>: ", spots);
  const spotArr = Object.values(spots);
  if (!spotArr || !spotArr.length) {
    dispatch(getSpotsThunk());
    return null;
  }
  if (!user) {
    return <Redirect to="/" />;
  }

  const userSpots = spotArr.filter((spot) => spot.ownerId === user.id);

  return (
    <>
      <h1>Manage Your Spots</h1>
      <div className="spots-container">
        {userSpots.map((spot) => (
          <div id="spot-map-container">
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <div className="spot">
                <img src={spot.previewImage} alt={spot.name} />
                <div className="details-container">
                  <div>
                    <p>
                      {spot.city}, {spot.state}
                    </p>
                    <p>${spot.price} night</p>
                  </div>
                  <div className="rating">
                    <i className="fa-solid fa-star"></i>{" "}
                    {!spot.avgRating || isNaN(spot.avgRating)
                      ? `New`
                      : parseFloat(spot.avgRating).toFixed(2)}
                  </div>
                </div>
                <div className="buttons"></div>
              </div>
            </NavLink>
            <NavLink to={`/spots/${spot.id}/edit`}>
              <button>Update</button>
            </NavLink>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
