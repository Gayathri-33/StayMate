import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {

  return (

    <div
      style={{
        height: "70px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)"
      }}
    >

      <h2>

        Super Admin Dashboard

      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px"
        }}
      >

        <FaBell
          size={20}
          color="#2563EB"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >

          <FaUserCircle
            size={35}
            color="#2563EB"
          />

          <div>

            <b>Super Admin</b>

            <br />

            <small>staymate@admin.com</small>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Navbar;