import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaUserShield,
  FaUserGraduate,
  FaBed,
  FaCreditCard,
  FaHeadset,
  FaArrowRight,
  FaLeaf,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="staymate-home">
      <style>{homeStyles}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <FaLeaf size={28} color="#A3B18A" />
          <span className="brand-text">StayMate</span>
        </div>
        <button className="nav-login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-badge">Hostel Management, Simplified</div>
        <h1 className="hero-title">
          Run your hostel.
          <br />
          <span className="hero-title-accent">Effortlessly.</span>
        </h1>
        <p className="hero-subtitle">
          StayMate connects Super Admins, Hostel Admins, and Residents on one
          platform — room allocation, payments, complaints, and notices, all
          in one place.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate("/register/resident")}>
            Find a Hostel <FaArrowRight style={{ marginLeft: "8px" }} />
          </button>
          <button className="btn-secondary" onClick={() => navigate("/register/admin")}>
            List Your Hostel
          </button>
        </div>
      </header>

      {/* Role cards */}
      <section className="section">
        <h2 className="section-title">Built for everyone in the hostel</h2>
        <div className="cards-grid">
          <RoleCard
            icon={<FaUserShield size={28} />}
            title="Super Admin"
            desc="Approve hostel admins and listings, monitor the entire platform from one centralized dashboard."
            action={() => navigate("/login")}
            actionLabel="Login"
          />
          <RoleCard
            icon={<FaBuilding size={28} />}
            title="Hostel Admin"
            desc="Register your hostel, manage rooms & beds, approve residents, and handle payments seamlessly."
            action={() => navigate("/register/admin")}
            actionLabel="Register as Admin"
          />
          <RoleCard
            icon={<FaUserGraduate size={28} />}
            title="Resident"
            desc="Search hostels, pick your room & bed, pay fees securely, raise complaints, and request shifts."
            action={() => navigate("/register/resident")}
            actionLabel="Register as Resident"
          />
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt">
        <h2 className="section-title">Everything you need, built in</h2>
        <div className="features-grid">
          <Feature 
            icon={<FaBed />} 
            title="Room & Bed Management" 
            desc="Real-time room capacity, automated bed allocation, and live occupancy tracking." 
          />
          <Feature 
            icon={<FaCreditCard />} 
            title="Secure Payments" 
            desc="Razorpay-powered fee collection with automatic due-date reminders and receipts." 
          />
          <Feature 
            icon={<FaHeadset />} 
            title="Complaints & Support" 
            desc="Residents raise issues, admins resolve them — fully tracked with status updates." 
          />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <h2>Ready to get started?</h2>
        <p>Join StayMate today — it only takes a minute to transform your hostel operations.</p>
        <button className="btn-primary btn-large" onClick={() => navigate("/login")}>
          Login to StayMate
        </button>
      </section>

      <footer className="footer">
        <p>© 2026 StayMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

