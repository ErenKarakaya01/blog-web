import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

// Define a type for the slice state
interface UserState {
  user:
    | {
        uid: string
        email: string
        displayName: string
        photoURL: string
        admin: boolean
      }
    | null
    | false
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (
      state,
      action: PayloadAction<
        | {
            uid: string
            email: string
            displayName: string
            photoURL: string
            admin: boolean
          }
        | false
      >
    ) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
