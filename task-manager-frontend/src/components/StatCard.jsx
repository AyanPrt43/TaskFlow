function StatCard({ title, value }) {
  return (
    <div className="bg-black/20 border border-white/40 shadow-white/20 p-6 rounded-xl shadow">
      <h3 className="text-white/80 font-medium">{title}</h3>

      <p className="text-4xl text-white font-bold mt-3">{value}</p>
    </div>
  );
}

export default StatCard;
