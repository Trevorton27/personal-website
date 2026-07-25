import portfolioData from "@/data/portfolio.json";
import { HomePageClient } from "@/components/HomePageClient";

export default async function HomePage() {
  return <HomePageClient projects={portfolioData} />;
}
