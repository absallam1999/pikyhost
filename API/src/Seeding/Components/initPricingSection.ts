import { SectionModel } from '../../Models/Sections.Model';
import { SectionItemModel } from '../../Models/Items.Model';

export async function initPricingSection() {
  try {
    const existingSection = await SectionModel.getByKeyName('pricing-section');

    if (existingSection) {
      console.log('Pricing section already exists.');
      return;
    }

    const createdSection = await SectionModel.create({
      key_name: 'pricing-section',
      title: 'Pricing',
      subtitle_en: 'Choose the Plan That Suits Your Needs',
      subtitle_ar: 'اختر الباقة التي تناسب احتياجاتك',
      description_en: '',
      description_ar: '',
      button_label: ''
    });

    if (!createdSection?.id) {
      console.error('Pricing section created but insertId was not returned.');
      return;
    }

    const sectionId = createdSection.id;

    const items = [
      {
        subtitle_en: 'Basic Plan',
        subtitle_ar: 'الباقة الأساسية',
        description_en: 'For startups',
        description_ar: 'للمشاريع الناشئة',
        pricing: "49.88",
        body_en: JSON.stringify([
          '5 websites',
          '10 GB ultra-fast SSD storage',
          '512 MB RAM',
          '100,000 Inodes',
          'Unlimited data transfer',
          '10 professional email accounts',
          'Advanced CDN + WAF security',
          'Free SSL certificate with automatic renewal',
          'Daily internal backups'
        ]),
        body_ar: JSON.stringify([
          '5 مواقع إلكترونية',
          '10 جيجا تخزين SSD فائق السرعة',
          '512 ميجا ذاكرة وصول عشوائي',
          '100,000 ملف Inodes',
          'نقل بيانات غير محدود',
          '10 حسابات بريد إلكتروني احترافية',
          'أمان متقدم CDN + WAF',
          'شهادة SSL مجانية مع التجديد التلقائي',
          'نسخ احتياطية يومية داخلية'
        ]),
        order_index: 1
      },
      {
        subtitle_en: 'Advanced Plan',
        subtitle_ar: 'الباقة المتقدمة',
        description_en: 'Most Popular',
        description_ar: 'الأكثر طلباً',
        pricing: "69.48",
        body_en: JSON.stringify([
          '100 websites',
          '40 GB advanced SSD storage',
          '1 GB RAM',
          '400,000 Inodes',
          'Unlimited data transfer',
          'Unlimited email accounts',
          'Comprehensive CDN + WAF security',
          'Daily external backups for maximum protection'
        ]),
          body_ar: JSON.stringify([
          '100 موقع إلكتروني',
          '40 جيجا تخزين SSD متطور',
          '1 جيجا ذاكرة وصول عشوائي',
          '400,000 ملف Inodes',
          'نقل بيانات غير محدود',
          'حسابات بريد إلكتروني غير محدودة',
          'أمان شامل CDN + WAF',
          'نسخ احتياطية يومية خارجية للحماية القصوى'
        ]),
        order_index: 2
      },
      {
        subtitle_en: 'Professional Plan',
        subtitle_ar: 'الباقة الاحترافية',
        description_en: 'For large projects',
        description_ar: 'للمشاريع الكبيرة',
        pricing: "109.37",
        body_en: JSON.stringify([
          'Unlimited websites (fair usage)',
          '80 GB high-performance SSD storage',
          '2 GB RAM',
          '800,000 Inodes',
          'Unlimited data transfer',
          'Unlimited email accounts (fair usage)',
          'Integrated CDN + WAF security',
          'Advanced daily backups'
        ]),
        body_ar: JSON.stringify([
          'مواقع غير محدودة (استخدام عادل)',
          '80 جيجا تخزين SSD عالي الأداء',
          '2 جيجا ذاكرة وصول عشوائي',
          '800,000 ملف Inodes',
          'نقل بيانات غير محدود',
          'حسابات بريد غير محدودة (استخدام عادل)',
          'حماية متكاملة CDN + WAF',
          'شهادة SSL مجانية مع التجديد التلقائي',
          'نسخ احتياطية يومية متقدمة'
        ]),
        order_index: 3
      },
      {
        subtitle_en: 'Free Domain',
        subtitle_ar: 'دومين مجاني',
        description_en: 'For one full year',
        description_ar: 'لمدة عام كامل',
        body: null,
        order_index: 5
      },
      {
        subtitle_en: 'Free SSL Certificate',
        subtitle_ar: 'شهادة SSL مجانية',
        description_en: 'With automatic renewal',
        description_ar: 'مع التجديد التلقائي',
        body: null,
        order_index: 6
      },
      {
        subtitle_en: 'Daily Backups',
        subtitle_ar: 'نسخ احتياطي يومي',
        description_en: 'Complete data protection',
        description_ar: 'حماية كاملة لبياناتك',
        body: null,
        order_index: 7
      },
      {
        subtitle_en: '24/7 Live Support',
        subtitle_ar: 'دعم مباشر 24/7',
        description_en: 'Expert team always available',
        description_ar: 'فريق متخصص دائماً',
        body: null,
        order_index: 8
      }
    ];

    for (const item of items) {
      await SectionItemModel.create({
        section_id: sectionId,
        subtitle_en: item.subtitle_en,
        subtitle_ar: item.subtitle_ar,
        description_en: item.description_en,
        description_ar: item.description_ar,
        body_en: item.body_en,
        body_ar: item.body_ar,
        pricing: item.pricing,
        order_index: item.order_index
      });
    }

    console.log('Pricing section with items seeded successfully.');
  } catch (err) {
    console.error('Failed to initialize Pricing section:', err);
  }
}
