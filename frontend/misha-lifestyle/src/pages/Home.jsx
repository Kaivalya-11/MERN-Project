import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CategoryRail from "../components/navigation/CategoryRail";
import CampaignSlider from "../components/hero/CampaignSlider";
import TabbedProductSection from "../components/commerce/TabbedProductSection";
import WatchAndShop from "../components/commerce/WatchAndShop";
import SpinToWin from "../components/ui/SpinToWin";
import BrandStory from "../components/commerce/BrandStory";
import SpottedOn from "../components/commerce/SpottedOn";
import CategoryShowcase from "../components/commerce/CategoryShowcase";
import CustomerReviews from "../components/commerce/CustomerReviews";

const Home = () => {
  return (
    <>
      <SpinToWin />
      <TopBar />
      <Header />
      <CategoryRail />
      <CampaignSlider />
      <TabbedProductSection />
      <WatchAndShop />
      <BrandStory />
      <SpottedOn />
      <CategoryShowcase />
      <CustomerReviews />
      <Footer />
    </>
  );
};

export default Home;
