function MemberCard({ member, onDelete }) {
  return (
    <div className="bg-black/20 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold">{member.name}</h2>

      <p className="text-gray-500 mt-2">{member.email}</p>

      <span className="inline-block bg-gray-200 px-3 py-1 rounded-full mt-4">
        {member.role}
      </span>

      <button
        onClick={() => onDelete(member.id)}
        className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg"
      >
        Remove
      </button>
    </div>
  );
}

export default MemberCard;
