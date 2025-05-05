import React, { useState, useEffect } from 'react';
import { useDesignStore } from '../../store/designStore';
import { Room } from '../../types';
import { Square, PlusCircle } from 'lucide-react';

interface RoomConfigFormProps {
  onComplete: () => void;
}

const RoomConfigForm: React.FC<RoomConfigFormProps> = ({ onComplete }) => {
  const { currentRoom, addRoom, updateRoom } = useDesignStore();
  
  const [formData, setFormData] = useState<Omit<Room, 'id'>>({
    name: '',
    width: 200, // Default width in inches
    length: 160, // Default length in inches
    height: 96, // Default height in inches
    shape: 'rectangular',
    colorScheme: {
      walls: '#f5f5f5',
      floor: '#d7ccc8',
      ceiling: '#ffffff',
    },
  });

  // If editing an existing room, populate the form
  useEffect(() => {
    if (currentRoom) {
      setFormData({
        name: currentRoom.name,
        width: currentRoom.width,
        length: currentRoom.length,
        height: currentRoom.height,
        shape: currentRoom.shape,
        colorScheme: { ...currentRoom.colorScheme },
      });
    }
  }, [currentRoom]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'shape' ? value : Number(value) || value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentRoom) {
      updateRoom({
        ...formData,
        id: currentRoom.id,
      } as Room);
    } else {
      addRoom(formData as Room);
    }
    
    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Square className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">
          {currentRoom ? 'Edit Room' : 'Configure New Room'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Living Room, Dining Room, etc."
            />
          </div>
          
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">
              Width (inches)
            </label>
            <input
              type="number"
              name="width"
              id="width"
              required
              min="36"
              max="480"
              value={formData.width}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">
              Length (inches)
            </label>
            <input
              type="number"
              name="length"
              id="length"
              required
              min="36"
              max="480"
              value={formData.length}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height (inches)
            </label>
            <input
              type="number"
              name="height"
              id="height"
              required
              min="72"
              max="144"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="shape" className="block text-sm font-medium text-gray-700">
              Room Shape
            </label>
            <select
              id="shape"
              name="shape"
              value={formData.shape}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="rectangular">Rectangular</option>
              <option value="L-shaped">L-shaped</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="colorScheme.walls" className="block text-sm font-medium text-gray-700">
              Wall Color
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="color"
                name="colorScheme.walls"
                id="colorScheme.walls"
                value={formData.colorScheme.walls}
                onChange={handleChange}
                className="h-9 w-9 rounded-l-md border-r-0"
              />
              <input
                type="text"
                name="colorScheme.walls"
                value={formData.colorScheme.walls}
                onChange={handleChange}
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="colorScheme.floor" className="block text-sm font-medium text-gray-700">
              Floor Color
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="color"
                name="colorScheme.floor"
                id="colorScheme.floor"
                value={formData.colorScheme.floor}
                onChange={handleChange}
                className="h-9 w-9 rounded-l-md border-r-0"
              />
              <input
                type="text"
                name="colorScheme.floor"
                value={formData.colorScheme.floor}
                onChange={handleChange}
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="colorScheme.ceiling" className="block text-sm font-medium text-gray-700">
              Ceiling Color
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="color"
                name="colorScheme.ceiling"
                id="colorScheme.ceiling"
                value={formData.colorScheme.ceiling}
                onChange={handleChange}
                className="h-9 w-9 rounded-l-md border-r-0"
              />
              <input
                type="text"
                name="colorScheme.ceiling"
                value={formData.colorScheme.ceiling}
                onChange={handleChange}
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            {currentRoom ? 'Update Room' : 'Create Room'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomConfigForm;