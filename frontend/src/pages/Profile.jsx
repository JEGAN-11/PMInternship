import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: "", email: "", bio: "", skills: [] });
  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(res.data);
        setSkillsInput(res.data.skills.join(", "));
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "Failed to load profile" });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      const skillsArray = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await api.put(
        "/users/me",
        { ...profile, skills: skillsArray },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setProfile(res.data);
      setSkillsInput(res.data.skills.join(", "));
      setMessage({ type: "success", text: "✅ Profile updated successfully" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Update failed" });
    }
  };

  if (!user) return <p className="mt-10 text-center">Please login to see profile.</p>;
  if (loading) return <p className="mt-10 text-center">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      {message && (
        <p
          className={`mb-4 text-sm p-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          readOnly
          className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
        />

        <textarea
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
