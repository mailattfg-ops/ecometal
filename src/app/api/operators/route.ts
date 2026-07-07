import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 0; // Disable static caching

// 1. GET - Fetch all operators
export async function GET() {
  try {
    const operators = await query('SELECT * FROM public.operators ORDER BY id ASC');
    return NextResponse.json(operators);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. POST - Add a new operator
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, badge, image_url } = body;
    
    const res = await query(
      `INSERT INTO public.operators (name, role, badge, image_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, role, badge, image_url]
    );
    return NextResponse.json(res[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. PUT - Update an existing operator
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, role, badge, image_url } = body;
    
    const res = await query(
      `UPDATE public.operators 
       SET name = $1, role = $2, badge = $3, image_url = $4
       WHERE id = $5 RETURNING *`,
      [name, role, badge, image_url, id]
    );
    return NextResponse.json(res[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 4. DELETE - Delete an operator
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Operator ID is required' }, { status: 400 });
    }
    
    await query('DELETE FROM public.operators WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
