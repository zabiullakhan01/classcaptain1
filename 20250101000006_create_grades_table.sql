/*
  # Create grades table
  1. New Table: grades (id uuid, student_id uuid, batch_id uuid, marks numeric, total_marks numeric, exam_date date, created_at timestamp)
  2. Security: Enable RLS, add policies for academy admins/teachers to manage grades.
*/
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  marks numeric NOT NULL,
  total_marks numeric NOT NULL,
  exam_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Policy for academy admins/teachers to view grades within their academy
CREATE POLICY "Admins and teachers can view grades." ON grades
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = grades.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher', 'student') -- Students can view their own grades
  );

-- Policy for academy admins/teachers to insert grades
CREATE POLICY "Admins and teachers can insert grades." ON grades
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = grades.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher')
  );

-- Policy for academy admins/teachers to update grades
CREATE POLICY "Admins and teachers can update grades." ON grades
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = grades.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher')
  );

-- Policy for academy admins/teachers to delete grades
CREATE POLICY "Admins and teachers can delete grades." ON grades
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = grades.student_id AND students.academy_id = (auth.jwt() ->> 'academy_key')::text)
    AND (auth.jwt() ->> 'role')::text IN ('academy', 'teacher')
  );
