import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseAuthUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  role: 'academy' | 'teacher' | 'student';
  name: string;
  academyKey?: string;
  rollNumber?: string;
  batch?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, loginType?: 'academy' | 'student' | 'teacher', loginDetails?: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetches user profile details from respective tables after Supabase Auth login
  const fetchUserProfile = async (supabaseUser: SupabaseAuthUser) => {
    const userMetadata = supabaseUser.user_metadata;
    const role = userMetadata?.role;
    const academyKey = userMetadata?.academy_key;

    if (!role) {
      console.warn('User role not found in metadata. Logging out.');
      await supabase.auth.signOut(); // Force logout if role is missing
      setUser(null);
      return;
    }

    let profileData: any = null;
    let userName = supabaseUser.email || 'Unknown';

    try {
      if (role === 'academy') {
        const { data, error } = await supabase
          .from('academies')
          .select('*')
          .eq('user_id', supabaseUser.id)
          .single();
        if (error && error.code !== '42P01') { // Ignore table not found error
          console.error('Error fetching academy profile:', error);
          throw error;
        }
        profileData = data;
        userName = profileData?.name || supabaseUser.email || 'Academy Admin';
      } else if (role === 'teacher') {
        const { data, error } = await supabase
          .from('teachers')
          .select('*')
          .eq('email', supabaseUser.email) // Assuming email is unique and linked
          .eq('academy_id', academyKey)
          .single();
        if (error && error.code !== '42P01') {
          console.error('Error fetching teacher profile:', error);
          throw error;
        }
        profileData = data;
        userName = profileData?.name || supabaseUser.email || 'Teacher';
      } else if (role === 'student') {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('email', supabaseUser.email) // Assuming email is unique and linked
          .eq('academy_id', academyKey)
          .single();
        if (error && error.code !== '42P01') {
          console.error('Error fetching student profile:', error);
          throw error;
        }
        profileData = data;
        userName = profileData?.name || supabaseUser.email || 'Student';
      }

      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        role: role,
        name: userName,
        academyKey: academyKey,
        rollNumber: profileData?.roll_number,
        batch: profileData?.batch,
      });
    } catch (error) {
      console.error('Failed to fetch user profile after auth:', error);
      setUser(null); // Clear user if profile fetch fails
      await supabase.auth.signOut(); // Also sign out from Supabase Auth
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Check initial session on component mount
    const getInitialSession = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getInitialSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, loginType?: 'academy' | 'student' | 'teacher', loginDetails?: any) => {
    setLoading(true);
    try {
      // Handle demo credentials first (these bypass Supabase Auth)
      if (email === 'academy@demo.com' && password === 'demo123') {
        const mockUser: User = {
          id: '1',
          email,
          role: 'academy',
          name: 'SM TUTORIAL',
          academyKey: 'AC001'
        };
        setUser(mockUser);
        return;
      }
      
      // Student/Teacher demo login with DOB and Academy ID
      if (loginType === 'student' && loginDetails?.academyId.toUpperCase() === 'AC001' && 
          (loginDetails?.dateOfBirth === '01/01/1990' || loginDetails?.dateOfBirth === '1990-01-01') && 
          loginDetails?.studentId === 'STU2025009') {
        const mockUser: User = {
          id: 'student-demo',
          email: 'john.doe@ac001.com',
          role: 'student',
          name: 'John Doe',
          academyId: 'AC001'
        };
        setUser(mockUser);
        return;
      }
      
      if (loginType === 'teacher' && loginDetails?.academyId.toUpperCase() === 'AC001' && 
          (loginDetails?.dateOfBirth === '15/05/1985' || loginDetails?.dateOfBirth === '1985-05-15') && 
          loginDetails?.teacherId === 'TCH001') {
        const mockUser: User = {
          id: 'teacher-demo',
          email: 'sarah.wilson@ac001.com',
          role: 'teacher',
          name: 'Sarah Wilson',
          academyId: 'AC001'
        };
        setUser(mockUser);
        return;
      }

      // For actual database users, use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('Supabase login error:', error);
        throw new Error(error.message || 'Login failed');
      }

      if (data.user) {
        await fetchUserProfile(data.user);
      } else {
        throw new Error('No user data returned after login.');
      }
    } catch (error: any) {
      console.error('Login failed:', error.message);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const academyKey = generateSimpleAcademyKey();
      
      // 1. Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            role: 'academy',
            academy_key: academyKey,
            name: userData.name // Store name in metadata too
          },
          // emailRedirectTo: window.location.origin // Email confirmation is disabled
        }
      });

      if (authError) {
        console.error('Supabase Auth signup error:', authError);
        throw new Error(authError.message || 'Registration failed');
      }

      if (!authData.user) {
        throw new Error('No user returned from Supabase signup.');
      }

      // 2. Insert academy details into 'academies' table
      const { data: academyData, error: dbError } = await supabase
        .from('academies')
        .insert([{
          name: userData.name,
          email: userData.email,
          academy_key: academyKey,
          user_id: authData.user.id // Link to auth.users table
        }])
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error for academy:', dbError);
        // If DB insert fails, consider rolling back auth user or handling gracefully
        // For now, we'll just throw and let the user know.
        throw new Error(dbError.message || 'Failed to save academy details.');
      }

      if (academyData) {
        setUser({
          id: authData.user.id,
          email: authData.user.email || '',
          role: 'academy',
          name: academyData.name,
          academyKey: academyData.academy_key
        });
      }
    } catch (error: any) {
      console.error('Registration failed:', error.message);
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const generateSimpleAcademyKey = (): string => {
    const randomPart = Math.random().toString(36).substr(2, 4).toUpperCase();
    const timePart = Date.now().toString().slice(-4);
    return `AC${randomPart}${timePart}`;
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
