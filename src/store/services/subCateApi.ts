import { api } from "../api";

export const subCateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubCate: builder.query({
      query: () => {
        return {
          url: `subCategory`
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
      invalidatesTags: ["SubCategory"]
    }),
    updateSubCate: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `subCategory/${id}`,
          method: "patch",
          body: data
        };
      },
      invalidatesTags: ["SubCategory"]
    }),
    deleteSubCate: builder.mutation({
      query: (id) => {
        console.log("q:", id);

        return {
          url: `subCategory/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["SubCategory"]
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
