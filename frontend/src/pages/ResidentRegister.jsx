import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import residentService from "../services/residentService";

function ResidentRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchMode, setSearchMode] = useState("place");
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
    <div className="staymate-page">
      <style>{residentStyles}</style>
      <div className="staymate-card">
        <h2 className="staymate-title">Register as Resident</h2>
        <p className="staymate-subtitle">Step {step} of 4</p>

        {error && <p className="staymate-error">{error}</p>}
        {success && <p className="staymate-success">{success}</p>}

        {step === 1 && (
          <div>
            <div className="toggle-group">
              <button className={searchMode === "place" ? "toggle-btn active" : "toggle-btn"} onClick={() => setSearchMode("place")}>Search by Area</button>
              <button className={searchMode === "code" ? "toggle-btn active" : "toggle-btn"} onClick={() => setSearchMode("code")}>Enter Hostel Code</button>
            </div>
            <div className="search-group">
              <input
                className="staymate-input"
                placeholder={searchMode === "place" ? "e.g. Ameerpet" : "e.g. SUNSF1234"}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="staymate-btn-primary" style={{ width: 'auto', padding: '12px 20px', marginTop: 0 }} onClick={handleSearch}>Search</button>
            </div>
            {hostels.map((h) => (
              <div key={h.hostelCode} className="hostel-card" onClick={() => selectHostel(h)}>
                <b>{h.hostelName}</b> ({h.hostelCode}) — {h.hostelType} <br />
                <small>{h.place} • ₹{h.feeAmount}/{h.feeCycle}</small>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <p><b>Hostel:</b> {selectedHostel.hostelName} ({selectedHostel.hostelCode})</p>
            <p className="step-instruction">Select an available room:</p>
            {rooms.length === 0 && <p className="empty-msg">No rooms with vacancy right now.</p>}
            {rooms.map((r) => (
              <div key={r.roomId} className="hostel-card" onClick={() => selectRoom(r)}>
                Room {r.roomNumber} — {r.availableBeds} bed(s) available / capacity {r.capacity}
              </div>
            ))}
            <button className="staymate-btn-secondary" onClick={() => setStep(1)}>Back</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p><b>Room:</b> {selectedRoom.roomNumber}</p>
            <p className="step-instruction">Select a bed:</p>
            {beds.map((b) => (
              <div key={b.bedId} className="hostel-card" onClick={() => selectBed(b)}>
                Bed {b.bedNumber}
              </div>
            ))}
            <button className="staymate-btn-secondary" onClick={() => setStep(2)}>Back</button>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <p className="step-instruction" style={{ textAlign: 'center' }}>
              <b>{selectedHostel.hostelName}</b> — Room {selectedRoom.roomNumber}, Bed {selectedBed.bedNumber}
            </p>
            <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Field label="Address" name="address" value={form.address} onChange={handleChange} />
            <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
            <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

            <button type="submit" disabled={loading} className="staymate-btn-primary">
              {loading ? "Registering..." : "Complete Registration"}
            </button>
            <button type="button" className="staymate-btn-secondary" onClick={() => setStep(3)}>Back</button>
          </form>
        )}

        <p className="staymate-footer">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="staymate-form-group">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="staymate-input" required />
    </div>
  );
}

const residentStyles = `
  .staymate-page { min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #DAD7CD; padding: 40px 20px; }
  .staymate-card { width: 100%; max-width: 500px; background: #FFFFFF; padding: 40px; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 8px 20px rgba(52, 78, 65, 0.1); }
  .staymate-title { text-align: center; color: #344E41; margin-bottom: 5px; font-size: 24px; }
  .staymate-subtitle { text-align: center; color: #588157; margin-bottom: 20px; font-size: 15px; }
  .staymate-error { color: #8B2E2E; margin-bottom: 15px; text-align: center; font-weight: 600; background: #FEE2E2; padding: 8px; border-radius: 6px; }
  .staymate-success { color: #065F46; margin-bottom: 15px; text-align: center; font-weight: 600; background: #D1FAE5; padding: 8px; border-radius: 6px; }
  .toggle-group { display: flex; gap: 10px; margin-bottom: 15px; }
  .toggle-btn { flex: 1; padding: 10px; background: #A3B18A; color: #344E41; border: 1px solid #A3B18A; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
  .toggle-btn.active { background: #3A5A40; color: #FFFFFF; border-color: #3A5A40; }
  .toggle-btn:hover:not(.active) { background: #588157; color: #FFFFFF; }
  .search-group { display: flex; gap: 10px; margin-bottom: 20px; }
  .staymate-form-group { margin-bottom: 16px; }
  .staymate-form-group label { display: block; color: #344E41; font-weight: 600; margin-bottom: 6px; font-size: 14px; }
  .staymate-input { width: 100%; padding: 12px; border: 1px solid #A3B18A; border-radius: 8px; background-color: #FAFAFA; color: #344E41; outline: none; transition: all 0.2s; font-size: 15px; box-sizing: border-box; }
  .staymate-input:focus { border-color: #3A5A40; background-color: #FFFFFF; box-shadow: 0 0 0 3px rgba(58, 90, 64, 0.1); }
  .staymate-btn-primary { width: 100%; padding: 13px; background: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.2s; margin-top: 10px; }
  .staymate-btn-primary:hover:not(:disabled) { background: #344E41; }
  .staymate-btn-primary:disabled { background: #A3B18A; cursor: not-allowed; }
  .staymate-btn-secondary { width: 100%; padding: 12px; background: #A3B18A; color: #344E41; border: 1px solid #A3B18A; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 600; transition: all 0.2s; margin-top: 10px; }
  .staymate-btn-secondary:hover { background: #588157; color: #FFFFFF; border-color: #588157; }
  .hostel-card { padding: 14px; border: 1px solid #A3B18A; border-radius: 8px; margin-bottom: 10px; cursor: pointer; background: #FAFAFA; transition: all 0.2s; }
  .hostel-card:hover { background: #F4F7F4; border-color: #588157; }
  .step-instruction { color: #344E41; margin-bottom: 15px; font-size: 15px; }
  .empty-msg { color: #588157; text-align: center; margin-bottom: 15px; }
  .staymate-footer { text-align: center; margin-top: 20px; font-size: 14px; color: #588157; }
  .staymate-footer a { color: #3A5A40; text-decoration: none; font-weight: 600; }
  .staymate-footer a:hover { text-decoration: underline; }
  @media (max-width: 600px) {
    .search-group { flex-direction: column; }
    .staymate-btn-primary { margin-top: 0; }
  }
`;

export default ResidentRegister;