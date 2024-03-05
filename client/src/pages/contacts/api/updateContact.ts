import axios from "axios";

export const updateContact = async (id, data) => {
  try {
    const response = await axios.put(`/api/contacts/${id}`, {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};
