import { Category } from "@/services/types/categoryTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: Category[] | null;
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: null,
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[] | null>) => {
      state.categories = action.payload;
    },

    clearCategories: (state) => {
      state.categories = [];
    },

    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategories, clearCategories, setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