function RoleCard({ icon, title, desc, action, actionLabel }) {
  return (
    <div className="role-card">
      <div className="role-icon-wrap">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className="role-card-btn" onClick={action}>
        {actionLabel} <FaArrowRight size={12} style={{ marginLeft: "6px" }} />
      </button>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrap">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

/* ---------- Theme Styles ---------- */
const homeStyles = `
  :root {
    --color-darkest: #344E41;
    --color-dark: #3A5A40;
    --color-medium: #588157;
    --color-light: #A3B18A;
    --color-lightest: #DAD7CD;
    --color-white: #FFFFFF;
  }

  .staymate-home {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: var(--color-darkest);
    background-color: var(--color-lightest);
    overflow-x: hidden;
  }

  /* Nav */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 60px;
    background: var(--color-darkest);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .brand { display: flex; align-items: center; gap: 10px; }
  .brand-text { color: var(--color-white); font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
  .nav-login-btn {
    padding: 10px 24px;
    background: transparent;
    color: var(--color-light);
    border: 1.5px solid var(--color-light);
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  .nav-login-btn:hover {
    background: var(--color-light);
    color: var(--color-darkest);
  }

  /* Hero */
  .hero {
    background: linear-gradient(135deg, var(--color-darkest) 0%, var(--color-dark) 60%, var(--color-medium) 100%);
    padding: 120px 60px 100px;
    text-align: center;
    color: var(--color-white);
  }
  .hero-badge {
    display: inline-block;
    padding: 8px 20px;
    background: rgba(163, 177, 138, 0.2);
    color: var(--color-light);
    border: 1px solid rgba(163, 177, 138, 0.4);
    border-radius: 30px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 25px;
  }
  .hero-title {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 20px;
  }
  .hero-title-accent {
    color: var(--color-light);
  }
  .hero-subtitle {
    color: #E2E8F0;
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }
  .hero-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Buttons */
  .btn-primary {
    padding: 16px 32px;
    background: var(--color-white);
    color: var(--color-darkest);
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
    background: var(--color-lightest);
  }
  .btn-secondary {
    padding: 16px 32px;
    background: transparent;
    color: var(--color-white);
    border: 1.5px solid rgba(255,255,255,0.4);
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.1);
    border-color: var(--color-white);
  }
  .btn-large {
    margin: 0 auto;
    background: var(--color-light);
    color: var(--color-darkest);
  }
  .btn-large:hover {
    background: var(--color-white);
  }

  /* Sections */
  .section {
    padding: 90px 60px;
    text-align: center;
  }
  .section-alt {
    background: var(--color-white);
  }
  .section-title {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 50px;
    color: var(--color-darkest);
  }

  /* Grids */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Cards */
  .role-card {
    background: var(--color-white);
    border: 1px solid var(--color-light);
    border-radius: 16px;
    padding: 35px 28px;
    text-align: left;
    transition: all 0.3s ease;
  }
  .role-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(52, 78, 65, 0.12);
    border-color: var(--color-dark);
  }
  .role-icon-wrap {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    background: var(--color-dark);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .role-card h3 {
    margin: 0 0 12px;
    font-size: 20px;
    color: var(--color-darkest);
  }
  .role-card p {
    color: #64748B;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .role-card-btn {
    background: transparent;
    border: none;
    color: var(--color-dark);
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }
  .role-card-btn:hover {
    color: var(--color-darkest);
  }

  .feature-card {
    background: var(--color-lightest);
    border-radius: 14px;
    padding: 35px 28px;
    text-align: center;
    transition: all 0.3s ease;
  }
  .feature-card:hover {
    background: var(--color-white);
    box-shadow: 0 8px 20px rgba(52, 78, 65, 0.08);
  }
  .feature-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-white);
    color: var(--color-dark);
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }
  .feature-card h4 {
    margin: 0 0 10px;
    font-size: 18px;
    color: var(--color-darkest);
  }
  .feature-card p {
    color: #64748B;
    font-size: 14.5px;
    line-height: 1.6;
    margin: 0;
  }

  /* Footer CTA & Footer */
  .footer-cta {
    background: var(--color-darkest);
    padding: 80px 60px;
    text-align: center;
    color: var(--color-white);
  }
  .footer-cta h2 {
    font-size: 32px;
    margin: 0 0 15px;
  }
  .footer-cta p {
    color: var(--color-light);
    font-size: 16px;
    margin-bottom: 30px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  .footer {
    background: #2A3E33; /* Slightly darker than darkest for footer */
    color: #94A3B8;
    font-size: 14px;
    text-align: center;
    padding: 25px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .nav { padding: 16px 24px; }
    .hero { padding: 100px 24px 70px; }
    .hero-title { font-size: 38px; }
    .hero-subtitle { font-size: 16px; }
    .section { padding: 60px 24px; }
    .section-title { font-size: 28px; margin-bottom: 35px; }
    .footer-cta { padding: 60px 24px; }
    .footer-cta h2 { font-size: 26px; }
  }
`;

export default Home;