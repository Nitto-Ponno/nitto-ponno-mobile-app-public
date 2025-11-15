import { http } from "@/services/http";
import { ApiResponse } from "../types/genericTypes";
import { GetAllCategoriesResponse, GetSingleCategoryResponse } from "../types/categoryTypes";
import { handleErrorResponse } from "@/utils/handlers";
import { dispatch } from "@/store";
import { setCategories } from "@/store/reducer/categoryReducer";

/* ============================
   📌 CATEGORY API
   ============================ */

export const CategoryApi = {
  /**
   * GET /category/get-all
   * Retrieves all categories (no authentication needed)
   */
  async getAll(): Promise<ApiResponse<GetAllCategoriesResponse>> {
    return await http.get<ApiResponse<GetAllCategoriesResponse>>("/category/get-all");
  },

  /**
   * GET /category/single/{id}
   * Retrieves a specific category by ID (requires token)
   */
  async getSingle(id: string): Promise<ApiResponse<GetSingleCategoryResponse>> {
    return await http.get<ApiResponse<GetSingleCategoryResponse>>(`/category/single/${id}`);
  },
};

export const GetAllCategories = async () => {
  console.log("Called---------");
  try {
    const response = await CategoryApi.getAll();
    console.log("response", JSON.stringify(response, null, 2));
    if (response.success) {
      dispatch(setCategories(response.data));
    }
  } catch (error: any) {
    handleErrorResponse(error, "Get All Categories");
  }
};
