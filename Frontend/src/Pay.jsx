import QRCode from "react-qr-code";

const Pay = ({ name, dob }) => { // Destructure name and dob from props

  const recipientUPI = 'vaishyasamajshaadi@ibl'; // Replace with recipient's UPI ID
  const amount = 100; // Amount in rupees
  const message = `${name} ${dob}`; // Concatenate name and dob for the message

  // Construct the UPI link with recipient UPI, amount, and message
  const upiLink = `upi://pay?pa=${recipientUPI}&pn=Recipient&am=${amount}&tn=${encodeURIComponent(message)}&url=${encodeURIComponent("https://vaishyasamajshaadi.com/")}`;

  return (
    <div className="text-danger">
      <h2>Scan QR Code to Pay</h2>
      <a href={upiLink}>
        <QRCode value={upiLink} />
      </a>
    </div>
  );
};

export default Pay;
