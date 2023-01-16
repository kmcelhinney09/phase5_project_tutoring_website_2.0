import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//TODO: Crete Error handleling ?? Maybe have an errors tag and just render errors there have actio to add errors and clear errors
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
//[] add action to add new tutoring time slot
//[] add action to edit tutoring time slot
//[] add action to remove tutoring time slot
//[] add action to add new building to school
//[] add action to edit building to school
//[] add action to remove building from school
//[] add action to add new room to school
//[] add action to edit room to school
//[] add action to remove room from school
//[] add action to remove subject from school

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
//[]: create selector that will return rooms associated with building (might do on back end with serializer)
export const { initializeSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
