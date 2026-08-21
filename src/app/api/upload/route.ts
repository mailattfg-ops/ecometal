import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60s for large media file uploads

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sanitize filename to prevent invalid characters
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('ecometal_uploads')
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        cacheControl: '31536000',
        upsert: false
      });

    if (error) {
      console.error("Supabase storage error:", error);
      return NextResponse.json(
        { error: `Supabase upload error: ${error.message}` },
        { status: 400 }
      );
    }
    
    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('ecometal_uploads')
      .getPublicUrl(uniqueFilename);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      return NextResponse.json(
        { error: "Failed to generate public URL from Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (err: any) {
    console.error("Upload route error:", err);
    return NextResponse.json(
      { error: err.message || 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
