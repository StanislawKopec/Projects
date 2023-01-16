import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    filteredProductsList: [],
    categoriesList: ["all categories"],
  },
  reducers: {
    getAllProducts(state, action) {
      state.productsList = action.payload;
      state.filteredProductsList = state.productsList;
    },
    getAllCategories(state, action) {
      if (state.categoriesList.length === 1) {
        action.payload.map((item) => {
          state.categoriesList.push(item);
        });
      }
    },
    getAllProductsInCategory(state, action) {
      const category = action.payload;
      if (category === "all categories") {
        state.filteredProductsList = state.productsList;
        return;
      }
      state.filteredProductsList = state.productsList.filter((product) => {
        return product.category === category;
      });
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice;
