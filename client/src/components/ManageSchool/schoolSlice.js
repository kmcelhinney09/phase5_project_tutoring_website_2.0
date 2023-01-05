import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  id: 0,
  name: "",
  spots: [],
  subjects: [],
  tutoringTimeSlots: [],
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    initializeSchool(state, { payload }) {
      state.id = payload.school.id;
      state.name = payload.school.name;
      state.subjects = payload.school.subjects;
      state.loactions = payload.school.locations;
      state.tutoringTimeSlots = [...payload.school.tutoring_time_slots];
    },
  },
});

export const { initializeSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
