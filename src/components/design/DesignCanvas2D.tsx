import React, { useRef, useEffect } from 'react';
import { useDesignStore } from '../../store/designStore';

const DesignCanvas2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentRoom, currentDesign, selectFurniture, updateFurniture, clearSelection } = useDesignStore();
  
  const isDragging = useRef(false);
  const selectedItemRef = useRef<string | null>(null);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  
  // Scale factor to convert cm to pixels
  const scale = 0.5;
  
  // Draw the room and furniture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentRoom) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size based on room dimensions
    canvas.width = currentRoom.width * scale;
    canvas.height = currentRoom.length * scale;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw room background (floor)
    ctx.fillStyle = currentRoom.colorScheme.floor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw room border (walls)
    ctx.strokeStyle = currentRoom.colorScheme.walls;
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Draw furniture
    if (currentDesign) {
      currentDesign.furniture.forEach(item => {
        const x = item.position.x * scale;
        const y = item.position.z * scale;  // Using z for y-position in 2D view
        const width = item.width * scale * item.scale;
        const depth = item.depth * scale * item.scale;
        
        // Save context for rotation
        ctx.save();
        
        // Translate to the center of the item
        ctx.translate(x + width / 2, y + depth / 2);
        
        // Apply rotation
        ctx.rotate(item.rotation.y);
        
        // Draw the item (centered)
        ctx.fillStyle = item.selected ? '#3B82F6' : item.color;
        ctx.fillRect(-width / 2, -depth / 2, width, depth);
        
        // Draw border
        ctx.strokeStyle = item.selected ? '#1E40AF' : '#4B5563';
        ctx.lineWidth = item.selected ? 2 : 1;
        ctx.strokeRect(-width / 2, -depth / 2, width, depth);
        
        // Draw item name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.name, 0, 0);
        
        // Restore context after rotation
        ctx.restore();
      });
    }
  }, [currentRoom, currentDesign, scale]);
  
  // Handle mouse interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentDesign) return;
    
    const getItemAt = (x: number, y: number) => {
      return currentDesign.furniture.findLast(item => {
        const itemX = item.position.x * scale;
        const itemY = item.position.z * scale;
        const itemWidth = item.width * scale * item.scale;
        const itemDepth = item.depth * scale * item.scale;
        
        // Simple bounding box check (not accounting for rotation)
        return (
          x >= itemX && 
          x <= itemX + itemWidth && 
          y >= itemY && 
          y <= itemY + itemDepth
        );
      });
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const item = getItemAt(x, y);
      
      if (item) {
        selectFurniture(item.id);
        selectedItemRef.current = item.id;
        isDragging.current = true;
        
        // Calculate offset from the corner of the item
        offsetXRef.current = x - (item.position.x * scale);
        offsetYRef.current = y - (item.position.z * scale);
      } else {
        clearSelection();
        selectedItemRef.current = null;
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !selectedItemRef.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate new position (accounting for the offset)
      const newX = (x - offsetXRef.current) / scale;
      const newZ = (y - offsetYRef.current) / scale;
      
      // Update the item position
      updateFurniture(selectedItemRef.current, {
        position: {
          x: newX,
          y: 0, // Keep y at 0 for 2D
          z: newZ,
        },
      });
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [currentDesign, selectFurniture, updateFurniture, clearSelection, scale]);
  
  return (
    <div className="relative bg-white rounded-lg shadow-inner overflow-hidden h-full design-canvas-container">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain" 
      />
    </div>
  );
};

export default DesignCanvas2D;