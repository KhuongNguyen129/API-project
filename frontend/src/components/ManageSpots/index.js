import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getCurrentSpotsThunk } from "../../store/spots";
import DeleteSpot from "../DeleteSpot";
import OpenModalButton from "../OpenModalButton";
import "./manageSpots.css";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //   console.log("USER.........: ", user);
  const spots = useSelector((state) => state.spots.allSpots);
  useEffect(() => {
    dispatch(getCurrentSpotsThunk());
  }, []);

  //   console.log("SPOT>>>>>>>: ", spots);
  const spotArr = Object.values(spots);
  if (!spotArr || !spotArr.length) {
    return null;
  }
  if (!user) {
    return <Redirect to="/" />;
  }

  const userSpots = spotArr.filter((spot) => spot.ownerId === user.id);

  return (
    <>
      <h1 className="manage-title">Manage Your Spots</h1>
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
            <div className="update-delete">
              <NavLink to={`/spots/${spot.id}/edit`}>
                <button>Update</button>
              </NavLink>
              <div className="all-delete">
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteSpot spot={spot} />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
