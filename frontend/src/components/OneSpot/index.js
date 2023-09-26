import { useParams } from "react-router-dom/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";

function SpotDetails() {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.oneSpot);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    alert(".....");
  };
}

export default SpotDetails;
