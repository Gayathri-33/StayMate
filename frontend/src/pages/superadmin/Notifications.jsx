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
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <Layout title="Notifications" menuItems={menu}>
      <style>{notifStyles}</style>
      <table className="staymate-table">
        <thead>
          <tr>
            <th>Message</th><th>Date & Time</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length === 0 ? (
            <tr><td colSpan="4" className="empty-row">No notifications yet.</td></tr>
          ) : (
            notifications.map(n => (
              <tr key={n.id} className={n.isRead ? "" : "unread-row"}>
                <td>{n.message}</td>
                <td>{new Date(n.createdAt).toLocaleString()}</td>
                <td>
                  <span className={`badge-${n.isRead ? "read" : "unread"}`}>
                    {n.isRead ? "Read" : "Unread"}
                  </span>
                </td>
                <td>
                  {!n.isRead && (
                    <button onClick={() => handleMarkRead(n.id)} className="staymate-btn-sm primary">
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

const notifStyles = `
  .staymate-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #A3B18A; }
  .staymate-table th { background-color: #A3B18A; color: #344E41; padding: 14px; text-align: left; font-weight: 600; font-size: 14px; }
  .staymate-table td { padding: 14px; border-bottom: 1px solid #DAD7CD; color: #344E41; font-size: 14px; }
  .staymate-table tr:hover { background-color: #F4F7F4; }
  .staymate-table tr:last-child td { border-bottom: none; }
  .unread-row { background-color: #F8FAFC; }
  .empty-row { text-align: center; color: #588157; padding: 30px !important; }
  .badge-read { background: #A3B18A; color: #344E41; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
  .badge-unread { background: #FEF3C7; color: #92400E; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
  .staymate-btn-sm { padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; }
  .staymate-btn-sm.primary { background: #3A5A40; color: #FFFFFF; }
  .staymate-btn-sm.primary:hover { background: #344E41; }
`;

export default Notifications;