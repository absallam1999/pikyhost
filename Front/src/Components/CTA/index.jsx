import { useState, useEffect } from "react";
import { useSection } from "./../../Hooks/Section";
import { useTranslation } from "react-i18next";
import { fetchBtns } from "./../../Services/Models/btns";
import "./index.scss";

export default function CtaSection() {
  const { i18n } = useTranslation();
  const { data, isLoading, error } = useSection("cta-section");
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
  if (error) return <div>Error loading section</div>;
  if (!data) return null;

  const subtitle = i18n.language === "ar" ? data.subtitle_ar : data.subtitle_en;
  const description =
    i18n.language === "ar" ? data.description_ar : data.description_en;

  return (
    <section id="cta" className="cta-section" data-aos="fade-up">
      <div className="container">
        <div className="cta-content" data-aos="fade-up">
          <h2>{subtitle}</h2>
          <p>{description}</p>

          {btns.length > 0 ? (
            btns.map((btn, index) => (
              <a
                key={index}
                href={btn.link || "#"}
                className="btn-primary-modern"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {i18n.language === "ar" ? "اشترك الآن" : "Subscribe Now"}
                </span>
              </a>
            ))
          ) : (
            <a
              href={btns[0]?.link || "#pricing"}
              className="btn-primary-modern"
            >
              <span>{i18n.language === "ar" ? "اشتراك" : "Subscribe"}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
