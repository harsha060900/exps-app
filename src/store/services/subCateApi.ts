import { api } from "../api";

export const subCateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubCate: builder.query({
      query: (id) => {
        return {
          url: `subCategory?cate_id=${id}`
        };
      },
      providesTags: ["SubCategory"]
    }),
    addSubCate: builder.mutation({
      query: (data) => {
        return {
          url: `subCategory`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["SubCategory", "Category"]
    }),
    updateSubCate: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `subCategory/${id}`,
          method: "patch",
          body: data
        };
      },
      invalidatesTags: ["SubCategory", "Category"]
    }),
    deleteSubCate: builder.mutation({
      query: (id) => {
        return {
          url: `subCategory/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["SubCategory", "Category"]
    })
  }),
  overrideExisting: true
});

export const {
  useGetSubCateQuery,
  useAddSubCateMutation,
  useUpdateSubCateMutation,
  useDeleteSubCateMutation
} = subCateApi;
