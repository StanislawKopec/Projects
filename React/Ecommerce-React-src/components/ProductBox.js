import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import "./ProductBox.scss";

const ProductBox = ({ name, id, imgURL, price, category, quantity }) => {
  const item = { name, id, imgURL, price, category, quantity };
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart(item));
  };

  return (
    <div className="container-box">
      <img className="image" src={imgURL} />

      <h2 className="name">{name}</h2>
      <div className="footer-box">
        <h3 className="price">{price}$</h3>
        <Button
          variant="contained"
          className="add-btn"
          onClick={handleAddToCart}
        >
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
        </Button>
      </div>
    </div>
  );
};

export default ProductBox;
