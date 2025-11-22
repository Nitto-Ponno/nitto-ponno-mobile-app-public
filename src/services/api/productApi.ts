import { buildQueryParams } from "@/utils/commonFunction";
import { http } from "../http";
import { ApiResponse } from "../types/genericTypes";
import { GetProductsParams, ProductListResponse } from "../types/productTypes";
import { setProducts, setSelectedProduct } from "@/store/reducer/productReducer";
import { handleErrorResponse } from "@/utils/handlers";
import { dispatch } from "@/store";

export const productApi = {
  async getProducts(params?: GetProductsParams): Promise<ApiResponse<ProductListResponse>> {
    const query = buildQueryParams(params || {});
    return await http.get<ApiResponse<ProductListResponse>>(`/laundryProduct${query}`);
  },

  async getFeaturedProducts(): Promise<ApiResponse<ProductListResponse>> {
    const query = buildQueryParams({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    return await http.get<ApiResponse<ProductListResponse>>(`/laundryProduct${query}`);
  },
  async getSingleProduct({ productId }: { productId: string }): Promise<ApiResponse<any>> {
    return await http.get<ApiResponse<any>>(`/laundryProduct/${productId}`);
  },
};
export const getFeaturedProducts = async () => {
  try {
    const response = await productApi.getFeaturedProducts();
    if (response.success) {
      dispatch(setProducts(response.data as any));
    }
  } catch (error: any) {
    handleErrorResponse(error, "Fetch Featured Products");
  }
};

export const getSingleProduct = async ({ productId }: { productId: string }) => {
  try {
    console.log("productId", JSON.stringify(productId, null, 2));
    const response = await productApi.getSingleProduct({ productId });
    console.log("SelectedProduct", JSON.stringify(response, null, 2));
    // if (response.success) {
    //   dispatch(setSelectedProduct(response.data as any));
    // }
  } catch (error: any) {
    handleErrorResponse(error, "Fetch Featured Products");
  }
};
