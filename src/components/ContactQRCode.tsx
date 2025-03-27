import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface ContactInfo {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  profileImage?: string;
  backgroundImage?: string;
}

const ContactQRCode: React.FC<{ contact: ContactInfo; index: number }> = ({
  contact,
  index,
}) => {
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    const businessCardUrl = `${window.location.origin}/business-card/${index}`;
    QRCode.toDataURL(businessCardUrl, { errorCorrectionLevel: "H" })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error("Error generating QR code:", err));
  }, [index]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold">
        {contact.firstName || contact.lastName
          ? `${contact.firstName} ${contact.lastName}`
          : "No Name Provided"}
        {/* {contact.firstName} {contact.lastName} */}
      </h2>
      {qrUrl && <img src={qrUrl} alt="QR Code" className="w-40 h-40 my-4" />}
      <button
        onClick={() => window.open(`/business-card/${index}`, "_blank")}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        View Digital Card
      </button>
    </div>
  );
};

export default ContactQRCode;
