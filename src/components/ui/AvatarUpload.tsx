import * as React from 'react';
import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { User, Upload, X } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatarFile: File | null) => void;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarUpload({
  currentAvatar,
  onAvatarChange,
  name,
  size = 'md',
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleNewFile(file);
  };

  const handleNewFile = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onAvatarChange(file);
    } else {
      setPreviewUrl(currentAvatar || null);
      onAvatarChange(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    handleNewFile(file);
  };

  const handleRemoveAvatar = () => {
    setPreviewUrl(null);
    onAvatarChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickAvatar = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative ${sizeClasses[size]} cursor-pointer rounded-full overflow-hidden border-2 ${
          isDragging ? 'border-primary border-dashed' : 'border-transparent'
        }`}
        onClick={handleClickAvatar}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Avatar className={`${sizeClasses[size]}`}>
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt={name || 'Avatar'} />
          ) : (
            <AvatarFallback className="bg-muted">
              {name ? getInitials(name) : <User />}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
          <Upload className="text-white" size={24} />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <div className="flex gap-2">
        {previewUrl && (
          <Button type="button" variant="outline" size="sm" onClick={handleRemoveAvatar}>
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
        <Button type="button" variant="outline" size="sm" onClick={handleClickAvatar}>
          <Upload className="h-4 w-4 mr-1" />
          {previewUrl ? 'Change' : 'Upload'}
        </Button>
      </div>
    </div>
  );
}
