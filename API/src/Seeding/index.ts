import { initAdminPassword } from './Components/initAdminPassword';
import { initHeroSection } from './Components/initHeroSection';
import { initCtaSection } from './Components/initCtaSection';
import { initFeaturesSection } from './Components/initFeaturesSection';
import { initWhyChooseSection } from './Components/initWhyChooseSection';
import { initAudienceSection } from './Components/initAudienceSection';
import { initPricingSection } from './Components/initPricingSection';
import { initFooterSection } from './Components/initFooterSection';
import { initBtns } from './Components/initBtns';


export async function initializeAppData() {
  await initAdminPassword();
  await initBtns();
  await initHeroSection();
  await initWhyChooseSection();
  await initFeaturesSection();
  await initPricingSection();
  await initAudienceSection();
  await initCtaSection();
  await initFooterSection();
}