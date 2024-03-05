import axios from "axios";

export const createContact = async (data) => {
  try {
    const response = await axios.post(`/api/contacts/`, {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
  }
};
