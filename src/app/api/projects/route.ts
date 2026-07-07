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
    const { 
      title, category, description, image_url, area, location, completion_time, bedrooms,
      client_name = '', client_link = '', tagline = '', read_time = '3 min read', download_pdf_url = '',
      quote_text = '', quote_author = '', quote_role = '', key_benefits = '', project_narrative = '', additional_images = ''
    } = body;
    
    const res = await query(
      `INSERT INTO public.projects (
        title, category, description, image_url, area, location, completion_time, bedrooms,
        client_name, client_link, tagline, read_time, download_pdf_url,
        quote_text, quote_author, quote_role, key_benefits, project_narrative, additional_images
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
      [
        title, category, description, image_url, area, location, completion_time, bedrooms,
        client_name, client_link, tagline, read_time, download_pdf_url,
        quote_text, quote_author, quote_role, key_benefits, project_narrative, additional_images
      ]
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
    const { 
      id, title, category, description, image_url, area, location, completion_time, bedrooms,
      client_name = '', client_link = '', tagline = '', read_time = '3 min read', download_pdf_url = '',
      quote_text = '', quote_author = '', quote_role = '', key_benefits = '', project_narrative = '', additional_images = ''
    } = body;
    
    const res = await query(
      `UPDATE public.projects 
       SET title = $1, category = $2, description = $3, image_url = $4, area = $5, location = $6, completion_time = $7, bedrooms = $8,
           client_name = $9, client_link = $10, tagline = $11, read_time = $12, download_pdf_url = $13,
           quote_text = $14, quote_author = $15, quote_role = $16, key_benefits = $17, project_narrative = $18, additional_images = $19
       WHERE id = $20 RETURNING *`,
      [
        title, category, description, image_url, area, location, completion_time, bedrooms,
        client_name, client_link, tagline, read_time, download_pdf_url,
        quote_text, quote_author, quote_role, key_benefits, project_narrative, additional_images,
        id
      ]
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
