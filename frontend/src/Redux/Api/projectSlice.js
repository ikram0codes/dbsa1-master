import { apiSlice } from "./ApiSlice";
import { Project_url } from "../constant";


const ProjectSlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        createProject: builders.mutation({
            query: (data) => ({
                url: Project_url,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Project"]
        }),
        updateProject: builders.mutation({
            query: (data) => ({
                url: `${Project_url}/${data._id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Project"]
        }),
        deleteProject: builders.mutation({
            query: (ProjectId) => ({
                url: `${Project_url}/${ProjectId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"]
        }),
        getProject: builders.query({
            query: (ProjectId) => ({
                url: `${Project_url}/${ProjectId}`,
            }),
            providesTags: ["Project"],
            keepUnusedDataFor: 5,

        }),
        allProject: builders.query({
            query: () => ({
                url: `${Project_url}/allProject`,
            }),
            providesTags: ["Project"],
            keepUnusedDataFor: 5,
        }),
    })
})

export const { useAllProjectQuery, useGetProjectQuery, useCreateProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } = ProjectSlice;