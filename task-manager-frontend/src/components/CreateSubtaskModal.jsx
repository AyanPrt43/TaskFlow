import { useState } from "react";

function CreateSubtaskModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      id: Date.now(),

      title: title,

      completed: false,
    });

    setTitle("");

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-black/20  rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5">Add Subtask</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Subtask title"
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-black text-white py-3 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSubtaskModal;
