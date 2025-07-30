import { useSectionWithItems } from "./../../Hooks/SectionItems/index";
import { fetchBtns } from "./../../Services/Models/btns";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

export default function WhyChoose() {
  const { i18n, t } = useTranslation();
  const { data, isLoading } = useSectionWithItems("why-choose-section");
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

  if (isLoading) return <div>Loading...</div>;
  if (!data?.section) return null;

  return (
    <section className="why-choose-section" data-aos="fade-up">
      <div className="container">
        <div className="section-header text-center" data-aos="fade-up">
          <h2 className="section-title">
            {i18n.language === "ar"
              ? data.section.subtitle_ar
              : data.section.subtitle_en}
          </h2>
          <p className="section-description">
            {i18n.language === "ar"
              ? data.section.description_ar
              : data.section.description_en}
          </p>
        </div>
        <div className="feature-cta">
          <a href={btns[0]?.link || "#pricing"} className="btn-feature-cta">
            <span>{t("feature-cta.btn")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
