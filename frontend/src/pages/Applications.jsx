import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchApps = async () => {
      try {
        const res = await api.get("/applications/my", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApps();
  }, [user]);

  if (!user) return <p className="mt-10 text-center">Please login to see applications.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl mb-4">My Applications</h2>
      <ul className="space-y-2">
        {applications.map((app) => (
          <li key={app._id} className="border p-2 rounded">
            {app.internship?.title} — Status: {app.status || "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
