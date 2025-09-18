import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await api.get("/internships");
        setInternships(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInternships();
  }, []);

  const applyToInternship = async (id) => {
    if (!user) return alert("Please login first");
    try {
      await api.post(`/applications/apply/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("✅ Applied successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to apply");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl mb-4">Internships</h2>
      <ul className="space-y-4">
        {internships.map((i) => (
          <li key={i._id} className="border p-4 rounded flex justify-between">
            <div>
              <h3 className="font-bold">{i.title}</h3>
              <p>{i.description}</p>
            </div>
            <button
              onClick={() => applyToInternship(i._id)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
