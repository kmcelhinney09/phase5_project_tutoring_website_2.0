import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

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

export const postTutoringTimeSlot = createAsyncThunk(
  "school/postTutoringTimeSlot",
  (slotForm, thunkAPI) => {
    // console.log("FROOM FETCH FORM: ", slotForm);
    const state = thunkAPI.getState().school;
    console.log("GET STATE: ", state);
    let roomId;

    state.locations.forEach((location) => {
      location.rooms.forEach((room) => {
        if (room.name === slotForm.room) {
          roomId = room.id;
        }
      });
    });

    const newServerTimeSlot = {
      created_by: slotForm.userId,
      tutor_capacity: slotForm.tutor_capacity,
      tutee_capacity: slotForm.tutee_capacity,
      start_time: `${slotForm.date} ${slotForm.start_time}`,
      end_time: `${slotForm.date} ${slotForm.end_time}`,
      open_status: false,
      booked_status: false,
      school_id: state.id,
      room_id: roomId,
    };
    console.log("From FETCH :", newServerTimeSlot);

    return fetch("/tutoring_time_slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newServerTimeSlot),
    })
      .then((res) => res.json())
      .then((slots) => slots);
  }
);

//[x] add action to add new tutoring time slot
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
  reducers: {
    removeTutoringTimeSlot(state, { payload }) {
      state.tutoringTimeSlots = state.tutoringTimeSlots.filter(
        (slot) => slot.id !== payload
      );
    },
  },
  extraReducers: {
    [getSchoolData.pending]: (state) => {
      state.isLoading = true;
    },
    [getSchoolData.fulfilled]: (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.rooms = payload.rooms;
      state.buildings = payload.buildings;
      state.locations = payload.locations;
      state.subjects = payload.subjects;
      state.tutoringTimeSlots = payload.tutoring_time_slots;
      state.isLoading = false;
    },
    [postTutoringTimeSlot.pending]: (state) => {
      state.isloading = true;
    },
    [postTutoringTimeSlot.fulfilled]: (state, action) => {
      console.log("Tutoring Time Slot added: ", action.payload);
      const newSiteTimeSlot = {
        id: action.payload.id,
        created_by: action.payload.created_by,
        tutor_capacity: action.payload.tutor_capacity,
        tutee_capacity: action.payload.tutee_capacity,
        date: action.payload.date,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
        date_sort: action.payload.date_sort,
        open_status: action.payload.open_status,
        booked_status: action.payload.booked_status,
        school_id: state.id,
        room_id: action.payload.room_id,
        location_render: action.payload.location_render,
        tutoring_slot_sign_ups: action.payload.tutoring_slot_sign_ups,
        tutors: action.payload.tutors,
      };
      state.tutoringTimeSlots.push(newSiteTimeSlot);
      state.tutoringTimeSlots.sort((a, b) =>
        a.date_sort > b.date_sort ? 1 : -1
      );
      //[]: add sucess message and error handeling here
      state.isloading = false;
    },
  },
});

//[]: create selector that will return rooms associated with building (might do on back end with serializer)
export const { removeTutoringTimeSlot } = schoolSlice.actions;
export default schoolSlice.reducer;
