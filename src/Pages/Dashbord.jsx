import { useState, useEffect } from "react";
import "./Dashbord.css";
import {
  createJob,
  getJobs,
  deleteJob,
  updateJob,
} from "../Services/authService";
function Dashbord() {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    setError("");
    setSuccess("");

    console.log("editId:", editId);

    if (editId) {
      return handleUpdate();
    }

    try {
      setLoading(true);

      const data = await createJob(formData);

      console.log(data);

      setJobs([...jobs, data]);

      setFormData({
        company: "",
        position: "",
      });

      setSuccess("Job added successfully");

      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
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
    <div className="dashbord-container">
      <h1 className="dashboard-title">Job Application Tracker</h1>

      <button className="btn-add">Add Job</button>
<button className="btn-logout" onClick={handleLogout}>
  Logout
</button>

      <form className="job-form" onSubmit={handleSubmit}>
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
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <h2>My Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs added yet</p>
      ) : (
        jobs.map((job, index) => (
          <div key={job._id} className="job-card">
            <div>
              <h3>{job.company}</h3>
              <p>{job.position}</p>
            </div>

            <div>
              <button className="btn-edit" onClick={() => handleEdit(job)}>
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashbord;
