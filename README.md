# Class Captain - Coaching Institute Management System

A comprehensive web application for managing coaching institutes with separate dashboards for academy admins, teachers, and students.

## 🚀 Features

### Academy Admin Dashboard
- **Student Management**: Add, edit, and manage student records
- **Teacher Management**: Manage teaching staff and assignments
- **Batch Management**: Create and organize student batches
- **Attendance Tracking**: Real-time attendance monitoring with detailed reports
- **Grade Management**: Track student performance and exam results
- **Fee Management**: Monitor tuition fees and payments
- **Reports & Analytics**: Comprehensive reporting system

### Teacher Dashboard
- **Batch Overview**: View assigned batches and schedules
- **Attendance Management**: Mark attendance for students
- **Grade Entry**: Record student grades and assessments
- **Student Progress**: Track individual student performance

### Student Dashboard
- **Personal Profile**: View personal information and academy details
- **Attendance Records**: Check attendance history and statistics
- **Grade Reports**: View exam results and performance metrics
- **Academy Information**: Access academy announcements and updates

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom animations
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom role-based authentication
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Modern web browser

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd class-captain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Run the migration files in order from the `supabase/migrations` folder
   - Ensure Row Level Security (RLS) is enabled

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔐 Demo Credentials

### Academy Admin
- **Email**: `academy@demo.com`
- **Password**: `demo123`

### Student Login
- **Academy ID**: `AC001`
- **Date of Birth**: `01/01/1990`

### Teacher Login
- **Academy ID**: `AC001`
- **Date of Birth**: `15/05/1985`

## 🗄️ Database Schema

### Tables
- **academies**: Academy information and credentials
- **students**: Student records and personal information
- **teachers**: Teacher profiles and subjects
- **batches**: Class batches and schedules
- **attendance**: Daily attendance records
- **grades**: Student grades and exam results

### Key Relationships
- Students belong to academies via `academy_id`
- Teachers are assigned to academies
- Batches are created by academies and assigned to teachers
- Attendance and grades link students to specific batches

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts and add environment variables

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Role-based Authentication**: Separate access levels for different user types
- **Input Validation**: Form validation and sanitization
- **Secure API Endpoints**: Protected database operations

## 📱 Responsive Design

- **Mobile-first approach**: Optimized for all screen sizes
- **Touch-friendly interface**: Easy navigation on mobile devices
- **Progressive Web App ready**: Can be installed on mobile devices

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark Mode Support**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion powered transitions
- **Intuitive Navigation**: Easy-to-use dashboard layouts
- **Loading States**: Proper loading indicators throughout the app

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Structure
```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── lib/               # Utility functions and configurations
├── pages/             # Main page components
└── styles/            # Global styles and Tailwind config
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added attendance management system
- **v1.2.0**: Enhanced student dashboard with mobile design
- **v1.3.0**: Production-ready deployment with all features

---

**Class Captain** - Empowering Education Through Technology 🎓
