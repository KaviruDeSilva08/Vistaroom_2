import React from 'react';
import Header from '../components/common/Header';
import DesignControls from '../components/design/DesignControls';
import FurniturePalette from '../components/design/FurniturePalette';
import DesignCanvas2D from '../components/design/DesignCanvas2D';
import DesignCanvas3D from '../components/design/DesignCanvas3D';
import { useDesignStore } from '../store/designStore';

const DesignEditorPage: React.FC = () => {
  const { currentRoom, currentDesign, viewMode } = useDesignStore();
  
  if (!currentRoom || !currentDesign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-lg text-gray-500">No active design. Please create or select a design from the dashboard.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <DesignControls />
        
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <aside className="w-full lg:w-64 bg-white shadow-md z-10 border-r border-gray-200 overflow-y-auto">
            <FurniturePalette />
          </aside>
          
          <main className="flex-1 overflow-hidden p-4">
            <div className="h-full rounded-lg overflow-hidden flex items-center justify-center">
              {viewMode.mode === '2d' ? (
                <DesignCanvas2D />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <DesignCanvas3D />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesignEditorPage;