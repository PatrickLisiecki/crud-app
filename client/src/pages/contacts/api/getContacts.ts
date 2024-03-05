import axios from "axios";

export const getContacts = async () => {
  try {
    const response = await axios.get(`/api/contacts/`);

    return response.data;
  } catch (error) {
    console.error("Error getting contacts:", error);
  }
};
