import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // Action for adding a contact
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    // Action for updating a contact
    updateContact: (state, action) => {
      const { id, ...updatedContact } = action.payload;
      const index = state.contacts.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...updatedContact };
      }
    },
    // Action for deleting a contact
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload,
      );
    },
  },
});

// Export actions
export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;

// Export reducer
export default contactSlice.reducer;
