import React, { useState } from 'react';

function EntriesList({ entries, onDelete, onEdit }) {
  const [editingEntry, setEditingEntry] = useState(null);

  // Get YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // If there are no entries, show the empty state
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="sparkle-container">
          <div className="sparkle">
            <div className="sparkle-blue"></div>
            <div className="sparkle-yellow"></div>
            <div className="sparkle-pink"></div>
            <div className="sparkle-center"></div>
          </div>
        </div>
        <div className="empty-state-text">Your sanctum is empty</div>
        <div className="empty-state-subtext">Add your first item to begin</div>
      </div>
    );
  }

  return (
    <div className="entries-list">
      {entries.map(entry => (
        <div className="entry-card" key={entry.id}>
          <div className="entry-header">
            <div className="entry-type-container">
              <div className={`entry-type ${entry.type}`}>
                {entry.type === 'note' && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="entry-type-icon" width="16" height="16">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    Note
                  </>
                )}
                
                {entry.type === 'link' && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="entry-type-icon" width="16" height="16">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    Link
                  </>
                )}
                
                {entry.type === 'youtube' && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="entry-type-icon" width="16" height="16">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                    YouTube
                  </>
                )}
              </div>
              <h3 className="entry-title">{entry.title}</h3>
            </div>
            
            <div className="entry-actions">
              <button 
                className="entry-action-btn"
                onClick={() => setEditingEntry(entry)}
                aria-label="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              
              <button 
                className="entry-action-btn"
                onClick={() => onDelete(entry.id)}
                aria-label="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Render content based on entry type */}
          {entry.type === 'note' && entry.content && (
            <div className="entry-content">{entry.content}</div>
          )}
          
          {entry.type === 'link' && entry.url && (
            <a href={entry.url} className="entry-link" target="_blank" rel="noopener noreferrer">
              {entry.url}
            </a>
          )}
          
          {entry.type === 'youtube' && entry.url && (
            <div className="youtube-preview">
              {getYouTubeVideoId(entry.url) ? (
                <div className="youtube-player">
                  <iframe 
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(entry.url)}`}
                    title={entry.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="entry-youtube-thumbnail">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="2" y1="7" x2="7" y2="7" />
                    <line x1="2" y1="17" x2="7" y2="17" />
                    <line x1="17" y1="17" x2="22" y2="17" />
                    <line x1="17" y1="7" x2="22" y2="7" />
                  </svg>
                  <div className="invalid-url-notice">Invalid YouTube URL</div>
                </div>
              )}
              <a href={entry.url} className="entry-link" target="_blank" rel="noopener noreferrer">
                {entry.url}
              </a>
            </div>
          )}
          
          {/* Render tags if there are any */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="entry-tags">
              {entry.tags.map((tag, index) => (
                <span key={index} className="entry-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Modal for editing entry (will be rendered if editingEntry is not null) */}
      {editingEntry && (
        <EntryFormModal 
          entry={editingEntry}
          onSubmit={(updatedEntry) => {
            onEdit(updatedEntry);
            setEditingEntry(null);
          }}
          onCancel={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
}

// Component for the edit modal
function EntryFormModal({ entry, onSubmit, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Edit Item</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          
          // Get form values
          const form = e.target;
          const title = form.title.value;
          const content = entry.type === 'note' ? form.content?.value : null;
          const url = entry.type !== 'note' ? form.url?.value : null;
          const tags = form.tags.value.split(',').map(tag => tag.trim()).filter(Boolean);
          
          // Submit updated entry
          onSubmit({
            ...entry,
            title,
            content,
            url,
            tags
          });
        }}>
          {/* Title input */}
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">Title</label>
            <input
              type="text"
              id="edit-title"
              name="title"
              className="form-control"
              defaultValue={entry.title}
              required
            />
          </div>
          
          {/* Content or URL input based on type */}
          {entry.type === 'note' ? (
            <div className="form-group">
              <label htmlFor="edit-content" className="form-label">Note Content</label>
              <textarea
                id="edit-content"
                name="content"
                className="form-control"
                defaultValue={entry.content}
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="edit-url" className="form-label">
                {entry.type === 'youtube' ? 'YouTube URL' : 'Link URL'}
              </label>
              <input
                type="url"
                id="edit-url"
                name="url"
                className="form-control"
                defaultValue={entry.url}
                required
              />
            </div>
          )}
          
          {/* Tags Input */}
          <div className="form-group">
            <label htmlFor="edit-tags" className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              id="edit-tags"
              name="tags"
              className="form-control"
              defaultValue={entry.tags?.join(', ')}
            />
          </div>
          
          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntriesList;

