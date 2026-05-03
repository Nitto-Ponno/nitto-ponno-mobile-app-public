import { Product } from "@/services/types/productTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProductState {
  selectedProduct: Product | null;
  products: Product[] | null;
  selectionModal: boolean;
}

const initialState: ProductState = {
  selectedProduct: null,
  products: null,
  selectionModal: false,
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
    setSelectionModal: (state, action: PayloadAction<boolean>) => {
      state.selectionModal = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct, setSelectionModal } = productSlice.actions;

export default productSlice.reducer;
