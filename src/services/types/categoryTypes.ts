/* ============================
   📌 TYPES (All in One File)
   ============================ */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  isDeleted: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subCategories: Category[];
}

/* Response types */
export type GetAllCategoriesResponse = Category[];
export type GetSingleCategoryResponse = Category;
