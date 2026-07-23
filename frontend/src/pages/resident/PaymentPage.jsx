import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import residentService from "../../services/residentService";

function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const menu = [ 
    { label: "Dashboard", path: "/resident/dashboard" }, 
    { label: "Make Payment", path: "/resident/payment" }, 
    { label: "Complaints", path: "/resident/complaints" }, 
    { label: "Room Shift", path: "/resident/shift" }, 
    { label: "Feedback", path: "/resident/feedback" } 
  ];

  // Load Razorpay script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay");
    document.body.appendChild(script);
    
    return () => { document.body.removeChild(script); };
  }, []);

  const handlePay = async () => {
    if (!razorpayLoaded) {
      alert("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await residentService.createPaymentOrder();
      const { orderId, amount, razorpayKeyId, hostelName } = res.data;
      
      const options = {
        key: razorpayKeyId,
        amount: amount * 100, 
        currency: "INR",
        name: "StayMate Hostel",
        description: `Fee Payment for ${hostelName}`,
        order_id: orderId,
        theme: { color: "#3A5A40" }, // Your brand color
        handler: async function (response) {
          try {
            await residentService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            alert("Payment Successful! Your status is now Active.");
            window.location.href = "/resident/dashboard";
          } catch {
            alert("Payment verification failed.");
          }
        },
        prefill: { name: "", email: "", contact: "" },
        modal: {
          ondismiss: () => setLoading(false)
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert("Payment failed: " + response.error.description);
        setLoading(false);
      });
      rzp.open();
      
    } catch (err) {
      alert(err.response?.data?.error || "Payment initiation failed");
      setLoading(false);
    }
  };

  return (
    <Layout title="Make Payment" menuItems={menu}>
      <style>{paymentStyles}</style>
      <div className="payment-container">
        <h2>Complete Your Hostel Fees</h2>
        <p>Click below to open the secure Razorpay payment gateway.</p>
        
        <button 
          onClick={handlePay} 
          disabled={loading || !razorpayLoaded} 
          className="staymate-btn-primary pay-btn"
        >
          {!razorpayLoaded ? "Loading Gateway..." : loading ? "Processing..." : "Pay Now via Razorpay"}
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
  .staymate-btn-primary:hover:not(:disabled) { background-color: #344E41; }
  .staymate-btn-primary:disabled { background-color: #A3B18A; cursor: not-allowed; }
  .pay-btn { margin-top: 20px; min-width: 250px; }
`;

export default PaymentPage;