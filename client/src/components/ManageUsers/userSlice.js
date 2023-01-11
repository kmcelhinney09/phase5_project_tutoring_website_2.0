import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  id: 0,
  email: "",
  fullName: "",
  grade: "",
  role: "",
  schoolId: 0,
  bookedAsTutor: [],
  bookedSlots: [],
  subjectsSignedUp: [],
  tutorNotes: [],
  tutorSignUps: [],
  notesWritten: [],
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
      .then((userInfo) => {
        console.log(userInfo);
        return userInfo;
      });
  }
);

export const reAuthorizeUser = createAsyncThunk("user/reAuthorize", () => {
  return fetch("/auth")
    .then((res) => res.json())
    .then((userInfo) => {
      return userInfo;
    });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTutorSignUp(state, action) {
      console.log(state);
      console.log(action);
    },
    logOutUser(state) {
      state.isLoading = false;
      state = initialState;
    },
  },
  extraReducers: {
    [getUserInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.fullName = payload.full_name;
      state.grade = payload.grade;
      state.role = payload.role;
      state.schoolId = payload.school.id;
      state.bookedAsTutor = payload.booked_as_tutor;
      state.bookedSlots = payload.booked_slots;
      state.subjectsSignedUp = payload.subjects_signed_up;
      state.tutorNotes = payload.tutor_notes;
      state.tutorSignUps = payload.tutor_sign_ups;
      state.notesWritten = payload.written_notes;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [reAuthorizeUser.pending]: (state) => {
      state.isLoading = true;
    },
    [reAuthorizeUser.fulfilled]: (state, { payload }) => {
      if (Object.keys(payload).includes("error")) {
        console.log(payload);
      } else {
        state.id = payload.id;
        state.email = payload.email;
        state.fullName = payload.full_name;
        state.grade = payload.grade;
        state.role = payload.role;
        state.schoolId = payload.school.id;
        state.bookedAsTutor = payload.booked_as_tutor;
        state.bookedSlots = payload.booked_slots;
        state.subjectsSignedUp = payload.subjects_signed_up;
        state.tutorNotes = payload.tutor_notes;
        state.tutorSignUps = payload.tutor_sign_ups;
        state.notesWritten = payload.written_notes;
        state.isLoggedIn = true;
        state.isLoading = false;
      }
    },
  },
});

export const { addTutorSignUp, logOutUser } = userSlice.actions;

export default userSlice.reducer;
