function DashboardCard({

    title,
    count,
    icon,
    color

}) {

    return (

        <div
            style={{
                background: "white",
                borderRadius: "12px",
                padding: "25px",
                boxShadow: "0 2px 8px rgba(0,0,0,.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <div>

                <h4
                    style={{
                        color: "#64748B"
                    }}
                >
                    {title}
                </h4>

                <h2>

                    {count}

                </h2>

            </div>

            <div
                style={{
                    fontSize: "35px",
                    color: color
                }}
            >

                {icon}

            </div>

        </div>

    );

}

export default DashboardCard;