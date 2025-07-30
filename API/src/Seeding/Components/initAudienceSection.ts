import { SectionModel } from '../../Models/Sections.Model';
import { SectionItemModel } from '../../Models/Items.Model';

export async function initAudienceSection() {
  try {
    const existingSection = await SectionModel.getByKeyName('audience-section');

    if (existingSection) {
      console.log('Audience section already exists.');
      return;
    }

    const createdSection = await SectionModel.create({
      key_name: 'audience-section',
      title: 'Target Audience',
      subtitle_en: 'Who Needs Our Hosting Solutions?',
      subtitle_ar: 'من يحتاج إلى حلول الاستضافة الخاصة بنا؟',
      description_en: '',
      description_ar: '',
      button_label: 'Check Plans'
    });

    const sectionId = createdSection.id;
    if (!sectionId) {
      console.error('Audience section created but ID was not returned.');
      return;
    }

    const audiences = [
      {
        title_en: 'Startups & Entrepreneurs',
        title_ar: 'الشركات الناشئة ورواد الأعمال',
        order_index: 1
      },
      {
        title_en: 'Company Websites',
        title_ar: 'المواقع الرسمية للشركات',
        order_index: 2
      },
      {
        title_en: 'E-commerce Stores',
        title_ar: 'متاجر التجارة الإلكترونية',
        order_index: 3
      },
      {
        title_en: 'Blogs & Content Creators',
        title_ar: 'المدونات ومنشئو المحتوى',
        order_index: 4
      },
      {
        title_en: 'Anyone Needing Reliable Hosting',
        title_ar: 'أي شخص يحتاج إلى استضافة موثوقة',
        order_index: 5
      }
    ];

    for (const audience of audiences) {
      await SectionItemModel.create({
        section_id: sectionId,
        subtitle_en: audience.title_en,
        subtitle_ar: audience.title_ar,
        description_en: '',
        description_ar: '',
        order_index: audience.order_index
      });
    }

    console.log('Audience section with items seeded successfully.');
  } catch (err) {
    console.error('Failed to initialize Audience section:', err);
  }
}
