import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h3>StayMate</h3>

      <Link to="/admin/dashboard">Dashboard</Link>

      <Link to="/admin/students">Students</Link>

      <Link to="/admin/rooms">Rooms</Link>

      <Link to="/admin/hostels">Hostels</Link>

      <Link to="/admin/menu">Menu</Link>

      <Link to="/admin/complaints">Complaints</Link>

      <Link to="/admin/notices">Notices</Link>

      <Link to="/admin/payments">Payments</Link>

    </div>
  );
};

export default Sidebar;