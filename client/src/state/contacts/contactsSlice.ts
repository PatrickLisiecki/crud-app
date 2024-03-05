import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(action) {
      console.log(action);
    },
  },
});

export const { addContact } = contactsSlice.actions;
export default contactsSlice.reducer;
