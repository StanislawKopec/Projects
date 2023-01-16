import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalPrice: 0,
    itemsInCartCount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const list = JSON.parse(JSON.stringify(state.itemsList));
      state.itemsInCartCount += action.payload.quantity;
      state.totalPrice += action.payload.quantity * action.payload.price;

      const index = list.find((item) => item.id === action.payload.id);

      if (index) {
        const updatedList = list.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        state.itemsList = updatedList;
      } else {
        state.itemsList.push(action.payload);
      }
    },
    removeRow(state, action) {
      const list = JSON.parse(JSON.stringify(state.itemsList));
      const itemId = action.payload;
      const item = list.find((item) => item.id === action.payload);

      state.itemsList = list.filter((item) => item.id !== itemId);
      state.totalPrice -= item.quantity * item.price;
      state.itemsInCartCount -= item.quantity;
    },
    removeAll(state, action) {
      state.itemsList = [];
      state.totalPrice = 0;
      state.itemsInCartCount = 0;
    },
    removeOne(state, action) {
      const list = JSON.parse(JSON.stringify(state.itemsList));
      const item = list.find((item) => item.id === action.payload);

      const updatedList = list.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      state.itemsList = updatedList;
      state.totalPrice -= item.price;
      state.itemsInCartCount -= 1;
    },
    addOne(state, action) {
      const list = JSON.parse(JSON.stringify(state.itemsList));
      const item = list.find((item) => item.id === action.payload);

      const updatedList = list.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      state.itemsList = updatedList;
      state.totalPrice += item.price;
      state.itemsInCartCount += 1;
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
