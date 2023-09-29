// import { useParams, useHistory } from "react-router-dom/";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createImageThunk, createSpotThunk } from "../../store/spots";
import "./createSpot.css";

export const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    const errorsObj = {};
    if (!country) errorsObj.country = "Country is required";
    if (!streetAddress) errorsObj.streetAddress = "Address is required";
    if (!city) errorsObj.city = "City is required";
    if (!state) errorsObj.state = "State is required";
    if (!description || (description && description.length < 30))
      errorsObj.description = "Description needs a minimum of 30 characters";
    if (!title) errorsObj.title = "Name is required";
    if (!price) errorsObj.price = "Price is required";
    if (
      !previewImg &&
      !previewImg.endsWith(".jpg") &&
      !previewImg.endsWith(".jpeg") &&
      !previewImg.endsWith(".png")
    )
      errorsObj.previewImg = "Preview image is required";
    if (
      !imgOne &&
      !imgOne.endsWith(".jpg") &&
      !imgOne.endsWith(".jpeg") &&
      !imgOne.endsWith(".png")
    )
      errorsObj.imgOne = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      !imgTwo &&
      !imgTwo.endsWith(".jpg") &&
      !imgTwo.endsWith(".jpeg") &&
      !imgTwo.endsWith(".png")
    )
      errorsObj.imgTwo = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      !imgThree &&
      !imgThree.endsWith(".jpg") &&
      !imgThree.endsWith(".jpeg") &&
      !imgThree.endsWith(".png")
    )
      errorsObj.imgThree = "Image URL must end in .png, .jpg, or .jpeg";
    if (
      !imgFour &&
      !imgFour.endsWith(".jpg") &&
      !imgFour.endsWith(".jpeg") &&
      !imgFour.endsWith(".png")
    )
      errorsObj.imgFour = "Image URL must end in .png, .jpg, or .jpeg";

    //update state with errorsObj
    setErrors(errorsObj);
  }, [
    country,
    streetAddress,
    city,
    state,
    description,
    title,
    price,
    previewImg,
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitForm(true);

    //create spot
    const spotSubmit = {
      country,
      address: streetAddress,
      city,
      state,
      description,
      name: title,
      price,
      previewImg,
      imgOne,
      imgTwo,
      imgThree,
      imgFour,
      lat: 1,
      lng: 1,
    };

    if (Object.keys(errors).length === 0) {
      const res = await dispatch(createSpotThunk(spotSubmit));
      if (!res.errors) {
        await dispatch(createImageThunk(previewImg, true, res.id));
        await dispatch(createImageThunk(imgOne, false, res.id));
        await dispatch(createImageThunk(imgTwo, false, res.id));
        await dispatch(createImageThunk(imgThree, false, res.id));
        await dispatch(createImageThunk(imgFour, false, res.id));
        history.push(`/spots/${res.id}`);
      }
      setSubmitForm(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a new Spot</h2>
      <form onSubmit={handleSubmit}>
        <div className="first paragraph">
          <div className="err">
            <label>Country</label>
            {errors.country && <p>{errors.country}</p>}
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
            {errors.streetAddress && <p>{errors.streetAddress}</p>}
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
                {errors.city && <p>{errors.city}</p>}
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
                {errors.state && <p>{errors.state}</p>}
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
          {errors.description && (
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
          {errors.title && <p className="err-message">{errors.title}</p>}
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
          {errors.price && <p className="err-message">{errors.price}</p>}
        </div>
        <div className="fifth paragraph">
          <label>Liven up your spot with photos</label>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
            type="text"
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
            placeholder="Preview Image URL"
            required
          />
          {submitForm && errors.previewImg && <p>{errors.previewImg}</p>}
          <input
            type="text"
            value={imgOne}
            onChange={(e) => setImgOne(e.target.value)}
            placeholder="Image URL"
            required
          />
          {submitForm && errors.imgOne && <p>{errors.imgOne}</p>}

          <input
            type="text"
            value={imgTwo}
            onChange={(e) => setImgTwo(e.target.value)}
            placeholder="Image URL"
            required
          />
          {submitForm && errors.imgTwo && <p>{errors.imgTwo}</p>}

          <input
            type="text"
            value={imgThree}
            onChange={(e) => setImgThree(e.target.value)}
            placeholder="Image URL"
            required
          />
          {submitForm && errors.imgThree && <p>{errors.imgThree}</p>}

          <input
            type="text"
            value={imgFour}
            onChange={(e) => setImgFour(e.target.value)}
            placeholder="Image URL"
            required
          />
          {submitForm && errors.imgFour && <p>{errors.imgFour}</p>}
        </div>

        <div className="create-from-button">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
};
export default CreateSpot;
