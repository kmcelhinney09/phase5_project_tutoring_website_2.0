import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  id: 0,
  name: "",
  locations: [],
  subjects: [],
  tutoringTimeSlots: [],
};

export const getSchoolData = createAsyncThunk("school/getSchoolData", () => {
  return fetch(`/schools/1`)
    .then((res) => res.json())
    .then((schoolData) => schoolData);
});

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: {
    [getSchoolData.pending]: (state) => {
      state.isLoading = true;
    },
    [getSchoolData.fulfilled]: (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.locations = payload.locations;
      state.subjects = payload.subjects;
      state.tutoringTimeSlots = payload.tutoring_time_slots;
      state.isLoading = false;
    },
  },
});

// export sortedSchoolState = (state) => {
// }

export const { initializeSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
