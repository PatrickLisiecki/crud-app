import axios from "axios";

export const getContact = async (id) => {
  try {
    const response = await axios.get(`/api/contacts/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error getting contact:", error);
  }
};
