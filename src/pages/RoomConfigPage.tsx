import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import RoomConfigForm from '../components/room/RoomConfigForm';

const RoomConfigPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleComplete = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <RoomConfigForm onComplete={handleComplete} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomConfigPage;