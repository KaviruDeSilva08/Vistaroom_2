import React, { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { FurnitureItem } from '../../types';

// Modern Chair Model
const ChairModel: React.FC = () => {
  const chairRef = useRef<THREE.Group>(null);

  return (
    <group ref={chairRef}>
      {/* Seat */}
      <mesh castShadow receiveShadow position={[0, 45, 0]}>
        <boxGeometry args={[45, 5, 45]} />
        <meshPhysicalMaterial 
          color="#8B4513"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Backrest */}
      <mesh castShadow receiveShadow position={[0, 85, -20]}>
        <boxGeometry args={[45, 45, 5]} />
        <meshPhysicalMaterial 
          color="#8B4513"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Legs */}
      {[[-20, -20], [20, -20], [-20, 20], [20, 20]].map(([x, z], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 22.5, z]}>
          <cylinderGeometry args={[2, 2, 45]} />
          <meshPhysicalMaterial 
            color="#5D4037"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Modern Table Model
const TableModel: React.FC = () => {
  const tableRef = useRef<THREE.Group>(null);

  return (
    <group ref={tableRef}>
      {/* Table Top */}
      <mesh castShadow receiveShadow position={[0, 73, 0]}>
        <boxGeometry args={[150, 4, 90]} />
        <meshPhysicalMaterial 
          color="#5D4037"
          roughness={0.6}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Legs */}
      {[[-70, -40], [70, -40], [-70, 40], [70, 40]].map(([x, z], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 37.5, z]}>
          <boxGeometry args={[5, 75, 5]} />
          <meshPhysicalMaterial 
            color="#3E2723"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Modern Sofa Model
const SofaModel: React.FC = () => {
  const sofaRef = useRef<THREE.Group>(null);

  return (
    <group ref={sofaRef}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 20, 0]}>
        <boxGeometry args={[220, 40, 90]} />
        <meshPhysicalMaterial 
          color="#607D8B"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Backrest */}
      <mesh castShadow receiveShadow position={[0, 65, -35]}>
        <boxGeometry args={[220, 50, 20]} />
        <meshPhysicalMaterial 
          color="#607D8B"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Armrests */}
      {[-105, 105].map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 45, 0]}>
          <boxGeometry args={[10, 30, 90]} />
          <meshPhysicalMaterial 
            color="#607D8B"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Cushions */}
      {[-73.33, 0, 73.33].map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 45, 10]}>
          <boxGeometry args={[65, 15, 60]} />
          <meshPhysicalMaterial 
            color="#78909C"
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Legs */}
      {[[-105, -40], [105, -40], [-105, 40], [105, 40]].map(([x, z], i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 5, z]}>
          <cylinderGeometry args={[3, 3, 10]} />
          <meshPhysicalMaterial 
            color="#455A64"
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Modern Cabinet Model
const CabinetModel: React.FC = () => {
  const cabinetRef = useRef<THREE.Group>(null);

  return (
    <group ref={cabinetRef}>
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 90, 0]}>
        <boxGeometry args={[120, 180, 45]} />
        <meshPhysicalMaterial 
          color="#795548"
          roughness={0.7}
          metalness={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* Doors */}
      {[-30, 30].map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 90, 23]}>
          <boxGeometry args={[58, 176, 2]} />
          <meshPhysicalMaterial 
            color="#8D6E63"
            roughness={0.6}
            metalness={0.2}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>
      ))}

      {/* Handles */}
      {[-55, 55].map((x, i) => (
        <mesh key={i} castShadow receiveShadow position={[x, 90, 24]}>
          <cylinderGeometry args={[1, 1, 20]} rotation={[0, 0, Math.PI / 2]} />
          <meshPhysicalMaterial 
            color="#B0BEC5"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 5, 0]}>
        <boxGeometry args={[120, 10, 45]} />
        <meshPhysicalMaterial 
          color="#5D4037"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
};

// Main Furniture Component
export const Furniture: React.FC<{
  item: FurnitureItem;
  onClick: () => void;
  transformMode: 'translate' | 'rotate' | 'scale';
  onTransform: (event: any) => void;
}> = ({ item, onClick, transformMode, onTransform }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Add box helper for visualization when selected
  useHelper(item.selected ? groupRef : null, THREE.BoxHelper, 'white');

  const getFurnitureModel = () => {
    switch (item.type) {
      case 'chair':
        return <ChairModel />;
      case 'table':
        return <TableModel />;
      case 'sofa':
        return <SofaModel />;
      case 'cabinet':
        return <CabinetModel />;
      default:
        return null;
    }
  };

  return (
    <group
      ref={groupRef}
      position={[item.position.x, item.position.y, item.position.z]}
      rotation={[item.rotation.x, item.rotation.y, item.rotation.z]}
      scale={[item.scale, item.scale, item.scale]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default';
      }}
    >
      {getFurnitureModel()}
    </group>
  );
};

export default Furniture;