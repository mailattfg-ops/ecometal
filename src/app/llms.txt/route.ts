import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { siteUrl } from '@/lib/siteUrl';

// Generated rather than a static file so the case-study list stays in step with
// the database. Cached for an hour, same as the sitemap.
export const revalidate = 3600;

export async function GET() {
  let projects: { id: string | number; title: string; tagline: string; description: string }[] = [];
  try {
    projects = (await query(
      'SELECT id, title, tagline, description FROM public.projects ORDER BY id ASC'
    )) as typeof projects;
  } catch (err) {
    console.warn('llms.txt: project query failed, omitting case studies:', err);
  }

  const oneLine = (s: string) => (s || '').replace(/\s+/g, ' ').trim();

  const caseStudies = projects.length
    ? projects
        .map((p) => `- [${oneLine(p.title)}](${siteUrl}/project/${p.id}): ${oneLine(p.tagline || p.description)}`)
        .join('\n')
    : '- See the projects index for the current list of case studies.';

  const body = `# Ecometal Matrix Engineering Pvt. Ltd.

> A vertically integrated, AI-native construction company. We combine Light Gauge Steel (LGS) framing, foam concrete and a design-to-manufacture platform so a building is modelled once, roll-formed to that exact geometry, and assembled on site as a kit of parts.

One factory, one model, one integrated system, for every building type. Structures are resolved in a single 3D model before fabrication: wall panels, floor cassettes and roof trusses are rolled from galvanised coil, pre-punched for services, labelled per position and delivered flat-packed in erection sequence. Because the frame carries the load, wet trades come off the critical path and buildings are delivered in weeks rather than years.

Manufacturing base: Plot 49-59, SIDCO Industrial Estate, Kallavi Road, Kallur, Krishnagiri District, Tamil Nadu 635207, India.
Contact: info@ecometalmatrix.com

## Main pages

- [Home](${siteUrl}/): Company overview, systems, leadership and contact details.
- [Projects & case studies](${siteUrl}/projects): Delivered and engineered schemes across residential, modular and industrial building types.
- [Systems & process](${siteUrl}/system-process): The LGS and foam concrete system, the AI design-to-manufacture platform and ESG metrics.
- [Market analysis](${siteUrl}/market): Demand drivers in urban construction and government-underwritten housing programmes.
- [Downloads](${siteUrl}/downloads): Technical brochures, datasheets and building layouts as PDFs.

## Case studies

${caseStudies}

## Capabilities

- Light Gauge Steel superstructures up to five storeys without a hot-rolled transfer frame.
- Volumetric modular units, finished in the factory and craned into place.
- Panelised and lattice-truss industrial buildings, erected with a telehandler rather than a tower crane.
- Structural engineering to IS 801, IS 811, IS 800 and NBC 2016, with 3D analysis and member schedules.

## Notes

- /admin is a private console and is excluded from indexing.
- Canonical sitemap: ${siteUrl}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
