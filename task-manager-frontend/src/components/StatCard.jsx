function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500 font-medium">{title}</h3>

      <p className="text-4xl font-bold mt-3">{value}</p>
    </div>
  );
}

export default StatCard;
