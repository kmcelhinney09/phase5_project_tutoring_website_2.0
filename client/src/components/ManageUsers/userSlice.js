import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  errorText: "",
  renderErrorMessage: true,
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
      .then((userInfo) => userInfo);
  }
);

export const reAuthorizeUser = createAsyncThunk("user/reAuthorize", () => {
  return fetch("/auth")
    .then((res) => res.json())
    .then((userInfo) => userInfo);
});

//[x]: create thunk for user sign up
export const signUpUser = createAsyncThunk("user/SignUp", (signUpForm) => {
  return fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpForm),
  })
    .then((res) => res.json())
    .then((user) => user);
});

export const bookTutoringSlot = createAsyncThunk(
  "user/bookTutoringSlot",
  (bookSlotInfo) => {
    return fetch("/booked_slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookSlotInfo),
    })
      .then((res) => res.json())
      .then((bookedSlot) => bookedSlot);
  }
);

export const tutorSlotSignUp = createAsyncThunk(
  "user/tutorSlotSignUp",
  (tutorSlotInfo) => {
    return fetch("/tutor_slot_sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorSlotInfo),
    })
      .then((res) => res.json())
      .then((tutorSignUp) => tutorSignUp);
  }
);

export const addNewNote = createAsyncThunk("user/addNewNote", (noteInfo) => {
  return fetch("/tutor_note", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteInfo),
  })
    .then((res) => res.json())
    .then((return_note) => return_note);
});

// [x]: add action to delete written notes
//[x]: add action to add subject to user subjects tutored
//[x]: add action to edit subjects tutored to user (This is self contained in edit user)
//[x]: add action to remove subjects tutored from user
//[x]: add action to add booked tutoring to store
//[x]: add action to add tutor slot sign up to store
//[x]: add drop booked session
//[x]: add drop entiore tutoring session

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setServerError(state, { payload }) {
      state.errorText = payload.error;
    },
    clearError(state) {
      state.errorText = "";
    },
    logOutUser(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state = initialState;
    },
    removeWrittenNote(state, { payload }) {
      state.notesWritten = state.notesWritten.filter(
        (note) => note.id !== payload
      );
    },
    addSubjectsTutored(state, { payload }) {
      state.subjectsSignedUp.push(payload);
      state.subjectsSignedUp.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    removeSubjectsTutored(state, { payload }) {
      state.subjectsSignedUp = state.subjectsSignedUp.filter(
        (signup) => signup.id !== payload
      );
    },
    removeBookedTimeSlots(state, { payload }) {
      state.bookedSlots = state.bookedSlots.filter(
        (booked) => booked.id !== payload
      );
    },
    removeBookedAsTutor(state, { payload }) {
      state.bookedAsTutor = state.bookedAsTutor.filter(
        (session) => session.id !== payload
      );
    },
    removeEntireTutoringSession(state, { payload }) {
      state.tutorSignUps = state.tutorSignUps.filter(
        (session) => session.id !== payload
      );
      state.bookedAsTutor = state.bookedAsTutor.filter(
        (session) => session.tutor_slot_sign_up_id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
          typeof payload.error === "string"
            ? (state.errorText = [["Server Error", payload.error]])
            : (state.errorText = Object.entries(payload.error));
        } else {
          state.renderErrorMessage = false;
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
      })
      .addCase(reAuthorizeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reAuthorizeUser.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
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
      })
      .addCase(signUpUser.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
          typeof payload.error === "string"
            ? (state.errorText = [["Server Error", payload.error]])
            : (state.errorText = Object.entries(payload.error));
        } else {
          state.renderErrorMessage = false;
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
        }
      })
      .addCase(bookTutoringSlot.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(bookTutoringSlot.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
          typeof payload.error === "string"
            ? (state.errorText = [["Server Error", payload.error]])
            : (state.errorText = Object.entries(payload.error));
        } else {
          state.renderErrorMessage = false;
          state.bookedSlots.push(payload);
          state.bookedSlots.sort((a, b) =>
            a.date_sort > b.date_sort ? 1 : -1
          );
          state.isLoading = false;
        }
      })
      .addCase(tutorSlotSignUp.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(tutorSlotSignUp.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
          typeof payload.error === "string"
            ? (state.errorText = [["Server Error", payload.error]])
            : (state.errorText = Object.entries(payload.error));
        } else {
          state.renderErrorMessage = false;
          state.tutorSignUps.push(payload);
          state.tutorSignUps.sort((a, b) =>
            a.date_sort > b.date_sort ? 1 : -1
          );
          state.isLoading = false;
        }
      })
      .addCase(addNewNote.pending, (state) => {
        state.renderErrorMessage = true;
      })
      .addCase(addNewNote.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
          if (typeof payload.error === "string") {
            state.errorText = [["Server Error", payload.error]];
          } else {
            state.errorText = Object.entries(payload.error);
          }
        } else {
          state.renderErrorMessage = false;
          state.notesWritten.push(payload);
        }
      });
  },
});

export const {
  setServerError,
  clearError,
  logOutUser,
  removeWrittenNote,
  addSubjectsTutored,
  removeSubjectsTutored,
  removeBookedTimeSlots,
  removeBookedAsTutor,
  removeEntireTutoringSession,
} = userSlice.actions;

export default userSlice.reducer;
