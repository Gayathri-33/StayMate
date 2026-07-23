import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

function Layout({ title, children, menuItems }) {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Responsive Styles */}
      <style>{`
        .layout-container {
          display: flex;
          min-height: 100vh;
          background-color: #DAD7CD; /* Timberwolf */
          transition: all 0.3s ease;
        }
        .sidebar {
          width: 260px;
          background-color: #344E41; /* Brunswick Green */
          padding: 24px 20px;
          color: #DAD7CD;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
          z-index: 50;
        }
        .menu-btn {
          padding: 12px 16px;
          background-color: #3A5A40; /* Hunter Green */
          color: #DAD7CD;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .menu-btn:hover {
          background-color: #588157; /* Fern Green */
          transform: translateX(4px);
        }
        .logout-btn {
          background-color: #8B2E2E !important; /* Muted Red for contrast */
          margin-top: auto;
        }
        .logout-btn:hover {
          background-color: #A93C3C !important;
        }
        .main-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }
        .content-box {
          background-color: #FFFFFF;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(52, 78, 65, 0.08); /* Subtle green-tinted shadow */
          border: 1px solid #A3B18A; /* Sage border */
        }
        .mobile-header {
          display: none;
          background-color: #344E41;
          color: #DAD7CD;
          padding: 16px 20px;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .mobile-toggle {
          background: none;
          border: none;
          color: #DAD7CD;
          font-size: 24px;
          cursor: pointer;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .layout-container {
            flex-direction: column;
          }
          .mobile-header {
            display: flex;
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            box-shadow: 4px 0 12px rgba(0,0,0,0.2);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            padding: 20px;
          }
          .content-box {
            padding: 20px;
          }
        }
      `}</style>

      <div className="layout-container">
        {/* Mobile Header */}
        <div className="mobile-header">
          <h2 style={{ margin: 0, fontSize: "20px" }}>StayMate</h2>
          <button className="mobile-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h2 style={{ color: "#A3B18A", textAlign: "center", marginBottom: "8px", fontSize: "24px", letterSpacing: "1px" }}>
            StayMate
          </h2>
          <p style={{ color: "#A3B18A", textAlign: "center", marginBottom: "32px", fontSize: "14px", borderBottom: "1px solid #588157", paddingBottom: "16px" }}>
            {user?.fullName} <br />
            <small style={{ color: "#DAD7CD", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {user?.role?.replace('_', ' ')}
            </small>
          </p>
          
          <nav style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                className="menu-btn" 
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false); // Close sidebar on mobile after click
                }}
              >
                {item.label}
              </button>
            ))}
            
            <button className="menu-btn logout-btn" onClick={() => { handleLogout(); setIsSidebarOpen(false); }}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h1 style={{ marginBottom: "24px", color: "#344E41", fontSize: "28px", fontWeight: "700" }}>
            {title}
          </h1>
          <div className="content-box">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Layout;