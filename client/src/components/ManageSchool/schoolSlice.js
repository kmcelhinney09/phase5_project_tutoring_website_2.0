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
  (state, slotForm) => {
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

    return fetch("/tutoring_time_slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newServerTimeSlot),
    }).then((res) => {
      if (res.ok) {
        res.json().then((slots) => slots);
      } else {
        res.json().then((e) => console.log(e.errors)); //[]: link to errors from school store (this wont work Thunk always returns fullfilled)
      }
    });
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
    addTutoringTimeSlot(state, { payload }) {
      let roomId;
      const date = new Date(`${payload.date} ${payload.start_time}`);
      console.log("Date: ", date);
      const endTime = new Date(`${payload.date} ${payload.end_time}`);
      const dateSort = new Date(`${payload.date} ${payload.start_time}`);

      state.locations.forEach((location) => {
        location.rooms.forEach((room) => {
          if (room.name === payload.room) {
            roomId = room.id;
          }
        });
      });

      const newSiteTimeSlot = {
        id: uuid(),
        created_by: payload.userId,
        tutor_capacity: payload.tutor_capacity,
        tutee_capacity: payload.tutee_capacity,
        date: format(date, "eeee, MMM e "),
        start_time: format(date, "p"),
        end_time: format(endTime, "p"),
        date_sort: Date.parse(dateSort),
        open_status: false,
        booked_status: false,
        school_id: state.id,
        room_id: roomId,
        location_render: `${payload.building} - ${payload.room}`,
        tutoring_slot_sign_ups: [],
        tutors: [],
      };

      state.tutoringTimeSlots.push(newSiteTimeSlot);
      state.tutoringTimeSlots.sort((a, b) =>
        a.date_sort > b.date_sort ? 1 : -1
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
    [postTutoringTimeSlot.fulfilled]: (state, { payload }) => {
      console.log("Tutoring Time Slot added");
      //[]: add sucess message and error handeling here
      state.isloading = false;
    },
  },
});

//[]: create selector that will return rooms associated with building (might do on back end with serializer)
export const { initializeSchool, addTutoringTimeSlot } = schoolSlice.actions;
export default schoolSlice.reducer;
