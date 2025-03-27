// "use client";
// import { useState, useEffect } from "react";
// import ContactQRCode from "@/components/ContactQRCode";

// interface ContactInfo {
//   firstName: string;
//   lastName: string;
//   organization?: string;
//   title?: string;
//   email?: string;
//   phone?: string;
//   website?: string;
//   address?: string;
//   profileImage?: string;
//   backgroundImage?: string;
// }

// export default function Home() {
//   const [contacts, setContacts] = useState<ContactInfo[]>([]);
//   const [newContact, setNewContact] = useState<ContactInfo>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   useEffect(() => {
//     const storedContacts = localStorage.getItem("contacts");
//     if (storedContacts) {
//       setContacts(JSON.parse(storedContacts));
//     }
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setNewContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: "profileImage" | "backgroundImage"
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewContact((prev) => ({
//           ...prev,
//           [field]: event.target?.result as string,
//         }));
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleSubmit = () => {
//     if (!newContact.firstName || !newContact.lastName) {
//       alert("First Name and Last Name are required");
//       return;
//     }

//     const updatedContacts = [...contacts];
//     if (editingIndex !== null && editingIndex >= 0) {
//       updatedContacts[editingIndex] = newContact;
//     } else {
//       updatedContacts.push(newContact);
//     }

//     setContacts(updatedContacts);
//     localStorage.setItem("contacts", JSON.stringify(updatedContacts));

//     setNewContact({ firstName: "", lastName: "", email: "", phone: "" });
//     setEditingIndex(null);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My QR vCards</h1>

//       {/* Contact Form */}
//       <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//         <button
//           onClick={() => setEditingIndex(editingIndex === null ? -1 : null)}
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           {editingIndex !== null ? "Close Form" : "Add/Edit Contact"}
//         </button>

//         {editingIndex !== null && (
//           <div className="mt-4">
//             <h2 className="text-lg font-semibold mb-2">
//               {editingIndex === -1 ? "Create" : "Edit"} Contact
//             </h2>
//             <label className="block mb-1 text-gray-700 font-medium">
//               First Name
//               <input
//                 name="firstName"
//                 value={newContact.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter First Name"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Last Name
//               <input
//                 name="lastName"
//                 value={newContact.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter Last Name"
//                 className="input-field mb-4"
//               />
//             </label>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Organization
//               <input
//                 name="organization"
//                 value={newContact.organization || ""}
//                 onChange={handleInputChange}
//                 placeholder="Enter Organization"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Title
//               <input
//                 name="title"
//                 value={newContact.title || ""}
//                 onChange={handleInputChange}
//                 placeholder="Enter Title"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Website
//               <input
//                 name="website"
//                 value={newContact.website || ""}
//                 onChange={handleInputChange}
//                 placeholder="Enter Website URL"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Address
//               <input
//                 name="address"
//                 value={newContact.address || ""}
//                 onChange={handleInputChange}
//                 placeholder="Enter Address"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Email
//               <input
//                 name="email"
//                 value={newContact.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter Email Address"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Phone
//               <input
//                 name="phone"
//                 value={newContact.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter Phone Number"
//                 className="input-field mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Profile Image
//               <input
//                 name="profileImage"
//                 type="file"
//                 onChange={(e) => handleFileChange(e, "profileImage")}
//                 className="mb-4"
//               />
//             </label>

//             <label className="block mb-1 text-gray-700 font-medium">
//               Background Image
//               <input
//                 name="backgroundImage"
//                 type="file"
//                 onChange={(e) => handleFileChange(e, "backgroundImage")}
//                 className="mb-4"
//               />
//             </label>

//             <button
//               onClick={handleSubmit}
//               className="btn-primary border p-2 cursor-pointer"
//             >
//               {editingIndex === -1 ? "Add Contact" : "Update Contact"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Contact List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {contacts.map((contact, index) => (
//           <div key={index} className="p-4 border rounded-lg shadow-md relative">
//             <h2 className="text-lg font-semibold text-white">
//               {contact.firstName} {contact.lastName}
//             </h2>
//             <ContactQRCode contact={contact} index={index} />
//             <button
//               onClick={() => {
//                 const updatedContacts = contacts.filter((_, i) => i !== index);
//                 setContacts(updatedContacts);
//                 localStorage.setItem(
//                   "contacts",
//                   JSON.stringify(updatedContacts)
//                 );
//               }}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => setEditingIndex(index)}
//               className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded"
//             >
//               Edit
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // -----------------------------------------------------------

"use client";
import { useState, useEffect } from "react";
import ContactQRCode from "@/components/ContactQRCode";

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

export default function Home() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [newContact, setNewContact] = useState<ContactInfo | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (newContact) {
      setNewContact((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImage" | "backgroundImage"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewContact((prev) => ({
          ...prev!,
          [field]: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!newContact?.firstName || !newContact?.lastName) {
      alert("First Name and Last Name are required");
      return;
    }

    const updatedContacts = [...contacts];
    if (editingIndex !== null && editingIndex >= 0) {
      updatedContacts[editingIndex] = newContact;
    } else {
      updatedContacts.push(newContact);
    }

    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setNewContact(null);
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My QR vCards</h1>

      {/* Contact Form */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        <button
          onClick={() => {
            if (editingIndex === null) {
              setNewContact({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
              });
              setEditingIndex(-1);
            } else {
              setNewContact(null);
              setEditingIndex(null);
            }
          }}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editingIndex !== null ? "Close Form" : "Add/Edit Contact"}
        </button>

        {newContact && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              {editingIndex === -1 ? "Create" : "Edit"} Contact
            </h2>
            {[
              "firstName",
              "lastName",
              "organization",
              "title",
              "website",
              "address",
              "email",
              "phone",
            ].map((field) => (
              <label
                key={field}
                className="block mb-1 text-gray-700 font-medium"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <input
                  name={field}
                  value={(newContact as any)[field] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className="input-field mb-4"
                />
              </label>
            ))}

            {[
              { name: "profileImage", label: "Profile Image" },
              { name: "backgroundImage", label: "Background Image" },
            ].map(({ name, label }) => (
              <label
                key={name}
                className="block mb-1 text-gray-700 font-medium"
              >
                {label}
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      name as "profileImage" | "backgroundImage"
                    )
                  }
                  className="mb-4"
                />
              </label>
            ))}

            <button
              onClick={() => {
                handleSubmit();
                setNewContact(null);
                setEditingIndex(null);
              }}
              className="btn-primary border p-2 cursor-pointer"
            >
              {editingIndex === -1 ? "Add Contact" : "Update Contact"}
            </button>
          </div>
        )}
      </div>

      {/* Contact List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md relative">
            <h2 className="text-lg font-semibold text-white">
              {contact.firstName} {contact.lastName}
            </h2>
            <ContactQRCode contact={contact} index={index} />
            <button
              onClick={() => {
                setNewContact(contact);
                setEditingIndex(index);
              }}
              className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                const updatedContacts = contacts.filter((_, i) => i !== index);
                setContacts(updatedContacts);
                localStorage.setItem(
                  "contacts",
                  JSON.stringify(updatedContacts)
                );
              }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
