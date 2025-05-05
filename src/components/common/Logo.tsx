import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-40 w-40',
    lg: 'h-64 w-64',
  };

  return (
    <img
      src="/Vista_Room_2.png"
      alt="Vista Room"
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
};

export default Logo; 