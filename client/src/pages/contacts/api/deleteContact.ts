import axios from "axios";

export const deleteContact = async (id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};
