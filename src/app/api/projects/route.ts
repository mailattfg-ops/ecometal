import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 0; // Disable static caching

// 1. GET - Fetch all projects
export async function GET() {
  try {
    const projects = await query('SELECT * FROM public.projects ORDER BY id ASC');
    return NextResponse.json(projects);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. POST - Add a new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, description, image_url, area, location, completion_time, bedrooms } = body;
    
    const res = await query(
      `INSERT INTO public.projects (title, category, description, image_url, area, location, completion_time, bedrooms)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, category, description, image_url, area, location, completion_time, bedrooms]
    );
    return NextResponse.json(res[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. PUT - Update an existing project
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, category, description, image_url, area, location, completion_time, bedrooms } = body;
    
    const res = await query(
      `UPDATE public.projects 
       SET title = $1, category = $2, description = $3, image_url = $4, area = $5, location = $6, completion_time = $7, bedrooms = $8
       WHERE id = $9 RETURNING *`,
      [title, category, description, image_url, area, location, completion_time, bedrooms, id]
    );
    return NextResponse.json(res[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 4. DELETE - Delete a project
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    
    await query('DELETE FROM public.projects WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
