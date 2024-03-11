import Link from "next/link";
import HomePageLayout from "~/layouts/HomePageLayout";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <HomePageLayout />
      </div>
    </div>
  );
}