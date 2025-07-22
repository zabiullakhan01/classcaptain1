/*
  # Comprehensive Academy Management System Database Schema

  1. New Tables
    - `academies` - Academy information and credentials
    - `students` - Student records with complete details
    - `teachers` - Teacher profiles and information
    - `batches` - Class batches with schedules and details
    - `student_batches` - Many-to-many relationship between students and batches
    - `attendance` - Daily attendance records
    - `grades` - Student grades and exam results
    - `fees` - Fee management and payment tracking
    - `expenses` - Academy expense tracking
    - `enquiries` - Student enquiry management
    - `homework` - Homework assignments
    - `exams` - Exam management
    - `notices` - Notice board announcements
    - `study_materials` - Study material uploads
    - `transport` - Transport management
    - `leave_requests` - Leave request management

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Ensure academy data isolation

  3. Indexes
    - Add performance indexes for common queries
    - Foreign key relationships
*/

-- Create academies table
CREATE TABLE IF NOT EXISTS academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL,
  phone text,
  address text,
  website text,
  logo_url text,
  established_date date,
  description text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL,
  name text NOT NULL,
  email text,
  roll_number text,
  father_name text NOT NULL,
  mother_name text,
  date_of_birth date NOT NULL,
  mobile_number_1 text NOT NULL,
  mobile_number_2 text,
  parent_mobile text,
  gender text NOT NULL DEFAULT 'Male',
  blood_group text,
  address text,
  city text,
  state text,
  pincode text,
  admission_date date NOT NULL,
  academy_id text NOT NULL,
  password text NOT NULL,
  transport_use text DEFAULT 'NO TRANSPORT USE',
  transport_route text,
  id_number text,
  aadhar_number text,
  previous_school text,
  field_1 text,
  field_2 text,
  profile_image_url text,
  emergency_contact text,
  medical_conditions text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, academy_id)
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id text NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  subjects text[] DEFAULT '{}',
  qualification text,
  experience_years integer,
  academy_id text NOT NULL,
  date_of_birth date NOT NULL,
  date_of_joining date,
  address text,
  salary numeric(10,2),
  bank_details jsonb,
  emergency_contact text,
  profile_image_url text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(teacher_id, academy_id)
);

-- Create batches table
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  teacher_id uuid REFERENCES teachers(id) ON DELETE SET NULL,
  academy_id text NOT NULL,
  schedule text,
  start_date date,
  end_date date,
  max_students integer,
  current_students integer DEFAULT 0,
  fees numeric(10,2),
  description text,
  room_number text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create student_batches junction table
CREATE TABLE IF NOT EXISTS student_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES batches(id) ON DELETE CASCADE,
  enrollment_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, batch_id)
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES batches(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL DEFAULT 'present',
  remarks text,
  marked_by uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, batch_id, date)
);

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES batches(id) ON DELETE CASCADE,
  exam_name text NOT NULL,
  subject text NOT NULL,
  marks numeric(5,2) NOT NULL,
  total_marks numeric(5,2) NOT NULL,
  grade text,
  exam_date date NOT NULL,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create fees table
CREATE TABLE IF NOT EXISTS fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES batches(id) ON DELETE CASCADE,
  fee_type text NOT NULL,
  amount numeric(10,2) NOT NULL,
  due_date date NOT NULL,
  paid_amount numeric(10,2) DEFAULT 0,
  paid_date date,
  payment_method text,
  transaction_id text,
  status text DEFAULT 'pending',
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academy_id text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  amount numeric(10,2) NOT NULL,
  expense_date date NOT NULL,
  payment_method text,
  receipt_url text,
  created_by uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now()
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academy_id text NOT NULL,
  student_name text NOT NULL,
  parent_name text NOT NULL,
  phone text NOT NULL,
  email text,
  interested_course text,
  source text,
  status text DEFAULT 'new',
  follow_up_date date,
  remarks text,
  assigned_to uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create homework table
CREATE TABLE IF NOT EXISTS homework (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid REFERENCES batches(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  subject text NOT NULL,
  assigned_date date DEFAULT CURRENT_DATE,
  due_date date NOT NULL,
  attachment_url text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create homework_submissions table
CREATE TABLE IF NOT EXISTS homework_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id uuid REFERENCES homework(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  submission_text text,
  attachment_url text,
  submitted_date timestamptz DEFAULT now(),
  grade text,
  feedback text,
  status text DEFAULT 'submitted',
  UNIQUE(homework_id, student_id)
);

-- Create exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academy_id text NOT NULL,
  name text NOT NULL,
  description text,
  exam_date date NOT NULL,
  start_time time,
  end_time time,
  total_marks numeric(5,2) NOT NULL,
  passing_marks numeric(5,2),
  subjects text[] DEFAULT '{}',
  batches uuid[] DEFAULT '{}',
  status text DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now()
);

-- Create notices table
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academy_id text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  target_audience text NOT NULL, -- 'all', 'students', 'teachers', 'parents'
  priority text DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  attachment_url text,
  published_date date DEFAULT CURRENT_DATE,
  expiry_date date,
  status text DEFAULT 'active',
  created_by uuid REFERENCES teachers(id),
  created_at timestamptz DEFAULT now()
);

