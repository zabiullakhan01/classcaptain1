/*
  # Create attendance table
  1. New Table: attendance (id uuid, student_id uuid, batch_id uuid, date date, status text, created_at timestamp)
  2. Security: Enable RLS, add policies for academy admins/teachers to manage attendance.
*/
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Policy for academy admins/teachers to view attendance within their academy
CREATE POLICY "Admins and teachers can view attendance." ON attendance
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = attendance.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher', 'student') -- Students can view their own attendance
  );

-- Policy for academy admins/teachers to insert attendance
CREATE POLICY "Admins and teachers can insert attendance." ON attendance
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = attendance.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher')
  );

-- Policy for academy admins/teachers to update attendance
CREATE POLICY "Admins and teachers can update attendance." ON attendance
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = attendance.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher')
  );

-- Policy for academy admins/teachers to delete attendance
CREATE POLICY "Admins and teachers can delete attendance." ON attendance
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = attendance.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher')
  );
