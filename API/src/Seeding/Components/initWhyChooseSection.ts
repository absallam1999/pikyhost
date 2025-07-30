import { SectionModel } from '../../Models/Sections.Model';
import { SectionItemModel } from '../../Models/Items.Model';

export async function initWhyChooseSection() {
  try {
    const existingSection = await SectionModel.getByKeyName('why-choose-section');

    if (existingSection) {
      console.log('Why Choose section already exists.');
      return;
    }

    const createdSection = await SectionModel.create({
      key_name: 'why-choose-section',
      title: 'Why Choose Us?',
      subtitle_en: 'Why Choose Our Hosting Services?',
      subtitle_ar: 'لماذا تختار خدمات الاستضافة لدينا؟',
      description_en: 'In the world of digital business, there is no room for risk... Choose shared hosting that combines top-level security, outstanding performance, and continuous support—carefully designed to meet the ambitions of entrepreneurs and Class A businesses in Egypt and the Gulf region, with reliable, fast technological solutions without complications.',
      description_ar: 'في عالم الأعمال الرقمية، لا مجال للمخاطرة... اختر استضافة مواقع تجمع بين الأمان الفائق، الأداء الاستثنائي، والدعم المستمر - مصممة خصيصاً لتلبية تطلعات رواد الأعمال والشركات من الفئة الأولى في مصر ودول الخليج، بحلول تقنية موثوقة وسريعة، بدون تعقيدات.',
      button_label: 'Subscribe'
    });

    const sectionId = createdSection.id;
    if (!sectionId) {
      console.error('Why Choose section created but ID was not returned.');
      return;
    }

    console.log('Why Choose section with highlights seeded successfully.');
  } catch (err) {
    console.error('Failed to initialize Why Choose section:', err);
  }
}
