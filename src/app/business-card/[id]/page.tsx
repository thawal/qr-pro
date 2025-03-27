"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User, Mail, Phone, Globe, MapPin, Building } from "lucide-react";

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

export default function BusinessCard() {
  const { id } = useParams(); // ✅ Get dynamic id from URL
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    if (id) {
      const storedContacts = localStorage.getItem("contacts");
      if (storedContacts) {
        const contacts = JSON.parse(storedContacts);
        setContact(contacts[parseInt(id as string, 10)]);
      }
    }
  }, [id]);

  if (!contact) return <p className="text-center mt-10">Loading...</p>;

  const generateVCardData = (info: ContactInfo): string => {
    let vCard = `BEGIN:VCARD\nVERSION:3.0\n`;
    vCard += `N:${info.lastName};${info.firstName};;;\n`;
    vCard += `FN:${info.firstName} ${info.lastName}\n`;
    if (info.organization) vCard += `ORG:${info.organization}\n`;
    if (info.title) vCard += `TITLE:${info.title}\n`;
    if (info.email) vCard += `EMAIL;TYPE=INTERNET:${info.email}\n`;
    if (info.phone) vCard += `TEL;TYPE=CELL:${info.phone}\n`;
    if (info.website) vCard += `URL:${info.website}\n`;
    if (info.address) vCard += `ADR;TYPE=WORK:;;${info.address};;;;\n`;
    vCard += `END:VCARD`;

    return vCard;
  };

  const downloadVCard = () => {
    const vCardData = generateVCardData(contact);
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contact.firstName}_${contact.lastName}.vcf`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 p-6">
      <div
        className="flex flex-col items-center h-4/5 p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10 red"
        style={{
          backgroundImage: `url(${contact.backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        {contact.profileImage ? (
          <img
            src={contact.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl mb-4">
            <User size={40} />
          </div>
        )}

        <h2 className="text-xl font-bold text-black">
          {contact.firstName} {contact.lastName}
        </h2>
        {contact.title && <p className="text-gray-950">{contact.title}</p>}
        {contact.organization && (
          <p className="flex items-center gap-2 text-gray-900">
            <Building size={16} /> {contact.organization}
          </p>
        )}

        <div className="text-sm w-full space-y-3 text-gray-700 mt-4">
          {contact.phone && (
            <p className="flex items-center gap-2 text-white">
              <Phone size={16} className="text-blue-500" />
              {contact.phone}
            </p>
          )}
          {contact.email && (
            <p className="flex items-center gap-2 text-white">
              <Mail size={16} className="text-red-500" />
              {contact.email}
            </p>
          )}
          {contact.website && (
            <p className="flex items-center gap-2 ">
              <Globe size={16} className="text-green-500" />
              <a
                href={contact.website}
                target="_blank"
                className="text-blue-600 underline"
              >
                {contact.website}
              </a>
            </p>
          )}
          {contact.address && (
            <p className="flex items-center gap-2 text-white">
              <MapPin size={16} className="text-yellow-500" />
              {contact.address}
            </p>
          )}
        </div>
        <div className="mt-5 flex flex-col sm:flex-row justify-around items-center w-full gap-4">
          <button
            onClick={() => {
              const passData = {
                name: `${contact.firstName} ${contact.lastName}`,
                organization: contact.organization || "",
                title: contact.title || "",
                email: contact.email || "",
                phone: contact.phone || "",
                website: contact.website || "",
                address: contact.address || "",
              };

              const passBlob = new Blob([JSON.stringify(passData)], {
                type: "application/vnd.apple.pkpass",
              });
              const url = URL.createObjectURL(passBlob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${contact.firstName}_${contact.lastName}.pkpass`;
              document.body.appendChild(a);
              a.click();
              URL.revokeObjectURL(url);
              document.body.removeChild(a);
            }}
            className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition  flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5h18M3 12h18M3 16.5h18"
              />
            </svg>
            <p className="">Add to Apple Wallet</p>
          </button>
          <button
            onClick={downloadVCard}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
          >
            <User size={16} className="text-white" />
            Save to Contacts
          </button>
        </div>
      </div>
    </div>
  );
}
