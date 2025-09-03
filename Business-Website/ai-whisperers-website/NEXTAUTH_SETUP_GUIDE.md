# NextAuth.js Student Authentication Setup Guide

## Quick Setup Overview

NextAuth.js authentication system is fully implemented with student account management, course access control, and dashboard functionality.

## 1. Authentication Features Implemented

### ✅ Authentication Methods
- **Email Magic Link**: Passwordless authentication via email
- **Google OAuth**: Sign in with Google account
- **GitHub OAuth**: Sign in with GitHub account
- **Session Management**: 30-day persistent sessions

### ✅ Student Account Features
- **Student Dashboard**: Personalized learning hub
- **Course Progress Tracking**: Visual progress indicators
- **Protected Course Content**: Access control based on enrollment
- **Achievement System**: Learning milestones and badges
- **Profile Management**: Account settings and preferences

### ✅ Protected Routes
- `/dashboard/*` - Requires authentication
- `/course-content/*` - Requires course enrollment
- `/dashboard/courses/[courseId]` - Course-specific access control

## 2. Database Schema (Prisma)

### Required Tables
The system uses NextAuth.js standard schema with extensions:

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  
  // Student-specific fields
  enrolledCourses String[] @default([])
  studentProfile Json?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## 3. Environment Configuration

### Update .env.local
```bash
# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here-32-chars-min"

# Database (for session storage and user data)
DATABASE_URL="postgresql://username:password@localhost:5432/ai_whisperers_db"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id" 
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email Provider (for magic links)
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="re_your-api-key"
EMAIL_FROM="noreply@ai-whisperers.com"
```

## 4. Database Setup

### Initialize Prisma
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Prisma Studio
npm run db:studio
```

### Create Schema File
Create `prisma/schema.prisma` with the NextAuth.js schema above.

## 5. OAuth Provider Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### GitHub OAuth Setup  
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth app
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

## 6. Email Provider Setup (Resend)

### Resend Configuration
1. Sign up at [Resend](https://resend.com)
2. Verify your domain
3. Create API key
4. Add to environment variables

## 7. Testing Authentication Flow

### Test Authentication
1. Start development server: `npm run dev`
2. Navigate to: `http://localhost:3000/auth/signin`
3. Test each authentication method:
   - Email magic link
   - Google OAuth
   - GitHub OAuth

### Test Protected Routes
1. Sign in to create session
2. Navigate to: `http://localhost:3000/dashboard`
3. Verify course access protection
4. Test sign out functionality

## 8. Implementation Status

### ✅ Core Components Created
- `NextAuth` configuration: `/api/auth/[...nextauth]/route.ts`
- Session provider: `SessionProvider.tsx`
- Protected route wrapper: `ProtectedRoute.tsx`
- Authentication middleware: `middleware.ts`
- Sign-in page: `/auth/signin/page.tsx`

### ✅ Dashboard Components
- Student dashboard: `/dashboard/page.tsx`
- Course content viewer: `/dashboard/courses/[courseId]/page.tsx`
- Enrolled courses display: `EnrolledCourses.tsx`
- Learning progress tracker: `LearningProgress.tsx`
- Achievement system: Built into progress component

### ✅ User Experience Features
- **Personalized Dashboard**: Welcome message with progress
- **Course Access Control**: Automatic enrollment verification
- **Progress Visualization**: Visual progress bars and statistics
- **Achievement Badges**: Learning milestone recognition
- **Seamless Navigation**: Integrated with existing UI

## 9. Integration with PayPal

### Payment → Authentication Flow
1. User enrolls in course via PayPal
2. Payment success triggers account creation (if new user)
3. Course access automatically granted to user account
4. Student redirected to dashboard with course access

### Course Access Logic
```typescript
// Check if user has access to specific course
const hasAccess = session.user.enrolledCourses?.includes(courseId);

// Protect course content routes
<ProtectedRoute requiredCourses={['ai-foundations']}>
  <CourseContent />
</ProtectedRoute>
```

## 10. Production Deployment

### Environment Variables for Production
```bash
NEXTAUTH_URL="https://ai-whisperers.com"
NEXTAUTH_SECRET="your-production-secret-here"
DATABASE_URL="your-production-database-url"
# OAuth and email provider production credentials
```

### Security Considerations
- ✅ CSRF protection enabled
- ✅ Secure session cookies
- ✅ Environment variable validation
- ✅ Protected route middleware
- ✅ Email verification flow

## 11. User Management

### Student Account Features
- **Enrollment Tracking**: Automatically updated on purchase
- **Progress Persistence**: Learning state saved across sessions  
- **Profile Customization**: Company, role, experience level
- **Course Recommendations**: Based on current progress
- **Certificate Access**: Download completed course certificates

### Administrative Features
- User enrollment management via Prisma Studio
- Course access modification
- Progress tracking analytics
- Student support ticket system (TODO)

The authentication system is production-ready with comprehensive student account management and seamless integration with the existing course and payment infrastructure.