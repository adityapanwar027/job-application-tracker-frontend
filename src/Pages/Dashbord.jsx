import { useState, useEffect } from "react";
import {
  createJob,
  getJobs,
  deleteJob,
  updateJob,
} from "../Services/authService";
function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
  });

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log(data.jobs);
        setJobs(data.jobs);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchJobs();
  }, []);

  // handlechange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("edited", editId);

    if (editId) {
      return handleUpdate();
    }

    try {
      setLoading(true);
      setLoading(false);
      setFormData({
        company: "",
        position: "",
      });
      const data = await createJob(formData);

      console.log(data);

      setJobs([
        ...jobs,
        {
          company: formData.company,
          position: formData.position,
        },
      ]);

      setFormData({
        company: "",
        position: "",
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // handleDelete
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);

      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // handleEdit
  const handleEdit = async (job) => {
    setFormData({
      company: job.company,
      position: job.position,
    });
    setEditId(job._id);
  };

  // handleupdate
  const handleUpdate = async () => {
    try {
      const data = await updateJob(editId, formData);

      console.log(data);

      const updatedJobs = jobs.map((job) =>
        job._id === editId
          ? { ...job, company: formData.company, position: formData.position }
          : job,
      );

      setJobs(updatedJobs);

      setFormData({
        company: "",
        position: "",
      });

      setEditId(null);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button>Add Job</button>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />

        <button type="submit">{loading ? "Loading..." : "Save Job"}</button>
      </form>

      <h2>My Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs added yet</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index}>
            <h3>{job.company}</h3>
            <p>{job.position}</p>

            <button onClick={() => handleEdit(job)}>Edit</button>

            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
