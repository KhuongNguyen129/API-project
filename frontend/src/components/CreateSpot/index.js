// import { useParams, useHistory } from "react-router-dom/";
import React, { useState } from "react";
import { useDispatch, useHistory } from "react-redux";
import "./createSpot.css";

export const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const sessionUser = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [imgOne, setImgOne] = useState("");
  const [imgTwo, setImgTwo] = useState("");
  const [imgThree, setImgThree] = useState("");
  const [imgFour, setImgFour] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const errorsObj = {};
    if (!country) errorsObj.country = "Country is required";
    if (!streetAddress) errorsObj.streetAddress = "Address is required";
    if (!city) errorsObj.city = "City is required";
    if (!state) errorsObj.state = "State is required";
    if (!description)
      errorsObj.description = "Description needs a minimum of 30 characters";
    if (!title) errorsObj.title = "Name is required";
    if (!price) errorsObj.price = "Price is required";
    if (!previewImg) errorsObj.previewImg = "Preview image is required";
    if (!imgOne)
      errorsObj.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
    if (!imgTwo)
      errorsObj.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
    if (!imgThree)
      errorsObj.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
    if (!imgFour)
      errorsObj.imgFour = "Image URL must end in .png, .jpg, or .jpeg";
  };

  return (
    <div className="form-container">
      <h2>Create a new Spot</h2>
      <form onSubmit={handleSubmit}>
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        {/* {errors.country && <p>{errors.country}</p>} */}
        <label>Street Address</label>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          placeholder="Address"
          required
        />
        {/* {errors.username && <p>{errors.username}</p>} */}
        <div className="city-state">
          <div className="city">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
            {/* {errors.firstName && <p>{errors.firstName}</p>} */}
          </div>
          <div className="state">
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="STATE"
              required
            />
            {/* {errors.lastName && <p>{errors.lastName}</p>} */}
          </div>
        </div>
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
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
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
        {/* {errors.password && <p>{errors.password}</p>} */}
        <label>Set a base price for your spot</label>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <div>
          $
          <input
            type=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
            required
          />
        </div>
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}

        <label>Liven up your spot with photos</label>
        <p>Submit a link to at least one photo to publish your spot</p>
        <input
          type="text"
          value={previewImg}
          onChange={(e) => setPreviewImg(e.target.value)}
          placeholder="Preview Image URL"
          required
        />
        <input
          type="text"
          value={imgOne}
          onChange={(e) => setImgOne(e.target.value)}
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          value={imgTwo}
          onChange={(e) => setImgTwo(e.target.value)}
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          value={imgThree}
          onChange={(e) => setImgThree(e.target.value)}
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          value={imgFour}
          onChange={(e) => setImgFour(e.target.value)}
          placeholder="Image URL"
          required
        />

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};
export default CreateSpot;
