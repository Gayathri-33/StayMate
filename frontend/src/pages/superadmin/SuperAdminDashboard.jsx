import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import superadminService from "../../services/superadminService";

function SuperAdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { superadminService.getDashboard().then(res => setStats(res.data)); }, []);

  const menu = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Manage Admins", path: "/superadmin/admins" },
    { label: "Manage Hostels", path: "/superadmin/hostels" },
    { label: "Notifications", path: "/superadmin/notifications" },
  ];

  return (
    <Layout title="Super Admin Dashboard" menuItems={menu}>
      <style>{dashboardStyles}</style>
      {stats ? (
        <div className="stats-grid">
          <StatCard title="Total Admins" value={stats.totalAdmins} color="#3A5A40" />
          <StatCard title="Pending Admins" value={stats.pendingAdmins} color="#588157" />
          <StatCard title="Total Hostels" value={stats.totalHostels} color="#3A5A40" />
          <StatCard title="Pending Hostels" value={stats.pendingHostels} color="#588157" />
          <StatCard title="Total Residents" value={stats.totalResidents} color="#344E41" />
          <StatCard title="Unread Alerts" value={stats.unreadNotifications} color="#8B2E2E" />
        </div>
      ) : <p className="loading-text">Loading...</p>}
    </Layout>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="stat-card" style={{ borderLeft: `5px solid ${color}` }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

const dashboardStyles = `
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
  .stat-card { background: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(52, 78, 65, 0.1); border: 1px solid #A3B18A; }
  .stat-card h3 { color: #588157; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-card p { font-size: 28px; font-weight: bold; margin: 10px 0 0; color: #344E41; }
  .loading-text { color: #588157; font-size: 16px; text-align: center; padding: 40px; background: #FFFFFF; border-radius: 12px; border: 1px dashed #A3B18A; }
`;

export default SuperAdminDashboard;