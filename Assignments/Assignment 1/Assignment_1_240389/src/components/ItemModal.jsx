import React, { useState, useEffect } from 'react';

function ItemModal({ initialData = {}, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    contact: '',
    status: 'lost',
    image: '',
    ...initialData,
  });

  useEffect(() => {
    if (initialData.date) {
      const parseDate = (str) => {
        if (str.includes('/')) {
          const [day, month, year] = str.split('/');
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return str;
      };
  
      setFormData(prev => ({
        ...prev,
        date: parseDate(initialData.date)
      }));
    }
  }, [initialData.date]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1055
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="modal-title">{initialData.id ? 'Update' : 'Add'} {formData.status === 'lost' ? 'Lost Item' : 'Found Item'}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label me-2">Status:</label>
              <div className="form-check form-check-inline">
                <input
                  id="status-lost"
                  className="form-check-input"
                  type="radio"
                  name="status"
                  value="lost"
                  checked={formData.status === 'lost'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="status-lost">Lost</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="status-found"
                  className="form-check-input"
                  type="radio"
                  name="status"
                  value="found"
                  checked={formData.status === 'found'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="status-found">Found</label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">{formData.status === 'lost' ? 'Title of Lost Item' : 'Title of Found Item'}</label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">{formData.status === 'lost' ? 'Date Lost' : 'Date Found'}</label>
              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Email</label>
              <input type="email" className="form-control" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input type="file" accept="image/*" className="form-control" onChange={handleImageUpload} />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: '150px' }}
                />
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {initialData.id ? 'Update Item' : 'Add Item'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;