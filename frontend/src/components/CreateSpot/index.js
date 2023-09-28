import { useParams, useHistory } from "react-router-dom/";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const CreateSpot = () => {
  const dispatch = useDispatch();
};

// const spots = await Spot.create({
//     ownerId: req.user.id,
//     address,
//     city,
//     state,
//     country,
//     name,
//     description,
//     price,
//   });

const [country, setCountry] = useState("");
const [streetAddress, setStreetAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");

const [errors, setErrors] = useState({});
const { closeModal } = useModal();

const handleSubmit = (e) => {
  e.preventDefault();
};

return (
  <>
    <h1>Create a new Spot</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      {/* {errors.country && <p>{errors.country}</p>} */}
      <label>
        Street Address
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          required
        />
      </label>
      {/* {errors.username && <p>{errors.username}</p>} */}
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      {/* {errors.firstName && <p>{errors.firstName}</p>} */}
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      {/* {errors.lastName && <p>{errors.lastName}</p>} */}
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      {/* {errors.password && <p>{errors.password}</p>} */}
      <label>
        Price
        <input
          type=""
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
      <button type="submit">Sign Up</button>
    </form>
  </>
);

export default CreateSpot;
