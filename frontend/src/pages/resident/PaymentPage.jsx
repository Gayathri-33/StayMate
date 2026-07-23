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
      <style>{paymentStyles}</style>
      <div className="payment-container">
        <h2>Complete Your Hostel Fees</h2>
        <p>Click below to open the secure Razorpay payment gateway.</p>
        <button onClick={handlePay} disabled={loading} className="staymate-btn-primary pay-btn">
          {loading ? "Processing..." : "Pay Now via Razorpay"}
        </button>
      </div>
    </Layout>
  );
}

const paymentStyles = `
  .payment-container { text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: 12px; border: 1px solid #A3B18A; box-shadow: 0 4px 12px rgba(52, 78, 65, 0.05); max-width: 500px; margin: 0 auto; }
  .payment-container h2 { color: #344E41; margin-top: 0; }
  .payment-container p { color: #588157; margin-bottom: 30px; }
  .staymate-btn-primary { background-color: #3A5A40; color: #FFFFFF; border: none; border-radius: 8px; padding: 15px 30px; cursor: pointer; transition: all 0.2s; font-size: 16px; font-weight: 600; }
  .staymate-btn-primary:hover { background-color: #344E41; }
  .staymate-btn-primary:disabled { background-color: #A3B18A; cursor: not-allowed; }
`;

export default PaymentPage;