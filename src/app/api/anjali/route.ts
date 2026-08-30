import { NextResponse } from 'next/server';
import { validateAnjaliInput } from '@/lib/validations';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { devoteeName, gotra, location, flowerType, prarthana, pujaDay } = body;

    const validation = validateAnjaliInput({ devoteeName, flowerType });
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const offeringId = `anjali-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const timestamp = new Date().toISOString();

    if (supabase.isConfigured) {
      await supabase.from('anjali_offerings').insert({
        id: offeringId,
        devotee_name: devoteeName,
        gotra: gotra || null,
        location: location || null,
        flower_type: flowerType,
        prarthana: prarthana || null,
        puja_day: pujaDay || 'ashtami',
        created_at: timestamp,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'দেবী দুর্গার চরণে আপনার অঞ্জলি সফলভাবে নিবেদিত হয়েছে।',
      offering: {
        id: offeringId,
        devoteeName: devoteeName.trim(),
        gotra: gotra?.trim() || 'স্বগোত্র',
        flowerType,
        pujaDay: pujaDay || 'Maha Ashtami',
        blessingVerseBn: 'সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে। দেবী তোমার সকল মনোবাঞ্ছা পূর্ণ করুন।',
        blessingVerseEn: 'May the Divine Mother bless you and your family with peace, health, and joy.',
        timestamp,
      },
    });
  } catch (error) {
    console.error('Error in /api/anjali:', error);
    return NextResponse.json(
      { success: false, message: 'অভ্যন্তরীণ ত্রুটি ঘটেছে (Internal Server Error)' },
      { status: 500 }
    );
  }
}
