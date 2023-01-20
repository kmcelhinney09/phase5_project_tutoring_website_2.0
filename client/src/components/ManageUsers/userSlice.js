import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
//TODO: create an error tag and an update or add error and a reset error action
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
//[]: create thunk for user sign up
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

export const signUpUser = createAsyncThunk("user/SignUp", (signUpForm) => {
  return fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpForm),
  })
    .then((res) => res.json())
    .then((user) => user);
});
// [x]: add action to delete written notes
//[]: add action to add subject to user subjects tutored
//[]: add action to edit subjects tutored to user
//[x]: add action to remove subjects tutored from user
//[]: add action to add booked tutoring to store
//[]: add action to add tutor slot sign up to store
//[]: add action to edit user info in user store
//
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
    addTutorNote(state, { payload }) {
      console.log(payload);
      const newNote = {
        id: uuid(),
        tutor_id: payload.tutor_id,
        tutor_name: payload.tutor_name,
        tutor_note: payload.tutor_note,
        tutee_name: payload.tutee_name,
      };
      state.notesWritten.push(newNote);
    },
    removeWrittenNote(state, { payload }) {
      state.notesWritten = state.notesWritten.filter(
        (note) => note.id !== payload
      );
    },
    removeSubjectsTutored(state, { payload }) {
      state.subjectsSignedUp = state.subjectsSignedUp.filter(
        (signup) => signup.id !== payload
      );
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
    [signUpUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.fullName = payload.full_name;
      state.grade = payload.grade;
      state.role = payload.role;
      state.bookedAsTutor = payload.booked_as_tutor;
      state.bookedSlots = payload.booked_slots;
      state.subjectsSignedUp = payload.subjects_signed_up;
      state.tutorNotes = payload.tutor_notes;
      state.tutorSignUps = payload.tutor_sign_ups;
      state.notesWritten = payload.written_notes;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
  },
});

export const {
  addTutorSignUp,
  logOutUser,
  addTutorNote,
  removeWrittenNote,
  removeSubjectsTutored,
} = userSlice.actions;

export default userSlice.reducer;
