'use client';

import { useEffect, useState } from 'react';

export default function SellerAdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load blogs from localStorage
  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
  }, []);

  // Save blogs to localStorage
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      id: isEditing ? editingId : Date.now(),
      title,
      content,
      image: imagePreview,
    };

    if (isEditing) {
      setBlogs(prev => prev.map(b => (b.id === editingId ? blog : b)));
      alert('✅ Blog updated!');
    } else {
      setBlogs(prev => [...prev, blog]);
      alert('✅ Blog created!');
    }

    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImagePreview(blog.image);
    setIsEditing(true);
    setEditingId(blog.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm('Delete this blog?');
    if (confirmDelete) {
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // Accept any email and password
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Login Page
 if (!isLoggedIn) {
  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={headingStyle}>🔐 Admin Login</h2>
        <input type="email" placeholder="Email" required style={inputStyle} />
        <input type="password" placeholder="Password" required style={inputStyle} />
        <button type="submit" style={buttonStyle('#4a90e2')}>Login</button>
      </form>
    </div>
  );
}


  // Main Dashboard
  return (
    <div style={containerStyle}>
      {/* Background */}
      <img
        src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="bg"
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.2,
        }}
      />

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
  <h1 style={headingStyle}>📝 Seller Admin Blog</h1>
  <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
    <button onClick={handleLogout} style={logoutButtonStyle}>🚪 Logout</button>
  </div>


        {/* Blog Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2>{isEditing ? '✏️ Edit Blog' : '➕ Create Blog'}</h2>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            required
            style={inputStyle}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '1rem' }} />
          {imagePreview && (
            <img src={imagePreview} alt="preview" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
          )}
          <button type="submit" style={buttonStyle(isEditing ? '#FF9800' : '#4CAF50')}>
            {isEditing ? 'Update Blog' : 'Post Blog'}
          </button>
        </form>

        {/* Blog List */}
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
          <h2>🗂️ Blog Posts</h2>
          {blogs.length === 0 ? (
            <p>No blogs yet!</p>
          ) : (
            blogs.map(blog => (
              <div key={blog.id} style={cardStyle}>
                {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />}
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                  <button onClick={() => handleEdit(blog)} style={buttonStyle('#2196F3')}>✏️ Edit</button>
                  <button onClick={() => handleDelete(blog.id)} style={buttonStyle('#F44336')}>🗑️ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f4f8',
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  color: '#2c3e50',
  padding: '2rem',
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  marginBottom: '1rem',
  backgroundColor: '#fff',
  color: '#2c3e50',
  border: '1.5px solid #cbd5e0',
  borderRadius: '10px',
  fontSize: '16px',
  boxSizing: 'border-box',
  outline: 'none',
};

const formStyle = {
  width: '100%',
  maxWidth: '450px',
  backgroundColor: '#ffffff',
  padding: '2.5rem',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  marginBottom: '1.5rem',
  borderRadius: '12px',
  borderLeft: '5px solid #4a90e2',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
};

const buttonStyle = (bg) => ({
  backgroundColor: bg,
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
});

const logoutButtonStyle = {
  ...buttonStyle('#e63946'),
  marginTop: '1rem',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
  fontSize: '2.2rem',
  color: '#4a90e2',
};

const sectionTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  fontWeight: 'bold',
  color: '#2c3e50',
};
