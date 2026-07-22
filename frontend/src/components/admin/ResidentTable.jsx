function ResidentTable({
  residents,
  showActions = false,
  onApprove,
  onReject,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "#fff" }}>
            <th style={th}>Resident Code</th>
            <th style={th}>Name</th>
            <th style={th}>Phone</th>
            <th style={th}>Email</th>
            <th style={th}>Hostel Code</th>
            <th style={th}>Status</th>

            {showActions && <th style={th}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {residents.length === 0 ? (
            <tr>
              <td
                colSpan={showActions ? 7 : 6}
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Residents Found
              </td>
            </tr>
          ) : (
            residents.map((resident) => (
              <tr key={resident.residentId}>
                <td style={td}>{resident.residentCode || "-"}</td>

                <td style={td}>{resident.fullName}</td>

                <td style={td}>{resident.phone}</td>

                <td style={td}>{resident.email}</td>

                <td style={td}>{resident.hostelCode}</td>

                <td style={td}>
                  {resident.status === "ACTIVE" ? (
                    <span style={active}>Approved</span>
                  ) : (
                    <span style={pending}>Pending</span>
                  )}
                </td>

                {showActions && (
                  <td style={td}>
                    <button
                      style={approveBtn}
                      onClick={() => onApprove(resident.residentId)}
                    >
                      Approve
                    </button>

                    <button
                      style={rejectBtn}
                      onClick={() => onReject(resident.residentId)}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "14px",
  border: "1px solid #ddd",
};

const td = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const approveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  marginRight: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

const active = {
  color: "green",
  fontWeight: "bold",
};

const pending = {
  color: "orange",
  fontWeight: "bold",
};

export default ResidentTable;