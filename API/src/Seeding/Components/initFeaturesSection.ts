import { SectionModel } from '../../Models/Sections.Model';
import { SectionItemModel } from '../../Models/Items.Model';

export async function initFeaturesSection() {
  try {
    const existingSection = await SectionModel.getByKeyName('features-section');

    if (existingSection) {
      console.log('Features section already exists.');
      return;
    }

    const createdSection = await SectionModel.create({
      key_name: 'features-section',
      title: 'Features',
      subtitle_en: 'Features of Our Shared Hosting',
      subtitle_ar: 'مميزات استضافتنا المشتركة',
      description_en: '',
      description_ar: '',
      button_label: 'Subscribe Now'
    });

    const features = [
      {
        title_en: 'Superior Performance',
        title_ar: 'الأداء الفائق',
        body_en: 'Ultra-fast SSD drives + LiteSpeed technology ensure instant website loading, regardless of data volume.',
        body_ar: 'أقراص SSD فائقة السرعة + تقنية LiteSpeed تضمن تحميل موقعك فوراً مهما كان حجم البيانات.',
        order_index: 1
      },
      {
        title_en: 'Absolute Security',
        title_ar: 'الأمان المطلق',
        body_en: 'WAF firewall, automatically renewed SSL certificate, daily backups, and global CDN distribution.',
        body_ar: 'جدار حماية WAF، شهادة SSL مجددة تلقائياً، نسخ احتياطي يومي، توزيع CDN عالمي.',
        order_index: 2
      },
      {
        title_en: 'Full Control',
        title_ar: 'تحكم كامل',
        body_en: 'One-click installation for WordPress and 400+ applications, with an easy-to-use Spanel control panel + free Website Builder.',
        body_ar: 'تنصيب WordPress و400 تطبيق بضغطة واحدة، مع لوحة Spanel سهلة الاستخدام + Website Builder مجاناً.',
        order_index: 3
      },
      {
        title_en: 'Specialized Support',
        title_ar: 'الدعم المتخصص',
        body_en: 'A professional technical support team, available in Arabic and English, directly addressing your needs 24/7.',
        body_ar: 'فريق تقني محترف باللغة العربية والإنجليزية يتعامل مباشرة مع احتياجاتك 24/7.',
        order_index: 4
      }
    ];

    for (const feature of features) {
      await SectionItemModel.create({
        section_id: createdSection.id,
        subtitle_en: feature.title_en,
        subtitle_ar: feature.title_ar,
        description_en: feature.body_en,
        description_ar: feature.body_ar,
        order_index: feature.order_index
      });
    }

    console.log('Features section with items seeded successfully.');
  } catch (err) {
    console.error('Failed to initialize Features section:', err);
  }
}