import React from 'react';
import { useLoadingStore } from '../../store/loadingStore';
import LoadingLogo from './LoadingLogo';

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <LoadingLogo size="lg" className="text-indigo-600" />
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading...</h2>
        <p className="mt-2 text-sm text-gray-600">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoadingOverlay; 