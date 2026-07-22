import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import superadminService from "../../services/superadminService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  
  const menu = [ 
    { label: "Dashboard", path: "/superadmin/dashboard" }, 
    { label: "Manage Admins", path: "/superadmin/admins" }, 
    { label: "Manage Hostels", path: "/superadmin/hostels" }, 
    { label: "Notifications", path: "/superadmin/notifications" } 
  ];

  useEffect(() => {
    superadminService.getNotifications().then(res => setNotifications(res.data));
  }, []);

  const handleMarkRead = async (id) => {
    await superadminService.markNotificationRead(id);
    // Update UI instantly without refetching
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <Layout title="Notifications" menuItems={menu}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#F1F5F9" }}>
            <th style={th}>Message</th>
            <th style={th}>Date & Time</th>
            <th style={th}>Status</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length === 0 ? (
            <tr><td colSpan="4" style={{ ...td, textAlign: "center", color: "#64748B" }}>No notifications yet.</td></tr>
          ) : (
            notifications.map(n => (
              <tr key={n.id} style={{ borderBottom: "1px solid #E2E8F0", background: n.isRead ? "#fff" : "#F8FAFC" }}>
                <td style={td}>{n.message}</td>
                <td style={td}>{new Date(n.createdAt).toLocaleString()}</td>
                <td style={td}>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "12px", 
                    fontSize: "12px", 
                    fontWeight: "bold",
                    background: n.isRead ? "#E2E8F0" : "#FEF3C7", 
                    color: n.isRead ? "#475569" : "#92400E" 
                  }}>
                    {n.isRead ? "Read" : "Unread"}
                  </span>
                </td>
                <td style={td}>
                  {!n.isRead && (
                    <button 
                      onClick={() => handleMarkRead(n.id)} 
                      style={{ 
                        background: "#2563EB", 
                        color: "#fff", 
                        border: "none", 
                        padding: "6px 12px", 
                        borderRadius: "4px", 
                        cursor: "pointer",
                        fontSize: "13px"
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}

const th = { padding: "12px", textAlign: "left", fontSize: "14px", color: "#475569" };
const td = { padding: "12px", fontSize: "14px" };

export default Notifications;