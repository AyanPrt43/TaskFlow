import { useState } from "react";

function AddMemberModal({ isOpen, onClose, onCreate }) {
  const [member, setMember] = useState({
    name: "",
    email: "",
    role: "Developer",
  });

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(member);

    setMember({
      name: "",
      email: "",
      role: "Developer",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5">Add Member</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={member.name}
            onChange={(e) =>
              setMember({
                ...member,

                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            value={member.email}
            onChange={(e) =>
              setMember({
                ...member,

                email: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-4"
          />

          <select
            value={member.role}
            onChange={(e) =>
              setMember({
                ...member,

                role: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg mb-5"
          >
            <option>Developer</option>

            <option>Designer</option>

            <option>Tester</option>

            <option>Manager</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white px-5 py-3 rounded-lg"
            >
              Add Member
            </button>

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberModal;
