import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCost = useSelector((state) => state.cart.totalPrice);

  const handleContinueShoppingClick = () => {
    navigate("/home");
  };
  const handleProceedToCheckoutClick = () => {
    alert("Proceeded to Checkout");
  };
  const handleRemoveAllClick = () => {
    dispatch(cartActions.removeAll());
  };
  const handleRemoveRowClick = (id) => () => {
    dispatch(cartActions.removeRow(id));
  };
  const handleRemoveOne = (id, quantity) => () => {
    if (quantity == 1) dispatch(cartActions.removeRow(id));
    else dispatch(cartActions.removeOne(id));
  };
  const handleAddOne = (id) => () => {
    dispatch(cartActions.addOne(id));
  };

  const cartItemsList = [];
  useSelector((state) =>
    state.cart.itemsList.map((cartItem) => cartItemsList.push(cartItem))
  );
  if (cartItemsList.length) {
    console.log(cartItemsList);
    return (
      <div className="container-main">
        <div className="container-content-cart">
          <div className="container-header">
            <p>product</p>
            <p>name</p>
            <p>price</p>
            <p>quantity</p>
            <p>total</p>
            <button onClick={handleRemoveAllClick}>remove all</button>
          </div>

          {cartItemsList.map((cartItem) => (
            <div className="content" key={cartItem.id}>
              <img src={cartItem.imgURL} className="image" />
              <p className="name">{cartItem.name}</p>
              <p>{cartItem.price.toFixed(2)}$</p>
              <div className="container-quantity">
                <button
                  className="subtract"
                  onClick={handleRemoveOne(cartItem.id, cartItem.quantity)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-minus" />
                </button>
                <p>{cartItem.quantity}</p>
                <button className="add" onClick={handleAddOne(cartItem.id)}>
                  <FontAwesomeIcon icon="fa-solid fa-plus" />
                </button>
              </div>
              <p>{(cartItem.quantity * cartItem.price).toFixed(2)}$</p>
              <button onClick={handleRemoveRowClick(cartItem.id)}>
                <FontAwesomeIcon
                  className="icon"
                  icon="fa-solid fa-circle-xmark"
                />
              </button>
            </div>
          ))}

          <div className="container-footer">
            <button
              className="shopping-btn"
              onClick={handleContinueShoppingClick}
            >
              Continue Shopping
            </button>
            <h2 className="cart-cost">Cart Cost: {cartCost.toFixed(2)}$ </h2>
            <button
              className="checkout-btn"
              onClick={handleProceedToCheckoutClick}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-empty">
        <button className="shopping-btn" onClick={handleContinueShoppingClick}>
          Continue Shopping
        </button>
      </div>
    );
  }
};

export default Cart;
