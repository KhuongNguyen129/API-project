import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotsThunk } from "../../store/spots";
import "./spots.css";

function SpotsLandingPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [showFetchMore, setShowFetchMore] = useState(true);

  const selectedSpots = useSelector((state) => state.spots.allSpots);

  const spotsObj = Object.values(selectedSpots);

  useEffect(() => {
    dispatch(getSpotsThunk(page)).then((resJson) => {
      console.log(resJson);
      if (resJson.size !== resJson.Spots.length) {
        setShowFetchMore(false);
      }
    });
  }, [dispatch, page]);

  if (!spotsObj || !spotsObj.length) {
    return null;
  }
  return (
    <>
      <div className="spots-container">
        {spotsObj.map((spot) => (
          <NavLink
            to={`/spots/${spot.id}`}
            key={spot.id}
            className="spot-detail"
          >
            <div key={spot.id} className="spot">
              <div className="img">
                <img
                  src={spot.previewImage}
                  alt={spot.name}
                  title={spot.name}
                />
              </div>
              <div className="details-container">
                <div className="details">
                  <p className="city-State">
                    {spot.city}, {spot.state}
                  </p>
                  <p className="price">${spot.price} night</p>
                </div>
                <div className="ratings-stars">
                  <p className="ratings">
                    <i className="fa-solid fa-star"></i>
                    {!spot.avgRating || isNaN(spot.avgRating)
                      ? "New"
                      : parseFloat(spot.avgRating).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      {showFetchMore && (
        <button
          className="load-more-button"
          onClick={() => setPage((p) => p + 1)}
        >
          Load more
        </button>
      )}
    </>
  );
}

export default SpotsLandingPage;
