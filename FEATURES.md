# Auxilium Consult - Admin & Client Portal Features

## Overview
Complete backend infrastructure for managing business advisory operations, client relationships, and investment facilitation projects.

## Authentication System
- **NextAuth.js v4.24.12** with JWT sessions
- **Role-based access control**: ADMIN and CLIENT roles
- **Two login portals**:
  - Admin Sign-in: `/auth/admin-signin`
  - Client Sign-in: `/auth/signin`
- **Password Security**: bcryptjs with 12 salt rounds
- **Route Protection**: Middleware enforces authentication on all protected routes

### Demo Credentials
- **Admin**: admin@auxiliumconsult.com / Admin@2025
- **Demo Client**: demo@example.com / Demo@2025

## Database Architecture
**Prisma ORM** with SQLite (development) - 11 Models:

### Core Models
1. **User** - Authentication credentials (ADMIN/CLIENT)
2. **Client** - Company profiles with engagement status
3. **Project** - Investment projects with 5-stage workflow
4. **ProjectUpdate** - Timeline entries for project progress
5. **Milestone** - Task tracking with completion dates
6. **Document** - File management by category
7. **Message** - Client-admin communication system
8. **Note** - Internal admin notes on clients
9. **ActivityLog** - Audit trail for all operations

### Project Workflow Stages
1. **Intake** - Initial assessment and onboarding
2. **Due Diligence** - Document review and verification
3. **Investor Engagement** - Matching with funding sources
4. **Funding** - Deal structuring and closing
5. **Post-Funding** - Ongoing support and monitoring

## Admin Portal Features

### Dashboard (`/admin/dashboard`)
- **Live Statistics**:
  - Total clients count
  - Active projects count
  - Total funding facilitated
  - Pending messages count
- **Quick Actions**: Add client, create project, upload documents
- **Navigation Grid**: Access all management modules
- **Recent Activity Feed**: Real-time system notifications

### Client Management (`/admin/clients`)
- **Client Directory**: Searchable table with all clients
- **Filter Options**: By engagement status (INQUIRY, QUALIFIED, ENGAGED, ACTIVE, COMPLETED, INACTIVE)
- **Client Details**: Company name, contact person, sector, email, phone
- **Engagement Tracking**: Status and engagement date
- **Quick Actions**: View details, edit, manage projects

### Project Management (`/admin/projects`)
- **Projects Grid**: Visual cards with project overview
- **Search & Filter**: By project name, client, or status
- **Status Types**: ACTIVE, ON_HOLD, COMPLETED, CANCELLED
- **Funding Progress**: Visual progress bars and percentage
- **Project Details Page** (`/admin/projects/[id]`):
  - Overview section (sector, dates, status)
  - Funding metrics (required vs secured)
  - Milestone tracking with checkboxes
  - Project timeline with stage indicators
  - Client information sidebar
  - 5-stage workflow progress tracker

### Document Management (`/admin/documents`)
- **All Documents Table**: Sortable and filterable
- **File Information**: Name, type, size, upload date
- **Project Association**: Linked to specific projects/clients
- **File Type Filters**: PDF, Word, Excel, Images
- **Actions**: Download and delete documents
- **Visual Indicators**: File type icons

### Messaging Center (`/admin/messages`)
- **Inbox View**: All client messages in chronological order
- **Unread Filter**: Separate view for unread messages
- **Message Detail**: Full message viewing panel
- **Read Status**: Auto-mark as read when opened
- **Quick Actions**: View client profile, reply
- **Message Counts**: Badge showing unread count

## Client Portal Features

### Dashboard (`/client/dashboard`)
- **Welcome Section**: Personalized greeting with company name
- **Quick Stats**:
  - Active projects count
  - Total documents available
  - Unread messages count
- **Project Cards**: Visual grid of all projects
- **Project Information**:
  - Funding progress bars
  - Current stage indicators
  - Status badges
  - Key dates
- **5-Stage Progress**: Visual workflow tracker for each project
- **Quick Links**: Documents, messages, support

### Document Access (`/client/documents`)
- **Document Library**: Grid view of all accessible files
- **Project Categorization**: Documents organized by project
- **Search Function**: Find documents quickly
- **File Details**: Name, size, upload date, project
- **Download Access**: One-click document downloads
- **Visual Cards**: File type icons and metadata

### Messaging (`/client/messages`)
- **Inbox**: All messages from Auxilium Consult team
- **Compose Message**: Send inquiries to admin
- **Message Thread**: View conversation history
- **Subject & Content**: Structured messaging format
- **Send Function**: Direct communication with advisory team
- **Message History**: Chronological message list

## API Endpoints

