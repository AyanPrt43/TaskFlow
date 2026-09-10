// import { useState } from "react";

// import { useApp } from "../context/AppContext";

// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// import MemberCard from "../components/MemberCard";
// import AddMemberModal from "../components/AddMemberModal";

// function Members() {
//   const { members, setMembers } = useApp();

//   console.log("Members from Context:", members);

//   const [showModal, setShowModal] = useState(false);

//   const addMember = (member) => {
//     const newMember = {
//       id: Date.now(),

//       name: member.name,

//       email: member.email,

//       role: member.role,
//     };

//     setMembers((prev) => [...prev, newMember]);

//     setShowModal(false);
//   };

//   const deleteMember = (id) => {
//     setMembers((prev) => prev.filter((member) => member.id !== id));
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1">
//         <Navbar />

//         <main className="p-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-4xl font-bold">Members</h1>

//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-black text-white px-5 py-3 rounded-lg"
//             >
//               + Add Member
//             </button>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {members && members.length > 0 ? (
//               members.map((member) => (
//                 <MemberCard
//                   key={member.id}
//                   member={member}
//                   onDelete={deleteMember}
//                 />
//               ))
//             ) : (
//               <p className="text-gray-500">No members available</p>
//             )}
//           </div>
//         </main>
//       </div>

//       <AddMemberModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onCreate={addMember}
//       />
//     </div>
//   );
// }

// export default Members;

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Members() {
  const members = [
    {
      id: 1,
      name: "Ayan Pratap",
      email: "ayan@example.com",
      role: "Developer",
    },

    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Designer",
    },

    {
      id: 3,
      name: "Priya Singh",
      email: "priya@example.com",
      role: "Tester",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-4xl font-bold mb-8 text-white">Members</h1>

          <div className="grid md:grid-cols-3 gap-6 ">
            {members.map((member) => (
              <div key={member.id} className="rounded-xl shadow p-6 bg-black/20 border border-white/40 shadow-white/20">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>

                <p className="text-white/80">{member.email}</p>

                <p className="mt-3 text-white">{member.role}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Members;
