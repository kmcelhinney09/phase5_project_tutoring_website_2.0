import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./ManageUsers/userSlice"
import schoolSlice from "./ManageSchool/schoolSlice"

const store = configureStore({
  reducer:{
    user:userSlice,
    school:schoolSlice,
  }
})

export default store 