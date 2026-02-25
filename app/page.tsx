import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import InteractiveGrid from "@/components/InteractiveGrid";

export default function Home() {
    return (
        <>
            <InteractiveGrid />
            <main className="relative z-10 min-h-screen">
                <Navbar />
                <Hero />
                <WhyUs />
                <HowItWorks />
                <Reviews />
                <FAQ />
                <FinalCTA />
            </main>
        </>
    );
}
