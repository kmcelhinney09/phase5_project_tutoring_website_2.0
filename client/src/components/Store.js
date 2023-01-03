import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./ManageUsers/userSlice"

const store = configureStore({
  reducer:{
    user:userSlice,
  }
})

export default store 