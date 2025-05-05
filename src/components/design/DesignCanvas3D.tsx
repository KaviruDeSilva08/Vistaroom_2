import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  OrbitControls,
  TransformControls,
  Grid,
  Html,
  GizmoHelper,
  GizmoViewport,
  Environment,
  Stats,
  useHelper,
  ContactShadows,
  SoftShadows
} from '@react-three/drei';
import { useDesignStore } from '../../store/designStore';
import { FurnitureItem, Room } from '../../types';
import * as THREE from 'three';
import { Furniture } from './Furniture3D';

// Enhanced room scene with better lighting and effects
const RoomScene: React.FC<{ room: Room }> = ({ room }) => {
  const { currentDesign, selectFurniture, clearSelection } = useDesignStore();
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  
  // Handle furniture selection
  const handleFurnitureClick = (id: string) => {
    selectFurniture(id);
  };
  
  // Handle background click to clear selection
  const handleBackgroundClick = () => {
    clearSelection();
  };

  // Handle transform changes
  const handleTransform = useCallback((event: any) => {
    const selectedItem = currentDesign?.furniture.find(item => item.selected);
    if (!selectedItem) return;

    const target = event.target;
    const position = target.position;
    const rotation = target.rotation;
    const scale = target.scale;

    useDesignStore.getState().updateFurniture(selectedItem.id, {
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
      scale: scale.x,
    });
  }, [currentDesign]);
  
  return (
    <>
      <SoftShadows size={25} samples={16} />
      
      {/* Room */}
      <group onClick={handleBackgroundClick}>
        {/* Floor with enhanced grid */}
        <Grid
          position={[room.width / 2, 0, room.length / 2]}
          args={[room.width, room.length, 20, 20]}
          cellColor="#666666"
          sectionColor="#888888"
          fadeDistance={3000}
          fadeStrength={1}
          infiniteGrid
          cellSize={50}
          sectionSize={200}
        />
        <mesh position={[room.width / 2, -0.1, room.length / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[room.width, room.length]} />
          <meshStandardMaterial color={room.colorScheme.floor} />
        </mesh>
        
        {/* Ceiling with soft shadows */}
        <mesh position={[room.width / 2, room.height, room.length / 2]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[room.width, room.length]} />
          <meshStandardMaterial color={room.colorScheme.ceiling} />
        </mesh>
        
        {/* Walls with enhanced materials */}
        {/* Back wall */}
        <group position={[room.width / 2, room.height / 2, 0]}>
          <mesh receiveShadow>
            <planeGeometry args={[room.width, room.height]} />
            <meshStandardMaterial 
              color={room.colorScheme.walls} 
              side={THREE.DoubleSide}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          {/* Window */}
          <mesh position={[0, room.height * 0.2, 0.1]}>
            <planeGeometry args={[room.width * 0.3, room.height * 0.4]} />
            <meshPhysicalMaterial 
              color="#87CEEB" 
              opacity={0.3} 
              transparent 
              roughness={0}
              metalness={0.2}
              transmission={0.9}
            />
          </mesh>
        </group>
        
        {/* Front wall */}
        <mesh position={[room.width / 2, room.height / 2, room.length]} rotation={[0, Math.PI, 0]} receiveShadow>
          <planeGeometry args={[room.width, room.height]} />
          <meshStandardMaterial 
            color={room.colorScheme.walls} 
            side={THREE.DoubleSide}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[0, room.height / 2, room.length / 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[room.length, room.height]} />
          <meshStandardMaterial 
            color={room.colorScheme.walls} 
            side={THREE.DoubleSide}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[room.width, room.height / 2, room.length / 2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[room.length, room.height]} />
          <meshStandardMaterial 
            color={room.colorScheme.walls} 
            side={THREE.DoubleSide}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>
      
      {/* Furniture */}
      {currentDesign?.furniture.map((item) => (
        <React.Fragment key={item.id}>
          {item.selected && (
            <TransformControls
              mode={transformMode}
              onObjectChange={handleTransform}
              onMouseDown={() => {
                const orbitControls = document.querySelector('.orbit-controls');
                if (orbitControls) {
                  (orbitControls as any).__r3f.api.enabled = false;
                }
              }}
              onMouseUp={() => {
                const orbitControls = document.querySelector('.orbit-controls');
                if (orbitControls) {
                  (orbitControls as any).__r3f.api.enabled = true;
                }
                // Cycle transform mode on mouse up when object is selected
                setTransformMode(current => {
                  switch (current) {
                    case 'translate': return 'rotate';
                    case 'rotate': return 'scale';
                    case 'scale': return 'translate';
                    default: return 'translate';
                  }
                });
              }}
            >
              <Furniture
                item={item}
                onClick={() => handleFurnitureClick(item.id)}
                transformMode={transformMode}
                onTransform={handleTransform}
              />
            </TransformControls>
          )}
          {!item.selected && (
            <Furniture
              item={item}
              onClick={() => handleFurnitureClick(item.id)}
              transformMode={transformMode}
              onTransform={handleTransform}
            />
          )}
        </React.Fragment>
      ))}
      
      {/* Contact shadows for better grounding */}
      <ContactShadows
        position={[0, -0.09, 0]}
        opacity={0.4}
        scale={100}
        blur={2}
        far={10}
      />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </directionalLight>
      <pointLight position={[room.width / 2, room.height - 1, room.length / 2]} intensity={0.5} />
      
      {/* Environment and Helpers */}
      <Environment preset="apartment" />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
      
      {/* Performance Stats */}
      <Stats className="stats" />
    </>
  );
};

const DesignCanvas3D: React.FC = () => {
  const { currentRoom } = useDesignStore();
  
  if (!currentRoom) {
    return (
      <div className="flex items-center justify-center h-[400px] w-[400px] bg-gray-100">
        <p className="text-gray-500">No room configured</p>
      </div>
    );
  }
  
  return (
    <div className="h-[400px] w-[400px] bg-gray-100 rounded-lg shadow-inner overflow-hidden design-canvas-container">
      <Canvas shadows camera={{ position: [0, 0, 500], fov: 45 }}>
        <RoomScene room={currentRoom} />
        <OrbitControls
          className="orbit-controls"
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[currentRoom.width / 2, currentRoom.height / 2, currentRoom.length / 2]}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={100}
          maxDistance={2000}
        />
      </Canvas>
    </div>
  );
};

export default DesignCanvas3D;