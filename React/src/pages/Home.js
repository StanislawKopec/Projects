import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductBox from "../components/ProductBox";
import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";
import { fetchData } from "../store/products-actions";
import { productsActions } from "../store/products-slice";
import "./Home.scss";

const Home = () => {
  const products = useSelector((state) => state.products.filteredProductsList);
  return (
    <div className="container-main">
      <Header />
      <div className="container-content">
        <div className="container-categories">
          <Categories />
        </div>
        <Products products={products} />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo">Website Go</h1>
      <div className="buttons">
        <LoginBtn />
        <CartBtn />
      </div>
    </div>
  );
};

const LoginBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = () => {
    navigate("/login");
    dispatch(authActions.logout());
    dispatch(cartActions.removeAll());
  };
  if (!isLoggedIn) {
    return (
      <Button variant="contained" className="button" onClick={handleLoginClick}>
        Login
      </Button>
    );
  } else {
    return (
      <div className="container-loggedIn">
        <h2>Welcome {loggedInUser}!</h2>
        <Button
          variant="contained"
          className="button"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </div>
    );
  }
};

const CartBtn = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const badgeCount = useSelector((state) => state.cart.itemsInCartCount);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleRouteToCartClick = () => {
    navigate("/cart");
  };

  const cartItemsList = [];
  useSelector((state) =>
    state.cart.itemsList.map((cartItem) => cartItemsList.push(cartItem))
  );
  const totalPrice = useSelector((state) => state.cart.totalPrice).toFixed(2);

  if (cartItemsList.length) {
    return (
      <div>
        <Badge badgeContent={badgeCount} color="secondary">
          <Button
            className="button"
            variant="contained"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Cart
          </Button>
        </Badge>
        <Menu
          className="cart-menu"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div className="cart-menu-content-container">
            <div className="menu-header">
              <p className="item-header">Product</p>
              <p className="item-header">Quantity</p>
              <p className="item-header">Price</p>
            </div>

            <div className="menu-content">
              {cartItemsList.map((cartItem) => (
                <div className="content-top" key={cartItem.id}>
                  <h2 className="item-content">{cartItem.name}</h2>
                  <h2 className="item-content">{cartItem.quantity}</h2>
                  <h2 className="item-content">
                    {cartItem.quantity} x{cartItem.price}
                  </h2>
                </div>
              ))}
              <div className="content-footer">Total: {totalPrice}$</div>
            </div>

            <div className="menu-footer">
              <button className="item-footer item-footer-clear">
                Clear Cart
              </button>
              <button
                className="item-footer item-footer-checkout"
                onClick={handleRouteToCartClick}
              >
                Checkout
              </button>
            </div>
          </div>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          className="button"
          variant="contained"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Cart
        </Button>
        <Menu
          className="cart-menu"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div className="cart-menu-content-container">
            <h2 className="empty">Cart Empty</h2>
          </div>
        </Menu>
      </div>
    );
  }
};

const Products = ({ products }) => {
  return (
    <div className="container-products">
      {products.map((product) => (
        <div className="container-product" key={product.id}>
          <ProductBox
            id={product.id}
            name={product.title}
            imgURL={product.image}
            price={product.price}
            category={product.category}
            quantity={1}
          />
        </div>
      ))}
    </div>
  );
};

const Categories = () => {
  const categories = useSelector((state) => state.products.categoriesList);
  return (
    <div className="container-categories">
      {categories.map((category) => (
        <div key={category}>
          <Category category={category} />
        </div>
      ))}
    </div>
  );
};

const Category = ({ category }) => {
  const dispatch = useDispatch();
  const SortByCategoryClick = () => {
    dispatch(productsActions.getAllProductsInCategory(category));
  };
  return (
    <button className="button-category" onClick={SortByCategoryClick}>
      <h2 className="category-name">{category}</h2>
    </button>
  );
};

export default Home;
