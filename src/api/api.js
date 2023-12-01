import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 8080,
});

const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },
};

const ticketsAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/tickets");
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },

  getTicketsByUserId: async (userId) => {
    try {
      const response = await api.get(`/tickets/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching boletas by user id:", error);
      throw error;
    }
  },

  getTicketById: async (ticketId) => {
    try {
      const response = await api.get(`/tickets/ticket/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching boleta by id:", error);
      throw error;
    }
  },

  create: async (ticketData) => {
    try {
      const response = await api.post("/tickets", ticketData);
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  checkCellExistence: async (cell) => {
    try {
      const response = await api.get(`/tickets/check/${cell}`);
      return response.data;
    } catch (error) {
      console.error("Error checking cell existence:", error);
      throw error;
    }
  },

  validateTicketById: async (ticketId) => {
    try {
      const response = await api.put(`/tickets/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error validating ticket:", error);
      throw error;
    }
  }
};

export { authAPI, ticketsAPI };
