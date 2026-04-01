import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SUBS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    let subs: string[] = [];
    try {
      const data = await fs.readFile(SUBS_FILE, 'utf-8');
      subs = JSON.parse(data);
    } catch {
      // file doesn't exist yet
    }

    if (!subs.includes(email)) {
      subs.push(email);
      await fs.mkdir(path.dirname(SUBS_FILE), { recursive: true });
      await fs.writeFile(SUBS_FILE, JSON.stringify(subs, null, 2));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
