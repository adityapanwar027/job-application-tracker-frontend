import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

// login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

// Create Job
export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/jobs",
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Get Job
export const getJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/jobs",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};