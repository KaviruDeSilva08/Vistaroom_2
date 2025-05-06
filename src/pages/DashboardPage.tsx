import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { useAuthStore } from '../store/authStore';
import { useDesignStore } from '../store/designStore';
import { PlusCircle, FolderPlus, Home } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { designer } = useAuthStore();
  const { rooms, designs, setCurrentRoom, setCurrentDesign } = useDesignStore();
  const navigate = useNavigate();
  
  const [newDesignName, setNewDesignName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [showNewDesignForm, setShowNewDesignForm] = useState(false);
  
  const handleCreateRoom = () => {
    navigate('/room-config');
  };
  
  const handleCreateNewDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesignName || !selectedRoomId || !designer) return;
    
    // First set the current room
    const room = rooms.find(r => r.id === selectedRoomId);
    if (room) {
      setCurrentRoom(room);
    }
    
    // Create a new design in the store
    useDesignStore.getState().createDesign(
      newDesignName,
      selectedRoomId,
      designer.id
    );
    
    // Navigate to the design editor
    navigate('/design-editor');
  };
  
  const handleOpenDesign = (designId: string) => {
    const design = designs.find(d => d.id === designId);
    if (design) {
      // Set current design
      setCurrentDesign(design);
      
      // Set current room
      const room = rooms.find(r => r.id === design.roomId);
      if (room) {
        setCurrentRoom(room);
      }
      
      // Navigate to the design editor
      navigate('/design-editor');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Duplicated Welcome and Summary Cards Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {designer?.name || 'Designer'}
        </h1>

          <p className="text-lg text-gray-500 mb-8">Manage your rooms and designs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Rooms Card */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <Home className="h-8 w-8 text-blue-400" />
              </div>
              <div>
                <div className="text-gray-500 text-sm font-medium">Total Rooms</div>
                <div className="text-2xl font-bold text-gray-900">{rooms.length}</div>
              </div>
            </div>
            {/* Total Designs Card */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
              <div className="bg-green-50 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm font-medium">Total Designs</div>
                <div className="text-2xl font-bold text-gray-900">{designs.length}</div>
              </div>
            </div>
            {/* Recent Activity Card */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
              <div className="bg-yellow-50 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" /></svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm font-medium">Recent Activity</div>
                <div className="text-2xl font-bold text-gray-900">None</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            
            <div className="flex space-x-3">
              <button
                onClick={handleCreateRoom}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Room
              </button>
              
              <button
                onClick={() => setShowNewDesignForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                New Design
              </button>
            </div>
          </div>
          
          {showNewDesignForm && (
            <div className="mt-6 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create New Design
                </h3>
                <form className="mt-5 sm:flex sm:items-end" onSubmit={handleCreateNewDesign}>
                  <div className="w-full sm:max-w-xs mr-3">
                    <label htmlFor="design-name" className="block text-sm font-medium text-gray-700">
                      Design Name
                    </label>
                    <input
                      type="text"
                      name="design-name"
                      id="design-name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Kitchen Redesign"
                      value={newDesignName}
                      onChange={(e) => setNewDesignName(e.target.value)}
                    />
                  </div>
                  
                  <div className="w-full sm:max-w-xs mr-3">
                    <label htmlFor="room-select" className="block text-sm font-medium text-gray-700">
                      Select Room
                    </label>
                    <select
                      id="room-select"
                      name="room-select"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                    >
                      <option value="">Select a room</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mt-5 sm:mt-0 sm:ml-3 flex">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setShowNewDesignForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Your Rooms</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {rooms.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {rooms.map((room) => (
                      <li key={room.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {room.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {room.width} × {room.length} × {room.height} inches
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setCurrentRoom(room);
                                navigate('/room-config');
                              }}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No rooms created yet</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1 sm:col-span-2 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">Your Designs</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {designs.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {designs.map((design) => {
                      const room = rooms.find(r => r.id === design.roomId);
                      return (
                        <li
                          key={design.id}
                          className="col-span-1 bg-gray-50 rounded-lg shadow divide-y divide-gray-200 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleOpenDesign(design.id)}
                        >
                          <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {design.name}
                              </h3>
                              <p className="mt-1 text-xs text-gray-500 truncate">
                                Room: {room?.name || 'Unknown'}
                              </p>
                              <p className="mt-1 text-xs text-gray-500 truncate">
                                Last updated: {new Date(design.updatedAt).toLocaleDateString()}
                              </p>
                              <p className="mt-1 text-xs text-gray-500 truncate">
                                Items: {design.furniture.length}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No designs created yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;