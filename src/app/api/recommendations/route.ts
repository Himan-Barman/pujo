import { NextResponse } from 'next/server';
import { TRACKS_DATA } from '@/data/playlists';
import { MANTRAS_DATA } from '@/data/mantras';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeOfDay = searchParams.get('time') || 'morning';
  const day = searchParams.get('day') || 'ashtami';

  // Dynamic contextual recommendation matching festival day or time of day
  const recommendedTracks = TRACKS_DATA.filter((track) => {
    if (day && track.dayId === day) return true;
    if (timeOfDay === 'morning') return track.category === 'morning' || track.category === 'mahalaya' || track.category === 'dhak';
    if (timeOfDay === 'evening') return track.category === 'evening' || track.category === 'sandhi' || track.category === 'dhak';
    return true;
  }).slice(0, 4);

  const recommendedMantras = MANTRAS_DATA.filter((m) => {
    if (day === 'ashtami') return m.type === 'pushpanjali' || m.type === 'sandhi';
    if (day === 'dashami') return m.type === 'bisarjan';
    return m.type === 'pranam';
  });

  return NextResponse.json({
    success: true,
    day,
    timeOfDay,
    recommendedTracks,
    recommendedMantras,
  });
}
