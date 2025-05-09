import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import PopularCourseSection from "../components/PopularCourseSection";
import HowItWorksSection from "../components/HowItWorksSection";
import MentorHighlightSection from "../components/MentorHighlightSection";
import PopularBlogsSection from "../components/PopularBlogsSection";
import Footer from "../components/Footer";
const Home = () => {
    return (
        <main className="w-full h-dvh">
            <div className="px-8 max-lg:px-2">
                <NavBar />
                <Hero />
                <PopularCourseSection />
                <HowItWorksSection />
                <MentorHighlightSection />
                <PopularBlogsSection />
            </div>
            <Footer />
        </main>
    )
}

export default Home
