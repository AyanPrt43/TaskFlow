import { useState } from "react";

function AssignMemberModal({ isOpen, onClose, members, onAssign }) {
  const [selectedMember, setSelectedMember] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const member = members.find(
      (member) => member.id === Number(selectedMember),
    );

    if (member) {
      onAssign(member);
    }

    setSelectedMember("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-black/20 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5">Assign Member</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full border p-3 rounded-lg mb-5"
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.role}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white px-5 py-3 rounded-lg"
            >
              Assign
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

export default AssignMemberModal;
