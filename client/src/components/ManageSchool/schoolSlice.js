import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  errorText: "",
  renderErrorMessage: true,
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

export const addSchoolSubject = createAsyncThunk(
  "school/addSchoolSubject",
  (subjectData) => {
    return fetch("/subject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subjectData),
    })
      .then((res) => res.json())
      .then((subject) => subject);
  }
);

export const addNewBuilding = createAsyncThunk(
  "school/addNewBuilding",
  (buildingInfo) => {
    return fetch("/building", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildingInfo),
    })
      .then((res) => res.json())
      .then((building) => building);
  }
);

export const editBuildingInfo = createAsyncThunk(
  "school/editBuildingInfo",
  (newBuildingInfo) => {
    return fetch(`/building/${newBuildingInfo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBuildingInfo),
    })
      .then((res) => res.json())
      .then((building) => building);
  }
);

export const addNewRoom = createAsyncThunk("school/addNewRoom", (roomInfo) => {
  return fetch("/room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roomInfo),
  })
    .then((res) => res.json())
    .then((room) => room);
});

export const editRoomInfo = createAsyncThunk(
  "school/editRoomInfo",
  (newRoomInfo) => {
    return fetch(`/room/${newRoomInfo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoomInfo),
    })
      .then((res) => res.json())
      .then((room) => room);
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
//[x] add action to add new building to school
//[x] add action to edit building to school
//[x] add action to remove building from school
//[x] add action to add new room to school
//[x] add action to edit room to school
//[x] add action to remove room from school
//[x] add action to add subject from school
//[x] add action to remove subject from school

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setServerError(state, { payload }) {
      state.errorText = payload.error;
    },
    clearError(state) {
      state.errorText = "";
      state.renderErrorMessage = true;
    },
    removeTutoringTimeSlot(state, { payload }) {
      state.tutoringTimeSlots = state.tutoringTimeSlots.filter(
        (slot) => slot.id !== payload
      );
    },
    removeBuildingAndItsRooms(state, { payload }) {
      state.locations.splice(payload, 1);
    },
    removeRoom(state, { payload }) {
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
      return { ...state, locations: new_locations };
    },
    removeSchoolSubject(state, { payload }) {
      state.subjects = state.subjects.filter(
        (subject) => subject.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolData.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(getSchoolData.fulfilled, (state, { payload }) => {
        if (Object.keys(payload).includes("error")) {
          typeof payload.error === "string"
            ? (state.errorText = [["Server Error", payload.error]])
            : (state.errorText = Object.entries(payload.error));
        } else {
          state.renderErrorMessage = false;
          state.id = payload.id;
          state.name = payload.name;
          state.rooms = payload.rooms;
          state.buildings = payload.buildings;
          state.locations = payload.locations;
          state.subjects = payload.subjects;
          state.tutoringTimeSlots = payload.tutoring_time_slots;
          state.isLoading = false;
        }
      })
      .addCase(createTutoringTimeSlot.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(createTutoringTimeSlot.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          const newSiteTimeSlot = createNewSiteTutoringSlot(action.payload);
          state.tutoringTimeSlots.push(newSiteTimeSlot);
          state.tutoringTimeSlots.sort((a, b) =>
            a.date_sort > b.date_sort ? 1 : -1
          );
          state.isloading = false;
        }
      })
      .addCase(updateTutoringTimeSlot.pending, (state) => {
        state.renderErrorMessage = true;
        state.isLoading = true;
      })
      .addCase(updateTutoringTimeSlot.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          const newSiteTimeSlot = createNewSiteTutoringSlot(action.payload);
          state.tutoringTimeSlots = state.tutoringTimeSlots.map((slot) => {
            if (slot.id === newSiteTimeSlot.id) {
              return newSiteTimeSlot;
            } else {
              return slot;
            }
          });
          state.tutoringTimeSlots.sort((a, b) =>
            a.date_sort > b.date_sort ? 1 : -1
          );
          state.isloading = false;
        }
      })
      .addCase(addSchoolSubject.pending, (state) => {
        state.renderErrorMessage = true;
      })
      .addCase(addSchoolSubject.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          state.subjects.push(action.payload);
          state.subjects.sort((a, b) => (a.name > b.name ? 1 : -1));
          state.renderErrorMessage = false;
        }
      })
      .addCase(addNewBuilding.pending, (state) => {
        state.renderErrorMessage = true;
      })
      .addCase(addNewBuilding.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          state.locations.push({ building: action.payload, rooms: [] });
          state.locations.sort((a, b) =>
            a.building.name > b.building.name ? 1 : -1
          );
        }
      })
      .addCase(editBuildingInfo.pending, (state) => {
        state.renderErrorMessage = true;
      })
      .addCase(editBuildingInfo.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          state.locations = state.locations.map((location) => {
            if (location.building.id === action.payload.id) {
              location.building = action.payload;
              return location;
            } else {
              return location;
            }
          });
          state.locations.sort((a, b) =>
            a.building.name > b.building.name ? 1 : -1
          );
        }
      })
      .addCase(addNewRoom.pending, (state) => {
        state.renderErrorMessage = true;
      })
      .addCase(addNewRoom.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          state.locations = state.locations.map((location) => {
            if (location.building.id === action.payload.building_id) {
              location.rooms.push(action.payload);
              location.rooms.sort((a, b) => (a.name > b.name ? 1 : -1));
              return location;
            } else {
              return location;
            }
          });
        }
      })
      .addCase(editRoomInfo.pending, (state) => {
        state.renderErrorMessage = true;
      })
      .addCase(editRoomInfo.fulfilled, (state, action) => {
        if (Object.keys(action.payload).includes("error")) {
          typeof action.payload.error === "string"
            ? (state.errorText = [["Server Error", action.payload.error]])
            : (state.errorText = Object.entries(action.payload.error));
        } else {
          state.renderErrorMessage = false;
          let current_building;
          let room_index;
          state.locations.forEach((location) => {
            location.rooms.forEach((room, index) => {
              if (room.id === action.payload.id) {
                current_building = room.building_id;
                room_index = index;
              }
            });
          });
          state.locations = state.locations.map((location) => {
            if (location.building.id === action.payload.building_id) {
              location.rooms.splice(room_index, 1, action.payload);
              return location;
            } else {
              if (location.building.id === current_building) {
                location.rooms.filter((room) => room.id !== action.payload.id);
                return location;
              } else {
                return location;
              }
            }
          });
        }
      });
  },
});

export const {
  setServerError,
  clearError,
  removeTutoringTimeSlot,
  removeBuildingAndItsRooms,
  removeRoom,
  removeSchoolSubject,
} = schoolSlice.actions;
export default schoolSlice.reducer;
