import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Ensure the public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Sanitize filename to prevent directory traversal or invalid paths
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    
    // Write file to target local directory
    fs.writeFileSync(filePath, buffer);
    
    const fileUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
