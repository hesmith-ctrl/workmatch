import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadSection = ({ photos, onPhotosChange, isCompleted, onComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file: file,
          isPrimary: photos.length === 0
        };
        onPhotosChange([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleRemovePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    if (updatedPhotos.length > 0 && !updatedPhotos.some(p => p.isPrimary)) {
      updatedPhotos[0].isPrimary = true;
    }
    onPhotosChange(updatedPhotos);
  };

  const handleSetPrimary = (photoId) => {
    const updatedPhotos = photos.map(photo => ({
      ...photo,
      isPrimary: photo.id === photoId
    }));
    onPhotosChange(updatedPhotos);
  };

  const openCropMode = (photo) => {
    setSelectedPhoto(photo);
    setCropMode(true);
  };

  const closeCropMode = () => {
    setCropMode(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Add Your Professional Photos
        </h3>
        <p className="text-text-secondary">
          Upload 1-6 professional photos. Your first photo will be your main profile picture.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50/50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Camera" size={24} className="text-primary" />
          </div>
          
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              Drag & drop photos here
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              or click to browse files
            </p>
            
            <Button
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              iconName="Upload"
              iconPosition="left"
            >
              Choose Photos
            </Button>
          </div>
          
          <p className="text-xs text-text-muted">
            Supported formats: JPG, PNG, GIF (max 5MB each)
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group aspect-square bg-secondary-100 rounded-lg overflow-hidden"
            >
              <Image
                src={photo.url}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
              
              {/* Primary badge */}
              {photo.isPrimary && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Primary
                </div>
              )}
              
              {/* Action buttons */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                {!photo.isPrimary && (
                  <Button
                    variant="secondary"
                    onClick={() => handleSetPrimary(photo.id)}
                    className="text-xs"
                  >
                    Set Primary
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  onClick={() => openCropMode(photo)}
                  iconName="Edit"
                  className="p-2"
                  aria-label="Edit photo"
                />
                
                <Button
                  variant="danger"
                  onClick={() => handleRemovePhoto(photo.id)}
                  iconName="Trash2"
                  className="p-2"
                  aria-label="Remove photo"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Tips */}
      <div className="bg-accent-50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="text-accent mr-2" />
          Photo Tips
        </h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Use high-quality, well-lit photos</li>
          <li>• Show your face clearly in the main photo</li>
          <li>• Include professional headshots and workplace photos</li>
          <li>• Avoid group photos as your primary image</li>
          <li>• Keep photos recent and representative</li>
        </ul>
      </div>

      {/* Crop Modal */}
      {cropMode && selectedPhoto && (
        <div className="fixed inset-0 z-modal bg-black/80 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-text-primary">Edit Photo</h4>
              <Button
                variant="ghost"
                onClick={closeCropMode}
                iconName="X"
                className="p-2"
                aria-label="Close"
              />
            </div>
            
            <div className="aspect-square bg-secondary-100 rounded-lg mb-4 overflow-hidden">
              <Image
                src={selectedPhoto.url}
                alt="Photo to edit"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={closeCropMode}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={closeCropMode}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Status */}
      {photos.length > 0 && !isCompleted && (
        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => onComplete(true)}
            iconName="Check"
            iconPosition="left"
          >
            Photos Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadSection;