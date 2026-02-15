import { NextResponse } from 'next/server';
import connect from '../../../lib/mongoose';
import Site from '../../../lib/models/Site';

export async function GET(request) {
  try {
    await connect();

    const sites = await Site.find({}).sort({ rank: 1, score: -1 }).limit(100).lean();

    return NextResponse.json({ data: sites });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connect();
    const body = await request.json();

    if (!body.url) return NextResponse.json({ error: 'url is required' }, { status: 400 });

    const existing = await Site.findOne({ url: body.url });
    if (existing) {
      Object.assign(existing, body);
      await existing.save();
      return NextResponse.json({ data: existing });
    }

    const created = await Site.create(body);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
