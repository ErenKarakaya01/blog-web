import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

// Define a type for the slice state
interface PostState {
  title: string
  category: string
  place: string
  tags: string[]
  content: string
}

// Define the initial state using that type
const initialState: PostState = {
  title: "",
  category: "",
  place: "",
  tags: [],
  content: "",
}

export const contentSlice = createSlice({
  name: "post",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setPlace: (state, action: PayloadAction<string>) => {
      state.place = action.payload
    },
    setTags: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.tags = action.payload
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
  },
})

export const { setTitle, setCategory, setPlace, setTags, setContent } =
  contentSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPost = (state: RootState) => state.post.content

export default contentSlice.reducer