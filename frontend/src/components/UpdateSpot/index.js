import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSpotThunk, getOneSpotThunk } from "../../store/spots";

export default function UpdateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spots.oneSpot);
  //   console.log("curentSpot>>>>>>>     ", currentSpot);
  const { spotId } = useParams();

  const [country, setCountry] = useState(spot.country);
  const [streetAddress, setStreetAddress] = useState(spot.streetAddress);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [title, setTitle] = useState(spot.title);
  const [price, setPrice] = useState(spot.price);
  const [description, setDescription] = useState(spot.description);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const errorsObj = {};
    if (!country) errorsObj.country = "Country is required";
    if (!streetAddress) errorsObj.streetAddress = "Address is required";
    if (!city) errorsObj.city = "City is required";
    if (!state) errorsObj.state = "State is required";
    if (!title) errorsObj.title = "Name is required";
    if (!price) errorsObj.price = "Price is required";
    if (!description) errorsObj.description = "Description is required";
    if (description && description.length < 30)
      errorsObj.description = "Description needs a minimum of 30 characters";

    //update state with errorsObj
    setErrors(errorsObj);
  }, [country, streetAddress, city, state, description, title, price]);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    setCountry(spot.country || "");
    setStreetAddress(spot.streetAddress || "");
    setCity(spot.city || "");
    setState(spot.state || "");
    setTitle(spot.setTitle || "");
    setPrice(spot.setPrice || "");
    setDescription(spot.setDescription || "");
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    //Update spot
    const spotSubmit = {
      id: spot.id,
      country,
      address: streetAddress,
      city,
      state,
      description,
      name: title,
      price,
      lat: 1,
      lng: 1,
    };

    if (Object.keys(errors).length === 0) {
      const res = await dispatch(updateSpotThunk(spotSubmit));
      history.push(`/spots/${res.id}`);
      setSubmit(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Update your Spot</h2>
      <h3>Where's your place located</h3>
      <p>
        Guests will only get your exact address once they booked a reservation.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="first paragraph">
          <div className="err">
            <label>Country</label>
            {submit && errors.country && <p>{errors.country}</p>}
          </div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
          <div className="err">
            <label>Street Address</label>
            {submit && errors.streetAddress && <p>{errors.streetAddress}</p>}
          </div>
          <input
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <div className="city-state">
            <div className="city">
              <div className="err">
                <label>City</label>
                {submit && errors.city && <p>{errors.city}</p>}
              </div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
              />
            </div>
            <div className="state">
              <div className="err">
                <label>State</label>
                {submit && errors.state && <p>{errors.state}</p>}
              </div>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="STATE"
                required
              />
            </div>
          </div>
        </div>
        <div className="second paragraph">
          <label>Describe your place to guests</label>
          <p>
            Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          {submit && errors.description && (
            <p className="err-message">{errors.description}</p>
          )}
        </div>
        <div className="third paragraph">
          <label>Create a title for your spot</label>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of your spot"
            required
          />
          {submit && errors.title && (
            <p className="err-message">{errors.title}</p>
          )}
        </div>
        <div className="fouth paragraph">
          <label>Set a base price for your spot</label>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div className="price">
            <div>$ </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
              required
            />
          </div>
          {submit && errors.price && (
            <p className="err-message">{errors.price}</p>
          )}
        </div>

        <div className="create-from-button">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
}
