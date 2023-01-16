import { productsActions } from "./products-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const productsHandler = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data;
    };
    const categoriesHandler = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      return data;
    };
    const productsInCategoryHandler = async (category) => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await res.json();
      return data;
    };

    try {
      const productsData = await productsHandler();
      dispatch(productsActions.getAllProducts(productsData));

      const categoriesData = await categoriesHandler();
      dispatch(productsActions.getAllCategories(categoriesData));

      //   const productsInCategoryData = await productsInCategoryHandler();
      //   dispatch(
      //     productsActions.getAllProductsInCategory(productsInCategoryData)
      //   );
    } catch (error) {
      console.log(error);
    }
  };
};
