import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import residentService from "../services/residentService";

function ResidentRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchMode, setSearchMode] = useState("place"); // "place" or "code"
  const [searchValue, setSearchValue] = useState("");
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [beds, setBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "", password: "", confirmPassword: "",
  });

  const handleSearch = async () => {
    setError("");
    try {
      if (searchMode === "place") {
        const res = await residentService.searchByPlace(searchValue);
        setHostels(res.data);
        if (res.data.length === 0) setError("No approved hostels found in that area");
      } else {
        const res = await residentService.searchByCode(searchValue.toUpperCase());
        setHostels([res.data]);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Search failed");
      setHostels([]);
    }
  };

  const selectHostel = async (hostel) => {
    setSelectedHostel(hostel);
    try {
      const res = await residentService.getAvailableRooms(hostel.hostelCode);
      setRooms(res.data);
      setStep(2);
    } catch (error) {
      // show a generic message; log error to console for debugging
      console.error(error);
      setError("Unable to load rooms");
    }
  };

  const selectRoom = async (room) => {
    setSelectedRoom(room);
    try {
      const res = await residentService.getAvailableBeds(room.roomId);
      setBeds(res.data);
      setStep(3);
    } catch (error) {
      console.error(error);
      setError("Unable to load beds");
    }
  };

  const selectBed = (bed) => {
    setSelectedBed(bed);
    setStep(4);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        hostelCode: selectedHostel.hostelCode,
        roomId: selectedRoom.roomId,
        bedId: selectedBed.bedId,
      };
      const res = await residentService.register(payload);
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={{ textAlign: "center", marginBottom: "5px" }}>Register as Resident</h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: "20px" }}>Step {step} of 4</p>

        {error && <p style={{ color: "#DC2626", marginBottom: "15px", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "#16A34A", marginBottom: "15px", textAlign: "center" }}>{success}</p>}

        {/* STEP 1: Find a hostel */}
        {step === 1 && (
          <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button style={toggleBtn(searchMode === "place")} onClick={() => setSearchMode("place")}>Search by Area</button>
              <button style={toggleBtn(searchMode === "code")} onClick={() => setSearchMode("code")}>Enter Hostel Code</button>
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                style={{ ...inputStyle, marginTop: 0 }}
                placeholder={searchMode === "place" ? "e.g. Ameerpet" : "e.g. SUNSF1234"}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button style={smallBtn} onClick={handleSearch}>Search</button>
            </div>
            {hostels.map((h) => (
              <div key={h.hostelCode} style={hostelCard} onClick={() => selectHostel(h)}>
                <b>{h.hostelName}</b> ({h.hostelCode}) — {h.hostelType} <br />
                <small>{h.place} • ₹{h.feeAmount}/{h.feeCycle}</small>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: Pick a room */}
        {step === 2 && (
          <div>
            <p><b>Hostel:</b> {selectedHostel.hostelName} ({selectedHostel.hostelCode})</p>
            <p style={{ marginBottom: "15px" }}>Select an available room:</p>
            {rooms.length === 0 && <p>No rooms with vacancy right now.</p>}
            {rooms.map((r) => (
              <div key={r.roomId} style={hostelCard} onClick={() => selectRoom(r)}>
                Room {r.roomNumber} — {r.availableBeds} bed(s) available / capacity {r.capacity}
              </div>
            ))}
            <button style={backBtn} onClick={() => setStep(1)}>Back</button>
          </div>
        )}

        {/* STEP 3: Pick a bed */}
        {step === 3 && (
          <div>
            <p><b>Room:</b> {selectedRoom.roomNumber}</p>
            <p style={{ marginBottom: "15px" }}>Select a bed:</p>
            {beds.map((b) => (
              <div key={b.bedId} style={hostelCard} onClick={() => selectBed(b)}>
                Bed {b.bedNumber}
              </div>
            ))}
            <button style={backBtn} onClick={() => setStep(2)}>Back</button>
          </div>
        )}

        {/* STEP 4: Fill details */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <p style={{ marginBottom: "15px", textAlign: "center" }}>
              <b>{selectedHostel.hostelName}</b> — Room {selectedRoom.roomNumber}, Bed {selectedBed.bedNumber}
            </p>
            <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Field label="Address" name="address" value={form.address} onChange={handleChange} />
            <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
            <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

            <button type="submit" disabled={loading} style={submitBtn(loading)}>
              {loading ? "Registering..." : "Complete Registration"}
            </button>
            <button type="button" style={backBtn} onClick={() => setStep(3)}>Back</button>
          </form>
        )}

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Already registered? <Link to="/login" style={{ color: "#2563EB", textDecoration: "none" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

// --- Reusable Form Field ---
function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontSize: "14px", fontWeight: "500", color: "#334155" }}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} style={inputStyle} required />
    </div>
  );
}

// --- Inline Styles ---
const page = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#EEF2FF", padding: "40px 0" };
const card = { width: "480px", background: "#fff", padding: "40px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" };
const inputStyle = { width: "100%", padding: "12px", marginTop: "6px", borderRadius: "6px", border: "1px solid #CBD5E1", outline: "none", fontSize: "15px", boxSizing: "border-box" };
const submitBtn = (loading) => ({ width: "100%", padding: "13px", background: loading ? "#94A3B8" : "#2563EB", color: "#fff", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer", fontSize: "16px", fontWeight: "bold", marginTop: "10px" });
const backBtn = { width: "100%", padding: "12px", background: "#F1F5F9", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: "8px", marginTop: "10px", cursor: "pointer" };
const smallBtn = { padding: "12px 20px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" };
const toggleBtn = (active) => ({ flex: 1, padding: "10px", background: active ? "#2563EB" : "#F1F5F9", color: active ? "#fff" : "#0F172A", border: "1px solid #CBD5E1", borderRadius: "8px", cursor: "pointer" });
const hostelCard = { padding: "14px", border: "1px solid #E2E8F0", borderRadius: "8px", marginBottom: "10px", cursor: "pointer", background: "#FAFAFA" };

export default ResidentRegister;