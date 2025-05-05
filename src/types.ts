export interface Designer {
  id: string;
  username: string;
  name: string;
  email: string;
}

export type AuthState = {
  designer: Designer | null;
  isAuthenticated: boolean;
};

export interface Room {
  id: string;
  name: string;
  width: number;
  length: number;
  height: number;
  shape: 'rectangular' | 'L-shaped' | 'custom';
  colorScheme: {
    walls: string;
    floor: string;
    ceiling: string;
  };
}

export interface FurnitureItem {
  id: string;
  type: 'chair' | 'table' | 'sofa' | 'cabinet' | 'other';
  name: string;
  width: number;
  depth: number;
  height: number;
  color: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: number;
  selected: boolean;
  modelPath?: string;
}

export interface Design {
  id: string;
  name: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
  designerId: string;
  furniture: FurnitureItem[];
}

export interface ViewMode {
  mode: '2d' | '3d';
}