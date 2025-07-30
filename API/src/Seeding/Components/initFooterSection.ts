import { SectionModel } from '../../Models/Sections.Model';
import { SectionItemModel } from '../../Models/Items.Model';

export async function initFooterSection() {
  try {
    const existingSection = await SectionModel.getByKeyName('footer-section');

    if (existingSection) {
      console.log('Footer section already exists.');
      return;
    }

    const createdSection = await SectionModel.create({
      key_name: 'footer-section',
      title: 'Footer',
      subtitle_en: 'We provide the best hosting services and technical solutions for your digital project success',
      subtitle_ar: 'نحن نقدم أفضل خدمات الاستضافة والحلول التقنية لنجاح مشروعك الرقمي',
      description_en: '',
      description_ar: '',
      button_label: ''
    });

    const sectionId = createdSection.id;
    if (!sectionId) {
      console.error('Footer section created but insertId was not returned.');
      return;
    }

    const items = [
      {
        title_en: '© 2025 PikyHost. All rights reserved.',
        title_ar: '© 2025 PikyHost. جميع الحقوق محفوظة.',
        description_en: '',
        description_ar: '',
        order_index: 1
      }
    ];

    for (const item of items) {
      await SectionItemModel.create({
        section_id: sectionId,
        subtitle_en: item.title_en,
        subtitle_ar: item.title_ar,
        description_en: item.description_en,
        description_ar: item.description_ar,
        order_index: item.order_index
      });
    }

    console.log('Footer section with item seeded successfully.');
  } catch (err) {
    console.error('Failed to initialize Footer section:', err);
  }
}
