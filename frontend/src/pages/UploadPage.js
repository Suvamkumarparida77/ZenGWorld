import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './UploadPage.css';

function UploadPage() {
  const navigate = useNavigate();
  
  // STATE
  const [uploadType, setUploadType] = useState('shorts'); // 'shorts' or 'ott'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [category, setCategory] = useState('Entertainment');
  
  const videoRef = useRef(null);

  // --- HANDLERS ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Stop camera if active
      setIsCameraActive(false); 
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  // Camera Logic (Only for Shorts)
  const [isCameraActive, setIsCameraActive] = useState(false);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      alert("Could not access camera.");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!videoFile && !isCameraActive) {
      alert(`Please select a video for ${uploadType}!`);
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert(`${uploadType === 'shorts' ? 'Short' : 'Video'} Uploaded Successfully!`);
      navigate(uploadType === 'shorts' ? '/shorts' : '/ott');
    }, 2000);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="upload-main">
        <h1 className="page-title">
          {uploadType === 'shorts' ? 'Create Short' : 'Upload Video'}
        </h1>

        {/* --- TYPE SWITCHER --- */}
        <div className="type-switcher">
          <button 
            className={`switch-btn ${uploadType === 'shorts' ? 'active' : ''}`}
            onClick={() => { setUploadType('shorts'); setVideoFile(null); setPreviewUrl(null); setIsCameraActive(false); }}
          >
            📱 Short Video (9:16)
          </button>
          <button 
            className={`switch-btn ${uploadType === 'ott' ? 'active' : ''}`}
            onClick={() => { setUploadType('ott'); setVideoFile(null); setPreviewUrl(null); setIsCameraActive(false); }}
          >
            📺 Long Video (16:9)
          </button>
        </div>

        <div className="upload-container">
          <div className="upload-split">
            
            {/* --- LEFT: PREVIEW AREA --- */}
            <div className="preview-area">
              {!previewUrl && !isCameraActive ? (
                <div className="empty-state">
                  <span className="icon">{uploadType === 'shorts' ? '📱' : '📺'}</span>
                  <h3>Add Video</h3>
                  <p>
                    {uploadType === 'shorts' 
                      ? 'Upload a vertical video (9:16) or Record' 
                      : 'Upload a horizontal video (16:9)'}
                  </p>
                  
                  <div className="upload-actions">
                    <label className="btn-upload">
                      Select from computer
                      <input 
                        type="file" 
                        accept={uploadType === 'shorts' ? "video/mp4,video/quicktime" : "video/*"} 
                        onChange={handleFileChange} 
                        hidden 
                      />
                    </label>
                    
                    {/* Only Shorts gets Camera Button */}
                    {uploadType === 'shorts' && (
                      <button className="btn-record" onClick={startCamera}>
                        Record with Camera
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="video-preview-wrapper">
                  {isCameraActive ? (
                    <video ref={videoRef} autoPlay muted playsInline className="preview-video" />
                  ) : (
                    <video src={previewUrl} controls className="preview-video" />
                  )}
                  <button className="btn-remove" onClick={() => { setPreviewUrl(null); setVideoFile(null); setIsCameraActive(false); }}>
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            {/* --- RIGHT: DETAILS FORM --- */}
            <div className="details-form">
              <h3>Details</h3>
              
              {/* Title (Only for OTT) */}
              {uploadType === 'ott' && (
                <div className="form-group">
                  <label>Title <span style={{color:'red'}}>*</span></label>
                  <input 
                    type="text" 
                    placeholder="Add a title that describes your video" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="caption-input"
                  />
                </div>
              )}

              {/* Description (Caption for Shorts, Description for OTT) */}
              <div className="form-group">
                <label>{uploadType === 'shorts' ? 'Caption' : 'Description'}</label>
                <textarea 
                  rows={uploadType === 'shorts' ? 3 : 6}
                  placeholder={uploadType === 'shorts' ? "Add a caption... #hashtags" : "Tell viewers about your video"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="caption-input"
                />
              </div>

              {/* Category (Important for OTT) */}
              {uploadType === 'ott' && (
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="caption-input"
                    style={{padding: '10px'}}
                  >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Education">Education</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
              )}

              {/* Thumbnail (Only for OTT) */}
              {uploadType === 'ott' && (
                <div className="form-group">
                  <label>Thumbnail</label>
                  <div className="cover-upload">
                    <label>
                      {thumbnailFile ? thumbnailFile.name : '🖼️ Click to Upload Cover'}
                      <input type="file" accept="image/*" onChange={handleThumbnailChange} hidden />
                    </label>
                  </div>
                </div>
              )}

              {/* Visibility */}
              <div className="form-group">
                <label>Visibility</label>
                <div className="visibility-options">
                  <label className="radio-label">
                    <input type="radio" name="visibility" defaultChecked /> Public
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="visibility" /> Unlisted
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="visibility" /> Private
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-discard" onClick={() => navigate('/')}>
                  Discard
                </button>
                <button className="btn-post" onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Uploading...' : (uploadType === 'shorts' ? 'Post Short' : 'Upload Video')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default UploadPage;