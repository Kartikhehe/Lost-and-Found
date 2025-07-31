import { Plus } from 'lucide-react';

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mx-auto my-8 block px-6 py-3 bg-blue-600 text-white text-xl border-none rounded-lg cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2"
    >
      <Plus size={20} />
      Add New Item
    </button>
  );
};

export default AddButton;

