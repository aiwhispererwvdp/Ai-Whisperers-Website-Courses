import type { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      provider: string;
      enrolledCourses?: string[];
      studentProfile?: {
        experience: string;
        company?: string;
        role?: string;
        goals?: string;
      };
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    provider: string;
    enrolledCourses?: string[];
    studentProfile?: {
      experience: string;
      company?: string;
      role?: string;
      goals?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    provider: string;
    enrolledCourses?: string[];
    studentProfile?: {
      experience: string;
      company?: string;
      role?: string;
      goals?: string;
    };
  }
}