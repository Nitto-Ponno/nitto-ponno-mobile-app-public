/* ============================
   📌 TYPES (All in One File)
   ============================ */

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  subCategories: string[];
  isDeleted: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
/* Response types */
export type GetAllCategoriesResponse = Category[];
export type GetSingleCategoryResponse = Category;
