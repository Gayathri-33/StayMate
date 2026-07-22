import authService from "../../services/authService";

function AdminNavbar() {

    const user = authService.getUser();

    return (

        <div
            style={{
                background: "#fff",
                padding: "18px 30px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 2px 5px rgba(0,0,0,.1)"
            }}
        >

            <h2>Admin Dashboard</h2>

            <div>

                Welcome,
                <strong> {user?.name}</strong>

            </div>

        </div>

    );

}

export default AdminNavbar;