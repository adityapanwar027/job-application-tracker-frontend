import { useState } from "react";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button>Add Job</button>
      <button>Logout</button>

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

        <button type="submit">Save Job</button>
      </form>

      <h2>My Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs added yet</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index}>
            <h3>{job.company}</h3>
            <p>{job.position}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;