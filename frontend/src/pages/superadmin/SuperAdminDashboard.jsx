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
      {stats ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <StatCard title="Total Admins" value={stats.totalAdmins} color="#2563EB" />
          <StatCard title="Pending Admins" value={stats.pendingAdmins} color="#F59E0B" />
          <StatCard title="Total Hostels" value={stats.totalHostels} color="#10B981" />
          <StatCard title="Pending Hostels" value={stats.pendingHostels} color="#F59E0B" />
          <StatCard title="Total Residents" value={stats.totalResidents} color="#8B5CF6" />
          <StatCard title="Unread Alerts" value={stats.unreadNotifications} color="#EF4444" />
        </div>
      ) : <p>Loading...</p>}
    </Layout>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderLeft: `5px solid ${color}` }}>
      <h3 style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0 0", color: "#0F172A" }}>{value}</p>
    </div>
  );
}
export default SuperAdminDashboard;