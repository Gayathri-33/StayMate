import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUserTie, FaUserGraduate } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="staymate-page">
      <style>{homeStyles}</style>
      <div className="staymate-card home-card">
        <FaUserShield size={60} color="#3A5A40" />
        <h1 className="staymate-title">StayMate</h1>
        <p className="staymate-subtitle">Hostel Management System</p>

        <div className="home-buttons">
          <button className="staymate-btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="staymate-btn-secondary" onClick={() => navigate("/register/admin")}>
            <FaUserTie style={{ marginRight: "8px" }} /> Register as Admin
          </button>
          <button className="staymate-btn-secondary" onClick={() => navigate("/register/resident")}>
            <FaUserGraduate style={{ marginRight: "8px" }} /> Register as Resident
          </button>
        </div>
      </div>
    </div>
  );
}

const homeStyles = `
  .staymate-page { min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #DAD7CD; padding: 20px; }
  .staymate-card { width: 100%; max-width: 450px; background: #FFFFFF; padding: 45px; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 8px 20px rgba(52, 78, 65, 0.1); text-align: center; }
  .staymate-title { color: #344E41; margin: 15px 0 5px; font-size: 28px; }
  .staymate-subtitle { color: #588157; margin-bottom: 35px; font-size: 16px; }
  .home-buttons { display: flex; flex-direction: column; gap: 15px; }
  .staymate-btn-primary { padding: 14px; background: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .staymate-btn-primary:hover { background: #344E41; }
  .staymate-btn-secondary { padding: 14px; background: #A3B18A; color: #344E41; border: 1px solid #A3B18A; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .staymate-btn-secondary:hover { background: #588157; color: #FFFFFF; border-color: #588157; }
`;

export default Home;