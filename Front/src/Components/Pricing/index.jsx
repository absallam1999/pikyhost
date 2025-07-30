import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSectionWithItems } from "../../Hooks/SectionItems";
import { fetchBtns } from "./../../Services/Models/btns";
import "./index.scss";

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useSectionWithItems("pricing-section");
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
  if (!data.items?.length) return <div>No pricing data available</div>;

  const { section, items } = data;
  const isAr = i18n.language === "ar";

  const planIcons = [
    <svg width="32" height="32" viewBox="-0.5 0 80 80" fill="currentColor">
      <g transform="translate(-401.03 -70.142)">
        <g>
          <g>
            <path d="M480.03,97.331v49.811a3,3,0,0,1-3,3H417.68a16.671,16.671,0,0,1-16.65-16.65V89.752c0-9.49,7.741-16.65,18-16.65a3,3,0,0,1,3,3V94.331h23.991V73.142a3,3,0,0,1,3-3H464.33a3,3,0,0,1,3,3V94.331h9.7A3,3,0,0,1,480.03,97.331Zm-6,46.811V100.331h-6.7v26.6a2.977,2.977,0,0,1-.6,1.8l-7.671,10.231a3,3,0,0,1-4.8,0l-7.64-10.2a3,3,0,0,1-.6-1.8V100.331H422.03v19.5a3,3,0,0,1-3,3c-6.95,0-12,4.48-12,10.661a10.666,10.666,0,0,0,10.65,10.65Zm-12.7-23.571V89.462h-9.309v31.13Zm0-37.1v-7.33h-9.309v7.33Zm-4.67,48.69,4.2-5.591-8.379.021Zm-40.63-15.121V79.392c-5.36,1.1-9,5.12-9,10.36v31.12A18.429,18.429,0,0,1,416.03,117.041Z" />
            <path d="M474.03,100.331v43.811H417.68a10.666,10.666,0,0,1-10.65-10.65c0-6.181,5.05-10.661,12-10.661a3,3,0,0,0,3-3v-19.5h23.991v26.631a3,3,0,0,0,.6,1.8l7.64,10.2a3,3,0,0,0,4.8,0l7.671-10.231a2.977,2.977,0,0,0,.6-1.8v-26.6Z" />
            <path d="M461.33,89.462v31.109l-9.31.021V89.462Z" />
            <rect
              width="9.31"
              height="7.33"
              transform="translate(452.021 76.142)"
            />
            <path d="M416.03,79.392v37.649a18.429,18.429,0,0,0-9,3.831V89.752C407.03,84.512,410.67,80.492,416.03,79.392Z" />
          </g>
        </g>
      </g>
    </svg>,
    <svg width="32" height="32" viewBox="0 0 512 512" fill="currentColor">
      <g>
        <polygon points="223.354,402.33 210.475,436.126 181.578,512 108.469,512 137.365,436.126 150.244,402.33 " />
        <polygon points="403.538,512 330.417,512 301.521,436.126 288.642,402.33 361.751,402.33 374.63,436.126 " />
      </g>
      <g>
        <polygon points="150.244,402.33 223.354,402.33 210.475,436.126 137.365,436.126 " />
        <polygon points="374.63,436.126 301.521,436.126 288.642,402.33 361.751,402.33 " />
      </g>
      <rect x="47.897" y="73.11" width="416.207" height="331.63" />
      <rect x="47.897" y="57.423" width="416.207" height="38.115" />
      <rect x="16.816" width="478.369" height="73.11" />
      <path d="M119.246,102.177V375.68h273.502V102.177H119.246z M220.213,357.574v-23.899h-18.105v23.899h-64.756 V120.283h64.756v172.758h18.105v-33.839h97.048v-18.105h-97.049V120.283h154.431v120.814h-19.005v18.105h19.005v98.374H220.213 V357.574z" />
    </svg>,
    <svg
      width="32"
      height="32"
      viewBox="0 0 460.873 460.873"
      fill="currentColor"
    >
      <g>
        <path d="M216.5,80.169c22.102,0,40.084-17.982,40.084-40.084C256.584,17.982,238.602,0,216.5,0 c-22.097,0-40.074,17.982-40.074,40.084C176.426,62.187,194.403,80.169,216.5,80.169z"></path>
        <path d="M386.039,180.178l-28.902-28.9c-1.649-1.649-3.849-2.558-6.193-2.558c-2.345,0-4.544,0.909-6.193,2.558l-8.463,8.462 c-0.348-0.406-0.694-0.811-1.076-1.193c-3.623-3.625-8.435-5.703-13.635-5.961c-0.309-0.535-0.643-1.06-1.017-1.569l-13.768-18.771 c-3.971-5.414-11.031-12.517-16.425-16.521l-36.486-27.085c-1.164-0.858-5.064-3.34-9.269-3.34c0,0-51.336,0.012-51.436,0.015 c-5.96,0.129-10.318,3.365-13.304,9.898l-15.724,34.394c-0.333,0.422-1.266,1.188-1.744,1.432l-32.047,7.624 c-4.408,1.049-8.144,3.751-10.519,7.609c-2.375,3.858-3.105,8.411-2.057,12.818c1.826,7.678,8.606,13.04,16.488,13.04 c1.317,0,2.643-0.156,3.939-0.464l32.354-7.697c10.027-2.385,20.022-10.598,24.307-19.971l1.338-2.926l8.72,34.247l-22.551,19.587 c-8.741,7.591-13.23,20.817-10.916,32.163l10.453,51.215c1.693,8.293,9.056,14.312,17.507,14.311c1.199,0,2.408-0.123,3.594-0.364 c9.662-1.973,15.918-11.438,13.946-21.1l-10.209-50.018l23.322-20.257c0.619-0.538,1.174-1.119,1.701-1.719h17.158l11.561,43.137 c1.673,6.241,5.252,15.227,8.325,20.902l25.384,46.884c3.132,5.781,9.164,9.373,15.743,9.373c0.322,0,0.646-0.009,0.968-0.026 c2.647-0.145,5.183-0.862,7.531-2.134c8.672-4.695,11.908-15.570,7.214-24.243l-25.387-46.886c-1.771-3.272-4.264-9.531-5.231-13.14 l-24.252-89.539c2.739,2.196,6.808,6.338,8.645,8.844l13.767,18.771c1.191,1.623,2.651,3.002,4.297,4.091 c-0.101,5.763,2.01,11.112,5.993,15.095c0.381,0.381,0.785,0.731,1.191,1.078l-8.461,8.46c-3.415,3.415-3.415,8.973,0,12.388 l28.9,28.9c1.65,1.649,3.849,2.558,6.193,2.558h0.001c2.343,0,4.542-0.909,6.192-2.558l48.529-48.527 C389.454,189.15,389.454,183.593,386.039,180.178z M310.851,182.906c-1.358-1.358-2.266-3.061-2.688-4.944 c3.16-0.234,6.162-1.339,8.748-3.235c3.834-2.811,6.133-6.943,6.748-11.316c1.587,0.482,3.021,1.326,4.191,2.496 c0.384,0.384,0.721,0.802,1.033,1.236l-16.797,16.797C311.652,183.627,311.234,183.289,310.851,182.906z"></path>
        <path d="M140.952,260.554H82.567c-5.677,0-10.295,4.618-10.295,10.294v179.73c0,5.676,4.618,10.294,10.295,10.294h58.385 c5.677,0,10.295-4.618,10.295-10.294v-179.73C151.247,265.172,146.629,260.554,140.952,260.554z"></path>
        <path d="M233.718,299.512h-58.385c-5.677,0-10.295,4.618-10.295,10.294v140.772c0,5.676,4.618,10.294,10.295,10.294h58.385 c5.677,0,10.295-4.618,10.295-10.294V309.806C244.013,304.13,239.394,299.512,233.718,299.512z"></path>
        <path d="M326.48,325.506h-58.382c-5.677,0-10.295,4.618-10.295,10.294v114.778c0,5.676,4.618,10.294,10.295,10.294h58.382 c5.677,0,10.296-4.618,10.296-10.294V335.8C336.776,330.124,332.157,325.506,326.48,325.506z"></path>
      </g>
    </svg>,
  ];

  const plans = items
    .filter((item) => item.order_index <= 3)
    .map((item, idx) => ({
      key: `plan-${idx}`,
      title: isAr ? item.subtitle_ar : item.subtitle_en,
      desc: isAr ? item.description_ar : item.description_en,
      features: item
        ? JSON.parse(isAr ? item.body_ar || "[]" : item.body_en || "[]")
        : [],
      price: item.pricing,
      originalPrice: idx === 1 ? "229" : null,
      icon: planIcons[idx] || planIcons[0],
    }));

  const featureIcons = [
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>domain</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="invisible_box" data-name="invisible box">
            <rect width="24" height="24" fill="none"></rect>
          </g>
          <g id="icons_Q2" data-name="icons Q2">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm8.05,7.5H17.6a13.9,13.9,0,0,0-1.5-4A9.25,9.25,0,0,1,20.05,7.5ZM21,12a8.75,8.75,0,0,1-.25,2H17.9c.05-.65.1-1.3.1-2s-.05-1.35-.1-2h2.85A8.75,8.75,0,0,1,21,12ZM3,12a8.75,8.75,0,0,1,.25-2h2.85c-.05.65-.1,1.3-.1,2s.05,1.35.1,2H3.25A8.75,8.75,0,0,1,3,12Zm5,0c0-.7.05-1.35.1-2H11v4H8.1C8.05,13.35,8,12.7,8,12Zm3-5.65a5.85,5.85,0,0,1,1.5,1.85A10.85,10.85,0,0,1,15.55,7.5H13Zm-2,0V7.5H8.45A10.85,10.85,0,0,1,9.5,5.2,5.85,5.85,0,0,1,11,6.35ZM11,16v4.65a5.85,5.85,0,0,1-1.5-1.85A10.85,10.85,0,0,1,8.45,16Zm2,4.65V16h2.55A10.85,10.85,0,0,1,13.5,18.8,5.85,5.85,0,0,1,13,20.65Zm2-2V14h2.9c.05.65.1,1.3.1,2s-.05,1.35-.1,2ZM7.9,4.5a13.9,13.9,0,0,0-1.5,4H3.95A9.25,9.25,0,0,1,7.9,4.5ZM3.95,16h2.45a13.9,13.9,0,0,0,1.5,4A9.25,9.25,0,0,1,3.95,16Zm12.15,4a13.9,13.9,0,0,0,1.5-4h2.45A9.25,9.25,0,0,1,16.1,20Z"></path>
          </g>
        </g>
      </g>
    </svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4.25-3H5.75V5h8.5v12z" />
    </svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
    </svg>,
  ];

  const includedFeatures = items
    .filter((item) => item.order_index > 3)
    .map((item, idx) => ({
      title: isAr ? item.subtitle_ar : item.subtitle_en,
      desc: isAr ? item.description_ar : item.description_en,
      icon: featureIcons[idx] || featureIcons[0],
    }));

  return (
    <section id="pricing" className="pricing-section" data-aos="fade-up">
      <div className="container">
        <div className="section-header text-center" data-aos="fade-up">
          <div className="section-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.5 7A1.5 1.5 0 1 1 7 5.5 1.5 1.5 0 0 1 5.5 7ZM21.41 11.58 12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58Z" />
            </svg>
            <span>{isAr ? section.subtitle_ar : section.subtitle_en}</span>
          </div>
          {(isAr ? section.description_ar : section.description_en) && (
            <p>{isAr ? section.description_ar : section.description_en}</p>
          )}
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={plan.key}
              className={`pricing-card modern ${index === 1 ? "featured" : ""}`}
              data-aos="fade-up"
              data-aos-delay={(index + 2) * 100}
            >
              {index === 1 && (
                <div className="popular-badge">
                  {t("Pricing.advanced.popularBadge")}
                </div>
              )}
              <div className="pricing-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3>{plan.title}</h3>
                {plan.desc?.trim() && <p>{plan.desc}</p>}
                <div className="price-wrapper">
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/ {t("Pricing.perYear")}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="original-price">
                      {t("Pricing.advanced.originalPrice", {
                        price: plan.originalPrice,
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="pricing-features">
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing-footer">
                <button
                  className={`btn-plan-select ${index === 1 ? "featured" : ""}`}
                >
                  {t("Pricing.choose")}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="included-features"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h4>{t("Pricing.included.title")}</h4>
          <div className="features-list">
            {includedFeatures.map((feature, i) => (
              <div className="feature-item" key={i}>
                <div className="feature-item-icon">{feature.icon}</div>
                <div className="premium-feature-content">
                  <h5>{feature.title}</h5>
                  <span>{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
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
