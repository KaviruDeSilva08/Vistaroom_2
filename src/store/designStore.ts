import { create } from 'zustand';
import { Design, FurnitureItem, Room, ViewMode } from '../types';

interface DesignState {
  rooms: Room[];
  currentRoom: Room | null;
  designs: Design[];
  currentDesign: Design | null;
  viewMode: ViewMode;
  
  // Room actions
  setCurrentRoom: (room: Room) => void;
  addRoom: (room: Room) => void;
  updateRoom: (room: Room) => void;
  
  // Design actions
  setCurrentDesign: (design: Design) => void;
  createDesign: (name: string, roomId: string, designerId: string) => void;
  saveDesign: () => void;
  
  // Furniture actions
  addFurniture: (item: FurnitureItem) => void;
  updateFurniture: (id: string, updates: Partial<FurnitureItem>) => void;
  removeFurniture: (id: string) => void;
  selectFurniture: (id: string) => void;
  clearSelection: () => void;
  
  // View mode
  toggleViewMode: () => void;
}

// Mock initial data
const initialRooms: Room[] = [
  {
    id: 'room1',
    name: 'Living Room',
    width: 500,
    length: 400,
    height: 280,
    shape: 'rectangular',
    colorScheme: {
      walls: '#f5f5f5',
      floor: '#d7ccc8',
      ceiling: '#ffffff',
    },
  },
];

export const useDesignStore = create<DesignState>((set) => ({
  rooms: initialRooms,
  currentRoom: initialRooms[0],
  designs: [],
  currentDesign: null,
  viewMode: { mode: '2d' },
  
  setCurrentRoom: (room) => set({ currentRoom: room }),
  
  addRoom: (room) => set((state) => ({
    rooms: [...state.rooms, { ...room, id: `room${state.rooms.length + 1}` }],
  })),
  
  updateRoom: (room) => set((state) => ({
    rooms: state.rooms.map((r) => (r.id === room.id ? room : r)),
    currentRoom: state.currentRoom?.id === room.id ? room : state.currentRoom,
  })),
  
  setCurrentDesign: (design) => set({ currentDesign: design }),
  
  createDesign: (name, roomId, designerId) => set((state) => {
    const newDesign: Design = {
      id: `design${state.designs.length + 1}`,
      name,
      roomId,
      designerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      furniture: [],
    };
    
    return {
      designs: [...state.designs, newDesign],
      currentDesign: newDesign,
    };
  }),
  
  saveDesign: () => set((state) => {
    if (!state.currentDesign) return state;
    
    const updatedDesign = {
      ...state.currentDesign,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      designs: state.designs.map((d) => 
        d.id === updatedDesign.id ? updatedDesign : d
      ),
      currentDesign: updatedDesign,
    };
  }),
  
  addFurniture: (item) => set((state) => {
    if (!state.currentDesign) return state;
    
    const updatedDesign = {
      ...state.currentDesign,
      furniture: [...state.currentDesign.furniture, item],
      updatedAt: new Date().toISOString(),
    };
    
    return {
      designs: state.designs.map((d) => 
        d.id === updatedDesign.id ? updatedDesign : d
      ),
      currentDesign: updatedDesign,
    };
  }),
  
  updateFurniture: (id, updates) => set((state) => {
    if (!state.currentDesign) return state;
    
    const updatedFurniture = state.currentDesign.furniture.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    
    const updatedDesign = {
      ...state.currentDesign,
      furniture: updatedFurniture,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      designs: state.designs.map((d) => 
        d.id === updatedDesign.id ? updatedDesign : d
      ),
      currentDesign: updatedDesign,
    };
  }),
  
  removeFurniture: (id) => set((state) => {
    if (!state.currentDesign) return state;
    
    const updatedFurniture = state.currentDesign.furniture.filter(
      (item) => item.id !== id
    );
    
    const updatedDesign = {
      ...state.currentDesign,
      furniture: updatedFurniture,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      designs: state.designs.map((d) => 
        d.id === updatedDesign.id ? updatedDesign : d
      ),
      currentDesign: updatedDesign,
    };
  }),
  
  selectFurniture: (id) => set((state) => {
    if (!state.currentDesign) return state;
    
    const updatedFurniture = state.currentDesign.furniture.map((item) => ({
      ...item,
      selected: item.id === id,
    }));
    
    const updatedDesign = {
      ...state.currentDesign,
      furniture: updatedFurniture,
    };
    
    return {
      currentDesign: updatedDesign,
    };
  }),
  
  clearSelection: () => set((state) => {
    if (!state.currentDesign) return state;
    
    const updatedFurniture = state.currentDesign.furniture.map((item) => ({
      ...item,
      selected: false,
    }));
    
    const updatedDesign = {
      ...state.currentDesign,
      furniture: updatedFurniture,
    };
    
    return {
      currentDesign: updatedDesign,
    };
  }),
  
  toggleViewMode: () => set((state) => ({
    viewMode: {
      mode: state.viewMode.mode === '2d' ? '3d' : '2d',
    },
  })),
}));