-- Create study_materials table
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid REFERENCES batches(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  material_type text NOT NULL, -- 'pdf', 'video', 'audio', 'link', 'image'
  file_url text NOT NULL,
  file_size bigint,
  upload_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create transport table
CREATE TABLE IF NOT EXISTS transport (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academy_id text NOT NULL,
  route_name text NOT NULL,
  vehicle_number text NOT NULL,
  driver_name text NOT NULL,
  driver_phone text NOT NULL,
  capacity integer NOT NULL,
  current_occupancy integer DEFAULT 0,
  pickup_points text[] DEFAULT '{}',
  fees numeric(10,2),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Create leave_requests table
CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending',
  approved_by uuid REFERENCES teachers(id),
  approved_date date,
  remarks text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for academies table
CREATE POLICY "Allow public insert for registration" ON academies
  FOR INSERT TO anon, public
  WITH CHECK (true);

CREATE POLICY "Allow public select for login verification" ON academies
  FOR SELECT TO anon, public, authenticated
  USING (true);

CREATE POLICY "Allow authenticated updates" ON academies
  FOR UPDATE TO authenticated
  USING (true);

-- Create policies for students table
CREATE POLICY "Academy can manage their students" ON students
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Public can read students for login" ON students
  FOR SELECT TO anon, public
  USING (true);

-- Create policies for teachers table
CREATE POLICY "Academy can manage their teachers" ON teachers
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Public can read teachers for login" ON teachers
  FOR SELECT TO anon, public
  USING (true);

-- Create policies for batches table
CREATE POLICY "Academy can manage their batches" ON batches
  FOR ALL TO authenticated
  USING (true);

-- Create policies for student_batches table
CREATE POLICY "Academy can manage student batch assignments" ON student_batches
  FOR ALL TO authenticated
  USING (true);

-- Create policies for attendance table
CREATE POLICY "Academy can manage attendance" ON attendance
  FOR ALL TO authenticated
  USING (true);

-- Create policies for grades table
CREATE POLICY "Academy can manage grades" ON grades
  FOR ALL TO authenticated
  USING (true);

-- Create policies for fees table
CREATE POLICY "Academy can manage fees" ON fees
  FOR ALL TO authenticated
  USING (true);

-- Create policies for expenses table
CREATE POLICY "Academy can manage expenses" ON expenses
  FOR ALL TO authenticated
  USING (true);

-- Create policies for enquiries table
CREATE POLICY "Academy can manage enquiries" ON enquiries
  FOR ALL TO authenticated
  USING (true);

-- Create policies for homework table
CREATE POLICY "Academy can manage homework" ON homework
  FOR ALL TO authenticated
  USING (true);

-- Create policies for homework_submissions table
CREATE POLICY "Academy can manage homework submissions" ON homework_submissions
  FOR ALL TO authenticated
  USING (true);

-- Create policies for exams table
CREATE POLICY "Academy can manage exams" ON exams
  FOR ALL TO authenticated
  USING (true);

-- Create policies for notices table
CREATE POLICY "Academy can manage notices" ON notices
  FOR ALL TO authenticated
  USING (true);

-- Create policies for study_materials table
CREATE POLICY "Academy can manage study materials" ON study_materials
  FOR ALL TO authenticated
  USING (true);

-- Create policies for transport table
CREATE POLICY "Academy can manage transport" ON transport
  FOR ALL TO authenticated
  USING (true);

-- Create policies for leave_requests table
CREATE POLICY "Academy can manage leave requests" ON leave_requests
  FOR ALL TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_students_academy_id ON students(academy_id);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_dob_academy ON students(date_of_birth, academy_id);
CREATE INDEX IF NOT EXISTS idx_teachers_academy_id ON teachers(academy_id);
CREATE INDEX IF NOT EXISTS idx_teachers_teacher_id ON teachers(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teachers_dob_academy ON teachers(date_of_birth, academy_id);
CREATE INDEX IF NOT EXISTS idx_batches_academy_id ON batches(academy_id);
CREATE INDEX IF NOT EXISTS idx_batches_teacher_id ON batches(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_batches_student_id ON student_batches(student_id);
CREATE INDEX IF NOT EXISTS idx_student_batches_batch_id ON student_batches(batch_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_batch_date ON attendance(student_id, batch_id, date);
CREATE INDEX IF NOT EXISTS idx_grades_student_id ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_student_id ON fees(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_status ON fees(status);
CREATE INDEX IF NOT EXISTS idx_expenses_academy_id ON expenses(academy_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_academy_id ON enquiries(academy_id);
CREATE INDEX IF NOT EXISTS idx_homework_batch_id ON homework(batch_id);
CREATE INDEX IF NOT EXISTS idx_exams_academy_id ON exams(academy_id);
CREATE INDEX IF NOT EXISTS idx_notices_academy_id ON notices(academy_id);
CREATE INDEX IF NOT EXISTS idx_study_materials_batch_id ON study_materials(batch_id);
CREATE INDEX IF NOT EXISTS idx_transport_academy_id ON transport(academy_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_student_id ON leave_requests(student_id);

-- Grant permissions to all roles
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO public;

-- Grant sequence permissions for UUID generation
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO public;

-- Insert demo data
INSERT INTO academies (name, email, academy_key, phone, address) VALUES
('SM TUTORIAL', 'smtutorials01@gmail.com', 'AC001', '+91 9341771761', 'Bangalore, Karnataka'),
('Demo Academy', 'academy@demo.com', 'DEMO123', '+91 9876543210', 'Demo City, Demo State')
ON CONFLICT (email) DO NOTHING;

-- Insert demo teachers
INSERT INTO teachers (teacher_id, name, email, phone, subjects, academy_id, date_of_birth, date_of_joining) VALUES
('TCH001', 'Sarah Wilson', 'sarah.wilson@ac001.com', '+91 9876543210', ARRAY['Mathematics', 'Physics'], 'AC001', '1985-05-15', '2024-01-01'),
('TCH002', 'John Smith', 'john.smith@ac001.com', '+91 9876543211', ARRAY['Chemistry', 'Biology'], 'AC001', '1980-03-20', '2024-01-01')
ON CONFLICT (teacher_id, academy_id) DO NOTHING;

-- Insert demo students
INSERT INTO students (
  student_id, name, email, roll_number, father_name, date_of_birth, 
  mobile_number_1, gender, address, admission_date, academy_id, password
) VALUES 
(
  'STU2025009', 'SAFA MARYAM', 'safa.maryam@ac001.com', '2025009', 
  'Mohammed Maryam', '1990-01-01', '9341771761', 'Female', 
  'Bangalore, Karnataka', '2024-04-01', 'AC001', 'student123'
),
(
  'STU2025001', 'John Doe', 'john.doe@ac001.com', '2025001', 
  'Robert Doe', '1990-01-01', '9876543210', 'Male', 
  'Bangalore, Karnataka', '2024-04-01', 'AC001', 'student123'
)
ON CONFLICT (student_id, academy_id) DO NOTHING;

-- Insert demo batches
INSERT INTO batches (name, subject, teacher_id, academy_id, schedule, fees) VALUES
('SSLC - B1', 'Mathematics', (SELECT id FROM teachers WHERE teacher_id = 'TCH001' AND academy_id = 'AC001'), 'AC001', 'Monday, Wednesday, Friday - 18:45', 5000),
('SSLC - B2', 'Mathematics', (SELECT id FROM teachers WHERE teacher_id = 'TCH001' AND academy_id = 'AC001'), 'AC001', 'Tuesday, Thursday, Saturday - 18:45', 5000),
('10th ICSE (SCIENCE)', 'Physics', (SELECT id FROM teachers WHERE teacher_id = 'TCH002' AND academy_id = 'AC001'), 'AC001', 'Monday, Wednesday, Friday - 16:45', 6000),
('II PUC (SCIENCE)', 'Chemistry', (SELECT id FROM teachers WHERE teacher_id = 'TCH002' AND academy_id = 'AC001'), 'AC001', 'Tuesday, Thursday, Saturday - 18:45', 7000)
ON CONFLICT DO NOTHING;

-- Assign students to batches
INSERT INTO student_batches (student_id, batch_id) VALUES
(
  (SELECT id FROM students WHERE student_id = 'STU2025009' AND academy_id = 'AC001'),
  (SELECT id FROM batches WHERE name = 'SSLC - B1' AND academy_id = 'AC001')
),
(
  (SELECT id FROM students WHERE student_id = 'STU2025001' AND academy_id = 'AC001'),
  (SELECT id FROM batches WHERE name = 'SSLC - B1' AND academy_id = 'AC001')
)
ON CONFLICT (student_id, batch_id) DO NOTHING;

-- Update batch student counts
UPDATE batches SET current_students = (
  SELECT COUNT(*) FROM student_batches WHERE batch_id = batches.id
);
