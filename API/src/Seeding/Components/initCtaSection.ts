import { SectionModel } from './../../Models/Sections.Model';

export async function initCtaSection() {
  try {
    const existing = await SectionModel.getByKeyName('cta-section');

    if (!existing) {
      await SectionModel.create({
        key_name: 'cta-section',
        title: "CTA",
        subtitle_en: "Don't let your website be a weak point in your digital strategy...",
        subtitle_ar: "لا تدع موقعك الإلكتروني يكون نقطة ضعف في استراتيجيتك الرقمية...",
        description_en: "Choose the hosting that matches your distinguished business.",
        description_ar: "اختر الاستضافة التي تستحقها أعمالك المتميزة.",
        button_label: "Subscribe Now"
      });
      console.log('CTA section seeded.');
    } else {
      console.log('CTA section already exists.');
    }
  } catch (err) {
    console.error('Failed to initialize CTA section:', err);
  }
}
