import { Product } from "@/services/types/productTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProductState {
  selectedProduct: Product | null;
  products: Product[] | null;
}

const initialState: ProductState = {
  selectedProduct: null,
  products: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
