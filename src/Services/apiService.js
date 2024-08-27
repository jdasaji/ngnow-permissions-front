import axios from "axios";

// Define the base URL for the API
const API_BASE_URL = "https://localhost:7085/api/Permissions"; // Cambia esto según tu API

// Función para obtener la información de un empleado
export const getPermissions = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/get-all`, params, {
      headers: { "Content-Type": "application/json" },
    });
    const { data } = response;
    return data.data;
  } catch (error) {
    throw new Error("Error fetching employee data");
  }
};

// Función para guardar la información de un empleado
export const postAdd = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, employeeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error saving employee data");
  }
};

export const postUpdate = async (employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, employeeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error saving employee data");
  }
};
