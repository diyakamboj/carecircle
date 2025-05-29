import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Dr. Emily Johnson',
    company: 'Maternity Care Center',
    role: 'Obstetrician',
    verified: true,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Nurse Sarah Brown',
    company: 'Maternity Care Center',
    role: 'Registered Nurse',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dr. Michael Smith',
    company: 'Maternity Care Center',
    role: 'Pediatrician',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Nurse Laura White',
    company: 'Maternity Care Center',
    role: 'Midwife',
    verified: true,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Dr. Olivia Green',
    company: 'Maternity Care Center',
    role: 'Gynecologist',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'Nurse James Brown',
    company: 'Maternity Care Center',
    role: 'Nurse Practitioner',
    verified: true,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Dr. Emma Wilson',
    company: 'Maternity Care Center',
    role: 'Neonatologist',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Nurse David Smith',
    company: 'Maternity Care Center',
    role: 'Labor and Delivery Nurse',
    verified: true,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Dr. Robert Taylor',
    company: 'Maternity Care Center',
    role: 'Maternal-Fetal Medicine Specialist',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Nurse Alice Johnson',
    company: 'Maternity Care Center',
    role: 'Postpartum Nurse',
    verified: true,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Patient = {
  id: number;
  name: string;
  country: string;
  city: string;
  age: number;
  email: string;
  weeks_of_pregnancy: number;
  phone_number: string;
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export type ChatSession = {
  session_id: number;
  agent_name: string;
  customer_name: string;
  date_started: string;
  date_ended: string | null;
  status: 'Awaiting' | 'Active' | 'Completed';
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Recommendations',
    url: '/dashboard/recommendations',
    icon: 'lightbulb',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Inbox',
    url: '/dashboard/inbox',
    icon: 'inbox',
    shortcut: ['i', 'i'],
    isActive: false,
    items: [] // No child items
  }
  /*
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
  */
];
