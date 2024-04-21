import { api } from "../api";

export const categoryApi = api.injectEndpoints({
    endpoints:(builder)=>({
        getCategory:builder.query({
            query:()=>{
                return{
                    url:`category`
                }
            },
            providesTags:["Category"]
        }),
        addCategory:builder.mutation({
            query:( data)=>{
                return{
                    url:`category`,
                    method:"POST",
                    body:data
                }
            },
            invalidatesTags:['Category']
        }),
    }),
  overrideExisting: true

})

export const{
    useGetCategoryQuery,
    useAddCategoryMutation
} = categoryApi;