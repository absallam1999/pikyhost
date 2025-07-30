import { useTranslation } from "react-i18next";
import { useSectionWithItems } from "../../Hooks/SectionItems";
import { useState, useEffect } from "react";
import { fetchBtns } from "./../../Services/Models/btns";
import "./index.scss";

export default function WhoAudience() {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useSectionWithItems("audience-section");
  const [btns, setBtns] = useState([]);

  useEffect(() => {
    fetchBtns()
      .then((btnData) => {
        setBtns(btnData);
      })
      .catch((err) => {
        console.error("Error fetching buttons:", err);
      });
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!data) return null;

  const { section, items } = data;
  const isAr = i18n.language === "ar";

  return (
    <section className="target-audience-section" data-aos="fade-up">
      <div className="container">
        <div className="section-header text-center" data-aos="fade-up">
          <h2 className="section-title">
            {isAr ? section.subtitle_ar : section.subtitle_en}
          </h2>
        </div>

        <div className="target-grid">
          {items.map((item, idx) => (
            <div
              className="target-card"
              data-aos="fade-up"
              data-aos-delay={100 * (idx + 1)}
              key={item.id}
            >
              <div className="target-icon">✓</div>
              <p>{isAr ? item.subtitle_ar : item.subtitle_en}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-cta">
        <a href={btns[0]?.link || "#pricing"} className="btn-feature-cta">
          <span>{t("feature-cta.btn")}</span>
        </a>
      </div>
    </section>
  );
}
