import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
   

}

const dbSlice = createSlice({
    name : "db",
    initialState,
    reducers : {
        setBlogs : (state, action) => {
            state.blogs = action.payload
        },
        addBlogs : (state, action) => {
            state.blogs = [...state.blogs, action.payload]
        },
        updateBlog : (state, action) => {
            state.blogs = state.blogs.map( blog => blog.$id === action.payload.$id ? action.payload : blog)
        },
        deleteBlog:  (state, action) => {
            state.blogs = state.blogs.filter(blog => blog.$id !== action.payload)
        },
      
    }
})

export const { addBlogs, setBlogs, deleteBlog, updateBlog} = dbSlice.actions;
export default dbSlice.reducer;