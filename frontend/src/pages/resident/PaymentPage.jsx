import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";

function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const menu = [ { label: "Dashboard", path: "/resident/dashboard" }, { label: "Make Payment", path: "/resident/payment" }, { label: "Complaints", path: "/resident/complaints" }, { label: "Room Shift", path: "/resident/shift" }, { label: "Feedback", path: "/resident/feedback" } ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await residentService.createPaymentOrder();
      const { orderId, amount, razorpayKeyId, hostelName, qrImagePath } = res.data;
      
      const options = {
        key: razorpayKeyId,
        amount: amount * 100, // Paise
        currency: "INR",
        name: "StayMate",
        description: `Fees for ${hostelName}`,
        order_id: orderId,
        image: qrImagePath ? `http://localhost:8080${qrImagePath}` : "",
        handler: async function (response) {
          await residentService.verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          });
          alert("Payment Successful! Dashboard updated.");
          window.location.href = "/resident/dashboard";
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.error || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Make Payment" menuItems={menu}>
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Complete Your Hostel Fees</h2>
        <p>Click below to open the secure Razorpay payment gateway.</p>
        <button onClick={handlePay} disabled={loading} style={{ padding: "15px 30px", background: "#2563EB", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", marginTop: "20px" }}>
          {loading ? "Processing..." : "Pay Now via Razorpay"}
        </button>
      </div>
    </Layout>
  );
}
export default PaymentPage;