import React from 'react';

interface LoadingLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-40 w-40',
    lg: 'h-64 w-64',
  };

  return (
    <img
      src="/Vista_Room_3.png"
      alt="Vista Room Loading"
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
};

export default LoadingLogo; 