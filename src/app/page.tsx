import portfolioData from "@/data/portfolio.json";
import { HomePageClient } from "@/components/HomePageClient";

export default function HomePage() {
  return <HomePageClient projects={portfolioData} />;
}
