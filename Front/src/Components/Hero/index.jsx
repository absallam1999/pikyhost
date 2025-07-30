import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSectionWithItems } from "../../Hooks/SectionItems";
import { fetchBtns } from "./../../Services/Models/btns";
import NumberCounter from "../../Utils/numberCount";
import VideoModal from "../Video";
import "./index.scss";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useSectionWithItems("hero");
  const [btns, setBtns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

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

  const section = data.section;
  const items = data.items || [];
  const lang = i18n.language;
  const isAr = lang === "ar";
  const get = (en, ar) => (lang === "ar" ? ar : en);

  const getBodyValue = (item, isArabic) => {
    const bodyRaw = isArabic ? item?.body_ar : item?.body_en;

    try {
      const body = typeof bodyRaw === "string" ? JSON.parse(bodyRaw) : bodyRaw;

      return body?.value ?? "--";
    } catch (err) {
      console.error("Error parsing body JSON:", err);
      return "--";
    }
  };

  return (
    <section id="home" className="hero-section" data-aos="fade-up">
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge" data-aos="fade-up" data-aos-delay="100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>
                {isAr
                  ? section?.description?.badge_ar
                  : section?.description?.badge_en}
              </span>
            </div>

            <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
              {isAr
                ? section?.description?.title_ar
                : section?.description?.title_en}
            </h1>

            <p
              className="hero-subtitle"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {get(section.subtitle_en, section.subtitle_ar)}
            </p>

            <p
              className="hero-description"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {get(section.description_en, section.description_ar)}
            </p>

            <div className="hero-stats" data-aos="fade-up" data-aos-delay="500">
              {items.slice(3, 6).map((item, idx) => {
                let descEn = {};
                let descAr = {};

                try {
                  descEn =
                    typeof item.body_en === "string"
                      ? JSON.parse(item.body_en)
                      : item.body_en || {};
                  descAr =
                    typeof item.body_ar === "string"
                      ? JSON.parse(item.body_ar)
                      : item.body_ar || {};
                } catch (e) {
                  console.error("Invalid JSON in description:", item, e);
                }

                const value = parseFloat(
                  descEn.value?.replace(/[^\d.]/g, "") || "0"
                );

                return (
                  <div className="stat-item" key={idx}>
                    <div className="stat-number">
                      <NumberCounter
                        target={value}
                        decimals={descEn.value?.includes(".") ? 1 : 0}
                      />
                    </div>
                    <div className="stat-label">
                      {isAr ? item.subtitle_ar : item.subtitle_en}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="hero-buttons"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <a
                href={btns[0]?.link || "#pricing"}
                className="btn-primary-modern"
              >
                <span>{get("Subscribe Now", "اشترك الآن")}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </a>
              <a className="btn-secondary-modern" onClick={handlePreview}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>{get("Watch Demo", "شاهد العرض")}</span>
              </a>
            </div>
          </div>

          <div
            className="hero-visual"
            data-aos="fade-left"
            data-aos-delay="700"
          >
            <div className="hero-card floating">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="card-title">
                  {get(items[0]?.subtitle_en, items[0]?.subtitle_ar)}
                </div>
              </div>
              <div className="card-content">
                <div className="metric-row">
                  <div className="metric">
                    <div className="metric-icon primary">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z" />
                        <path d="M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" />
                      </svg>
                    </div>
                    <div className="metric-info">
                      <div className="metric-value">
                        {getBodyValue(items[1], isAr)}
                      </div>
                      <div className="metric-label">
                        {get(items[1]?.subtitle_en, items[1]?.subtitle_ar)}
                      </div>
                    </div>
                  </div>
                  <div className="metric-chart">
                    <div className="chart-bar" style={{ height: "60%" }}></div>
                    <div className="chart-bar" style={{ height: "80%" }}></div>
                    <div className="chart-bar" style={{ height: "100%" }}></div>
                    <div className="chart-bar" style={{ height: "60%" }}></div>
                  </div>
                </div>

                <div className="metric-row">
                  <div className="metric">
                    <div className="metric-icon secondary">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
                        <path d="M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V13C8,12.4 8.4,11.5 9,11.5V10C9,8.6 10.6,7 12,7Z" />
                      </svg>
                    </div>
                    <div className="metric-info">
                      <div className="metric-value">
                        {getBodyValue(items[2], isAr)}
                      </div>
                      <div className="metric-label">
                        {get(items[2]?.subtitle_en, items[2]?.subtitle_ar)}
                      </div>
                    </div>
                  </div>
                  <div className="progress-ring">
                    <svg width="50" height="50">
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        stroke="#e0e0e0"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        stroke="var(--secondary)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="125.6"
                        strokeDashoffset="0"
                        className="progress-circle"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-elements">
              <div className="floating-element element-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zM20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className="floating-element element-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z" />
                </svg>
              </div>
              <div className="floating-element element-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`ytvideo ${isModalOpen ? "visible" : "hidden"}`}>
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={btns[0]?.v_link}
        />
      </div>
    </section>
  );
}
