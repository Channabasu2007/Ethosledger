import { NextResponse } from 'next/server';
import connect from '../../../lib/mongoose';
import Site from '../../../lib/models/Site';

const sample = [
  { url: 'https://shop-fast.com', title: 'shop-fast.com', score: 98, category: 'E-COMMERCE', rank: 1, image: '', metrics: { totalWeight: '12.00', co2: '4.8g', loadTime: '3.2' } },
  { url: 'https://daily-noise.org', title: 'daily-noise.org', score: 92, category: 'NEWS', rank: 2, image: '', metrics: { totalWeight: '9.5', co2: '3.2g', loadTime: '2.9' } },
  { url: 'https://stream-bloat.tv', title: 'stream-bloat.tv', score: 88, category: 'MEDIA', rank: 3, image: '', metrics: { totalWeight: '18.2', co2: '7.0g', loadTime: '5.1' } },
];

export async function POST(request) {
  try {
    await connect();
    const results = [];
    for (const s of sample) {
      const existing = await Site.findOne({ url: s.url });
      if (existing) {
        Object.assign(existing, s);
        await existing.save();
        results.push(existing);
      } else {
        const created = await Site.create(s);
        results.push(created);
      }
    }

    return NextResponse.json({ data: results });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
