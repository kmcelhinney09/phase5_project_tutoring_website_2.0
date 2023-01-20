import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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

export const createTutoringTimeSlot = createAsyncThunk(
  "school/createTutoringTimeSlot",
  (slotForm, thunkAPI) => {
    // console.log("FROOM FETCH FORM: ", slotForm);
    const school = thunkAPI.getState().school;
    let roomId;

    school.locations.forEach((location) => {
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
      school_id: school.id,
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

export const updateTutoringTimeSlot = createAsyncThunk(
  "school/updateTutoriingTimeSlot",
  (slotData, thunkAPI) => {
    const { school } = thunkAPI.getState();
    const newServerTimeSlot = {
      created_by: slotData.userId,
      tutor_capacity: slotData.tutor_capacity,
      tutee_capacity: slotData.tutee_capacity,
      start_time: `${slotData.date} ${slotData.start_time}`,
      end_time: `${slotData.date} ${slotData.end_time}`,
      school_id: school.id,
      room_id: slotData.room_id,
    };
    return fetch(`/tutoring_time_slots/${slotData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newServerTimeSlot),
    })
      .then((res) => res.json())
      .then((slot) => slot);
  }
);

const createNewSiteTutoringSlot = (slotData) => {
  const newTimeSlot = {
    id: slotData.id,
    created_by: slotData.created_by,
    tutor_capacity: slotData.tutor_capacity,
    tutee_capacity: slotData.tutee_capacity,
    date: slotData.date,
    start_time: slotData.start_time,
    end_time: slotData.end_time,
    date_sort: slotData.date_sort,
    open_status: slotData.open_status,
    booked_status: slotData.booked_status,
    school_id: slotData.school.id,
    room_id: slotData.room_id,
    location_render: slotData.location_render,
    tutoring_slot_sign_ups: slotData.tutoring_slot_sign_ups,
    tutors: slotData.tutors,
  };
  return newTimeSlot;
};

//[x] add action to add new tutoring time slot
//[x] add action to edit tutoring time slot
//[x] add action to remove tutoring time slot
//[] add action to add new building to school
//[] add action to edit building to school
//[x] add action to remove building from school
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
    removeBuildingAndItsRooms(state, { payload }) {
      state.locations.splice(payload, 1);
    },
    removeRoom(state, { payload }) {
      console.log("Removing Room");
      console.log(payload);
      const new_locations = JSON.parse(JSON.stringify(state.locations));
      let new_rooms = [];
      let saved_index;
      let removed_room_building;

      new_locations.forEach((location) => {
        location.rooms.forEach((room, index) => {
          if (room.id === payload) {
            new_rooms = [...location.rooms];
            removed_room_building = location.building.id;
            saved_index = index;
          }
        });
        if (new_rooms.length !== 0) {
          new_rooms.splice(saved_index, 1);
          new_locations.forEach((location) => {
            if (location.building.id === removed_room_building) {
              location.rooms = new_rooms;
            }
          });
        }
      });
      console.log(new_locations);
      return ({...state, locations: new_locations});
    },
    removeSchoolSubject(state,{payload}){
      state.subjects = state.subjects.filter((subject) => subject.id !== payload)
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
    [createTutoringTimeSlot.pending]: (state) => {
      state.isLoading = true;
    },
    [createTutoringTimeSlot.fulfilled]: (state, action) => {
      const newSiteTimeSlot = createNewSiteTutoringSlot(action.payload);
      state.tutoringTimeSlots.push(newSiteTimeSlot);
      state.tutoringTimeSlots.sort((a, b) =>
        a.date_sort > b.date_sort ? 1 : -1
      );
      //[]: add sucess message and error handeling here
      state.isloading = false;
    },
    [updateTutoringTimeSlot.pending]: (state) => {
      state.isLoading = true;
    },
    [updateTutoringTimeSlot.fulfilled]: (state, action) => {
      const newSiteTimeSlot = createNewSiteTutoringSlot(action.payload);
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
export const { removeTutoringTimeSlot, removeBuildingAndItsRooms, removeRoom, removeSchoolSubject } =
  schoolSlice.actions;
export default schoolSlice.reducer;
