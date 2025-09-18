import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const apps = await api.get("/applications/my", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setApplications(apps.data);

        const ints = await api.get("/internships");
        setInternships(ints.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return <p className="mt-10 text-center">Please login to see dashboard.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl mb-4">Dashboard</h2>
      <div className="mb-6">
        <h3 className="font-bold mb-2">My Applications</h3>
        <ul className="border p-2 rounded space-y-1">
          {applications.map((a) => (
            <li key={a._id}>
              {a.internship?.title} — Status: {a.status || "Pending"}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2">Available Internships</h3>
        <ul className="border p-2 rounded space-y-1">
          {internships.map((i) => (
            <li key={i._id}>{i.title} — {i.organization}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
