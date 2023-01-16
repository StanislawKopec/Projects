import logo from "./logo.svg";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./store/products-actions";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { library, Library } from "@fortawesome/fontawesome-svg-core";
import { faB, fas, faS } from "@fortawesome/free-solid-svg-icons";

library.add(faB, fas, faS);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
