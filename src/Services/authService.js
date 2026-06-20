import axios from "axios";

const API_URL = "https://job-application-tracker-exs2.onrender.com/api/auth";

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
    "https://job-application-tracker-exs2.onrender.com/api/jobs",
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
    "https://job-application-tracker-exs2.onrender.com/api/jobs",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// delete job
export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `https://job-application-tracker-exs2.onrender.com/api/jobs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// updateJob

  export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `https://job-application-tracker-exs2.onrender.com/api/jobs${id}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};