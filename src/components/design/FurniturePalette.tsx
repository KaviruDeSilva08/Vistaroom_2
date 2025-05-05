import React from 'react';
import { useDesignStore } from '../../store/designStore';
import { FurnitureItem } from '../../types';
import { ArmchairIcon as ChairIcon, TableIcon, SofaIcon, SquareIcon } from 'lucide-react';

const FurniturePalette: React.FC = () => {
  const { addFurniture, currentDesign } = useDesignStore();
  
  const furnitureTemplates = [
    {
      type: 'chair',
      name: 'Dining Chair',
      width: 45,
      depth: 50,
      height: 90,
      color: '#8B4513',
      icon: <ChairIcon className="h-6 w-6" />,
    },
    {
      type: 'table',
      name: 'Dining Table',
      width: 150,
      depth: 90,
      height: 75,
      color: '#5D4037',
      icon: <TableIcon className="h-6 w-6" />,
    },
    {
      type: 'sofa',
      name: 'Sofa',
      width: 220,
      depth: 90,
      height: 85,
      color: '#607D8B',
      icon: <SofaIcon className="h-6 w-6" />,
    },
    {
      type: 'cabinet',
      name: 'Cabinet',
      width: 120,
      depth: 45,
      height: 180,
      color: '#795548',
      icon: <SquareIcon className="h-6 w-6" />,
    },
  ];
  
  const handleAddFurniture = (template: typeof furnitureTemplates[0]) => {
    if (!currentDesign) return;
    
    const newItem: FurnitureItem = {
      id: `${template.type}-${Date.now()}`,
      type: template.type as any,
      name: template.name,
      width: template.width,
      depth: template.depth,
      height: template.height,
      color: template.color,
      position: { x: 50, y: 0, z: 50 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      selected: false,
    };
    
    addFurniture(newItem);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="text-sm font-medium text-gray-900">Furniture Palette</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {furnitureTemplates.map((template) => (
          <button
            key={template.type}
            onClick={() => handleAddFurniture(template)}
            className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-indigo-600 mb-2">{template.icon}</div>
            <span className="text-xs font-medium text-gray-700">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FurniturePalette;