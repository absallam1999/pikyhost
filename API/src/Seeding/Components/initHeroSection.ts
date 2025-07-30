import { SectionModel } from "./../../Models/Sections.Model";
import { SectionItemModel } from "./../../Models/Items.Model";

export async function initHeroSection() {
  try {
    const key_name = "hero";
    const existingSection = await SectionModel.getByKeyName(key_name);

    if (existingSection) {
      console.log("Hero section already exists.");
      return;
    }

    const section = await SectionModel.create({
      key_name,
      title: "Hero",
      description: {badge_ar: "الأسرع في المنطقة", badge_en: "Fastest in the Region", title_ar: "اكتشف قوة وسرعة استضافة PikyHost المشتركة", title_en: "Discover the Power and Speed of PikyHost's Shared Hosting"},
      subtitle_en: "Your First Step Towards Exceptional Digital Success",
      subtitle_ar: "خطوتك الأولى نحو نجاح إلكتروني استثنائي",
      description_en:
        "Your Website Deserves the Best... We guarantee the speed, security, and stability your clients and search engines can always trust.",
      description_ar:
        "موقعك الإلكتروني يستحق الأفضل... نحن نضمن له السرعة والأمان والاستقرار الذي يثق به عملاؤك ومحركات البحث على حد سواء.",
      button_label: "Subscribe Now",
    });

    const sectionId = section.id;
    console.log("Hero section created.");

    const heroItems = [
      {
        subtitle_en: "Control Panel",
        subtitle_ar: "لوحة التحكم",
        body_en: { key: "card.panel", text: "Control Panel" },
        body_ar: { key: "card.panel", text: "لوحة التحكم" },
        order_index: 1,
      },
      {
        subtitle_en: "Load Time",
        subtitle_ar: "سرعة التحميل",
        body_en: {
          key: "card.load",
          text: "Load Time",
          value: "2.3s",
        },
        body_ar: {
          key: "card.load",
          text: "سرعة التحميل",
          value: "2.3ث",
        },
        order_index: 2,
      },
      {
        subtitle_en: "Secure",
        subtitle_ar: "الأمان",
        body_en: {
          key: "card.secure",
          text: "Secure",
          value: "100%",
        },
        body_ar: {
          key: "card.secure",
          text: "الأمان",
          value: "100%",
        },
        order_index: 3,
      },
      {
        subtitle_en: "% Uptime",
        subtitle_ar: "% وقت التشغيل",
        body_en: {
          key: "stats.uptime",
          text: "% Uptime",
          value: "99.9%",
        },
        body_ar: {
          key: "stats.uptime",
          text: "% وقت التشغيل",
          value: "99.9%",
        },
        order_index: 4,
      },
      {
        subtitle_en: "24/7 Support",
        subtitle_ar: "دعم فني 7/24",
        body_en: {
          key: "stats.support",
          text: "24/7 Support",
          value: "24",
        },
        body_ar: {
          key: "stats.support",
          text: "دعم فني 7/24",
          value: "24",
        },
        order_index: 5,
      },
      {
        subtitle_en: "+ Happy Clients",
        subtitle_ar: "+ عميل راضي",
        body_en: {
          key: "stats.clients",
          text: "+ Happy Clients",
          value: "1000+",
        },
        body_ar: {
          key: "stats.clients",
          text: "+ عميل راضي",
          value: "1000+",
        },
        order_index: 6,
      },
    ];

    for (const item of heroItems) {
      await SectionItemModel.create({
        section_id: sectionId,
        subtitle_en: item.subtitle_en,
        subtitle_ar: item.subtitle_ar,
        body_en: item.body_en,
        body_ar: item.body_ar,
        order_index: item.order_index,
      });
    }

    console.log("Hero section items inserted successfully.");
  } catch (err) {
    console.error("Failed to seed Hero section:", err);
  }
}

