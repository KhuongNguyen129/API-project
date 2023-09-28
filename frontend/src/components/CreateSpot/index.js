// import { useParams, useHistory } from "react-router-dom/";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./createSpot.css";

export const CreateSpot = () => {
  const dispatch = useDispatch();
  //   const sessionUser = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
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
          required
        />
        {/* {errors.country && <p>{errors.country}</p>} */}
        <label>Street Address</label>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
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
              required
            />
            {/* {errors.lastName && <p>{errors.lastName}</p>} */}
          </div>
        </div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* {errors.password && <p>{errors.password}</p>} */}
        <label>Price</label>
        <input
          type=""
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};
export default CreateSpot;
