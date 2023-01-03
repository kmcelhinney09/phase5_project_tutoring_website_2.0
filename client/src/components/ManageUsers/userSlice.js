import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Feedback from "react-bootstrap/esm/Feedback";

const initialState = {
  isLoading: false,
  userInfo: {
    id: 0,
    email: "",
    fullName: "",
    grade: "",
    role: "",
    bookedAsTutor: [],
    bookedSlots: [],
    subjectsSignedUp: [],
    tutorNotes: [],
    tutorSignUps: [],
    notesWritten: [],
  },
};

export const getUserInfo = createAsyncThunk(
  "user/initializeUser",
  (loginForm) => {
    return fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .then((userInfo) => userInfo);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTutorSignUp(state, action) {
      console.log(state);
      console.log(action);
    },
  },
  extraReducers: {
    [getUserInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo.id = payload.id;
      state.userInfo.email = payload.email;
      state.userInfo.fullName = payload.full_name;
      state.userInfo.grade = payload.grade;
      state.userInfo.role = payload.role;
      state.userInfo.bookedAsTutor = payload.booked_as_tutor;
      state.userInfo.bookedSlots = payload.booked_slots;
      state.userInfo.subjectsSignedUp = payload.subjects_signed_up;
      state.userInfo.tutorNotes = payload.tutor_notes;
      state.userInfo.tutorSignUps = payload.tutor_sign_ups;
      state.userInfo.notesWritten = payload.written_notes;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
