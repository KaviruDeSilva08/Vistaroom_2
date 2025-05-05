import { create } from 'zustand';
import { AuthState, Designer } from '../types';

// Mock designers data (would connect to a backend in production)
const mockDesigners = [
  {
    id: '1',
    username: 'sarah.designer',
    password: 'FurnishPro2025!', // In a real app, this would be hashed and not stored client-side
    name: 'Sarah Anderson',
    email: 'sarah.anderson@furnishvision.com',
  },
  {
    id: '2',
    username: 'michael.designer',
    password: 'DesignMaster2025!',
    name: 'Michael Chen',
    email: 'michael.chen@furnishvision.com',
  },
];

export const useAuthStore = create<AuthState & {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}>((set) => ({
  designer: null,
  isAuthenticated: false,
  
  login: async (username: string, password: string) => {
    // In a real app, this would make an API call to verify credentials
    const designer = mockDesigners.find(
      (d) => d.username === username && d.password === password
    );
    
    if (designer) {
      // Remove password before storing
      const { password: _, ...designerData } = designer;
      
      set({
        designer: designerData as Designer,
        isAuthenticated: true,
      });
      
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({
      designer: null,
      isAuthenticated: false,
    });
  },
}));