import { createContext, useContext, useState, type ReactNode } from 'react';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  weight: number;
  photo: string;
  conditions: string;
}

interface Walk {
  id: number;
  petId: number;
  petName: string;
  ownerName: string;
  ownerAvatar: string;
  walkerName?: string;
  walkerAvatar?: string;
  date: string;
  time: string;
  duration: string;
  route: string;
  price: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
}

interface AppContextType {
  pets: Pet[];
  walks: Walk[];
  addPet: (pet: Omit<Pet, 'id'>) => void;
  removePet: (id: number) => void;
  addWalk: (walk: Omit<Walk, 'id'>) => void;
  acceptWalk: (walkId: number, walkerName: string, walkerAvatar: string) => void;
  completeWalk: (walkId: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

const initialPets: Pet[] = [
  {
    id: 1,
    name: 'Max',
    breed: 'Labrador',
    age: 3,
    weight: 30,
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
    conditions: 'Ninguna',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Golden Retriever',
    age: 2,
    weight: 25,
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop',
    conditions: 'Alergia a ciertos alimentos',
  },
];

const initialWalks: Walk[] = [
  {
    id: 1,
    petId: 1,
    petName: 'Max',
    ownerName: 'Carlos Ruiz',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    walkerName: 'María García',
    walkerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    date: '2026-08-27',
    time: '16:00',
    duration: '45 min',
    route: 'Parque Central',
    price: 3000,
    status: 'confirmed',
  },
  {
    id: 2,
    petId: 2,
    petName: 'Luna',
    ownerName: 'Carlos Ruiz',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    date: '2026-08-28',
    time: '10:00',
    duration: '30 min',
    route: 'Barrio Norte',
    price: 2500,
    status: 'pending',
  },
  {
    id: 3,
    petId: 1,
    petName: 'Max',
    ownerName: 'Carlos Ruiz',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    walkerName: 'Juan López',
    walkerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    date: '2026-08-29',
    time: '17:30',
    duration: '60 min',
    route: 'Residencial Sur',
    price: 4000,
    status: 'pending',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [walks, setWalks] = useState<Walk[]>(initialWalks);

  const addPet = (pet: Omit<Pet, 'id'>) => {
    setPets(prev => [...prev, { ...pet, id: Date.now() }]);
  };

  const removePet = (id: number) => {
    setPets(prev => prev.filter(p => p.id !== id));
  };

  const addWalk = (walk: Omit<Walk, 'id'>) => {
    setWalks(prev => [...prev, { ...walk, id: Date.now() }]);
  };

  const acceptWalk = (walkId: number, walkerName: string, walkerAvatar: string) => {
    setWalks(prev => prev.map(w =>
      w.id === walkId
        ? { ...w, walkerName, walkerAvatar, status: 'confirmed' }
        : w
    ));
  };

  const completeWalk = (walkId: number) => {
    setWalks(prev => prev.map(w =>
      w.id === walkId ? { ...w, status: 'completed' } : w
    ));
  };

  return (
    <AppContext.Provider value={{ pets, walks, addPet, removePet, addWalk, acceptWalk, completeWalk }}>
      {children}
    </AppContext.Provider>
  );
}
