import { Edit, Trash2, Mail } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete, canEdit = true }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'found') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✅ Found
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          ❌ Lost
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {item.image_url && (
        <img 
          src={item.image_url} 
          alt={item.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          {getStatusBadge(item.status)}
        </div>
        
        {item.description && (
          <p className="text-gray-600 mb-4">{item.description}</p>
        )}
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Location:</span> {item.location}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {formatDate(item.date_found_lost)}
          </div>
          <div className="flex items-center">
            <span className="font-semibold">Contact:</span>
            <a 
              href={`mailto:${item.contact_email}`}
              className="ml-2 text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              {item.contact_email}
            </a>
          </div>
          <div>
            <span className="font-semibold">Category:</span> {item.category}
          </div>
          {item.username && (
            <div>
              <span className="font-semibold">Posted by:</span> {item.username}
            </div>
          )}
        </div>
        
        {canEdit && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={onEdit}
              className="flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;