### Admin Endpoints
- `GET /api/admin/dashboard-stats` - Dashboard metrics
- `GET /api/admin/clients` - All clients list
- `GET /api/admin/projects` - All projects list
- `GET /api/admin/projects/[id]` - Project details
- `GET /api/admin/documents` - All documents
- `GET /api/admin/messages` - All client messages
- `POST /api/admin/messages/[id]/read` - Mark message as read

### Client Endpoints
- `GET /api/client/dashboard` - Client-specific data
- `GET /api/client/documents` - Client's documents
- `GET /api/client/messages` - Client's messages
- `POST /api/client/messages` - Send new message

### Authentication Endpoints
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Current session

## Technology Stack

### Core Framework
- **Next.js 15.5.6** - App Router with React Server Components
- **TypeScript** - Full type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Backend
- **Prisma ORM** - Database management
- **NextAuth.js** - Authentication
- **bcryptjs** - Password hashing
- **SQLite** - Development database (ready for PostgreSQL)

### Frontend
- **React 19** - Latest React features
- **next-auth/react** - Client-side session hooks
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components

## Security Features

### Authentication
- Secure password hashing (bcrypt, 12 rounds)
- JWT session tokens
- HTTP-only cookies
- CSRF protection

### Authorization
- Role-based access control
- Route-level protection
- API endpoint authentication
- Client data isolation

### Data Protection
- Cascade delete on relationships
- Activity logging for auditing
- Session management
- Secure credential storage

## Database Schema Highlights

### User & Client Relationship
- One-to-one mapping between User and Client
- Separate authentication from business data
- Role-based permissions

### Project Tracking
- Client-to-Project: One-to-Many
- Project stages with enum validation
- Funding metrics with precision tracking
- Status workflow enforcement

### Document Management
- Optional client/project association
- Category-based organization
- File metadata storage
- Upload tracking

### Messaging System
- Bidirectional communication (CLIENT/ADMIN)
- Read status tracking
- Thread organization
- Sender identification

## Next Steps (Future Enhancements)

### Phase 2 - CRUD Operations
- [ ] Add/Edit Client forms
- [ ] Create/Update Project forms
- [ ] Document upload functionality
- [ ] Message reply system
- [ ] Bulk operations

### Phase 3 - Advanced Features
- [ ] File upload with AWS S3/Cloudinary
- [ ] Email notifications
- [ ] Report generation (PDF exports)
- [ ] Advanced analytics dashboard
- [ ] Calendar integration
- [ ] Real-time notifications

### Phase 4 - Production Ready
- [ ] PostgreSQL migration
- [ ] Environment configuration
- [ ] Backup systems
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing

## File Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/page.tsx       # Admin main dashboard
│   │   ├── clients/page.tsx         # Client management
│   │   ├── projects/
│   │   │   ├── page.tsx            # Projects list
│   │   │   └── [id]/page.tsx       # Project details
│   │   ├── documents/page.tsx       # Document management
│   │   └── messages/page.tsx        # Message center
│   ├── client/
│   │   ├── dashboard/page.tsx       # Client main view
│   │   ├── documents/page.tsx       # Document library
│   │   └── messages/page.tsx        # Client messaging
│   ├── auth/
│   │   ├── admin-signin/page.tsx    # Admin login
│   │   └── signin/page.tsx          # Client login
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # NextAuth config
│       ├── admin/                   # Admin endpoints
│       └── client/                  # Client endpoints
├── lib/
│   └── prisma.ts                    # Prisma client
├── types/
│   └── next-auth.d.ts              # TypeScript declarations
└── middleware.ts                    # Route protection

prisma/
├── schema.prisma                    # Database schema
└── seed.ts                         # Demo data seed
```

## Running the Application

### Development Server
```bash
npm run dev
```
Access at: http://localhost:3000

### Database Commands
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with demo data
npx prisma db seed

# View database in Prisma Studio
npx prisma studio
```

### Access Points
- **Main Website**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin/dashboard
- **Client Portal**: http://localhost:3000/client/dashboard
- **Admin Login**: http://localhost:3000/auth/admin-signin
- **Client Login**: http://localhost:3000/auth/signin

## Key Features Summary

✅ **Authentication** - Secure login for admins and clients  
✅ **Dashboard Analytics** - Real-time business metrics  
✅ **Client Management** - Complete CRM functionality  
✅ **Project Tracking** - 5-stage workflow management  
✅ **Document System** - Organized file management  
✅ **Messaging** - Bidirectional communication  
✅ **Role-Based Access** - Secure permission system  
✅ **Responsive Design** - Works on all devices  
✅ **Type Safety** - Full TypeScript coverage  
✅ **Database Integrity** - Prisma ORM with relations  

## Support
For questions or issues, contact the Auxilium Consult development team.
