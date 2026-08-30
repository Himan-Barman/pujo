export function validateAnjaliInput(data: { devoteeName?: string; flowerType?: string }) {
  const errors: Record<string, string> = {};

  if (!data.devoteeName || data.devoteeName.trim().length === 0) {
    errors.devoteeName = 'ভক্তের নাম আবশ্যক (Devotee name is required)';
  } else if (data.devoteeName.trim().length > 60) {
    errors.devoteeName = 'নাম ৬০ অক্ষরের মধ্যে হতে হবে (Name must be under 60 characters)';
  }

  if (!data.flowerType) {
    errors.flowerType = 'পুষ্প নির্বাচন করুন (Please select a flower offering)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateBijoyaCard(data: { recipientName?: string; senderName?: string }) {
  const errors: Record<string, string> = {};

  if (!data.recipientName || data.recipientName.trim().length === 0) {
    errors.recipientName = 'প্রাপকের নাম লিখুন (Recipient name is required)';
  }
  if (!data.senderName || data.senderName.trim().length === 0) {
    errors.senderName = 'আপনার নাম লিখুন (Sender name is required)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
