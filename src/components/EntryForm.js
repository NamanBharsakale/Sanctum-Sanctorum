import React, { useState } from 'react';

function EntryForm({ onSubmit, onCancel, initialType = 'note', initialData = null }) {
  // Form state
  const [formData, setFormData] = useState({
    id: initialData?.id || Date.now().toString(),
    type: initialData?.type || initialType,
    title: initialData?.title || '',
    content: initialData?.content || '',
    url: initialData?.url || '',
    tags: initialData?.tags?.join(', ') || '',
    createdAt: initialData?.createdAt || new Date().toISOString(),
    file: null
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file
    });
  };

  // Handle type selection
  const handleTypeSelect = (type) => {
    setFormData({
      ...formData,
      type,
      file: null,
      content: '',
      url: ''
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the entry data
    const entry = {
      id: formData.id,
      type: formData.type,
      title: formData.title,
      content: formData.type === 'note' ? formData.content : null,
      url: formData.type === 'link' || formData.type === 'youtube' ? formData.url : null,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      createdAt: formData.createdAt,
      file: formData.file
    };

    onSubmit(entry);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* Image section at top center */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
  <img
    src="https://wallpapercave.com/wp/wp8601570.jpg"
    alt="Custom"
    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
  />
</div>       </div>

        <div className="modal-header">
          <h2 className="modal-title">Add New Item</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Item Type Selection */}
          <div className="type-selector">
            <div
              className={`type-option ${formData.type === 'note' ? 'active note' : ''}`}
              onClick={() => handleTypeSelect('note')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="type-option-icon" width="16" height="16">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Note
            </div>

            <div
              className={`type-option ${formData.type === 'link' ? 'active link' : ''}`}
              onClick={() => handleTypeSelect('link')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="type-option-icon" width="16" height="16">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              Link
            </div>

            <div
              className={`type-option ${formData.type === 'youtube' ? 'active youtube' : ''}`}
              onClick={() => handleTypeSelect('youtube')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="type-option-icon" width="16" height="16">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
              YouTube
            </div>
          </div>

          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Content or URL input based on type */}
          {formData.type === 'note' ? (
            <div className="form-group">
              <label htmlFor="content" className="form-label">Note Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                placeholder="Write your note here..."
                value={formData.content}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="url" className="form-label">
                {formData.type === 'youtube' ? 'YouTube URL' : 'Link URL'}
              </label>
              <input
                type="url"
                id="url"
                name="url"
                className="form-control"
                placeholder={formData.type === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://...'}
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Tags Input */}
          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags (Optional, comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-control"
              placeholder="work, idea, watch later"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon" width="16" height="16">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntryForm;
