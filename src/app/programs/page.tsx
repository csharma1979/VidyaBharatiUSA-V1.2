import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ProgramCard } from "@/components/ui/ProgramCard";

const programs = [
  {
    title: "Shiksha Daan",
    description: "Bridging the educational divide by supporting rural schools. We ensure every child has access to quality education, empowering them to break the cycle of poverty.",
    image: "/images/shiksha_daan.webp",
    href: "/programs/shiksha-daan",
  },
  {
    title: "Sanskriti Bodh Pariyojana",
    description: "Fostering cultural identity and holistic development. Through traditional arts and value-based education, we help students build strong character and resilience.",
    image: "/images/sanskriti_bodh.webp",
    href: "/programs/sanskriti-bodh",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-32 pb-20 bg-deep-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 blur-3xl w-[500px] h-[500px] bg-saffron rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 opacity-10 blur-3xl w-[300px] h-[300px] bg-saffron rounded-full translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="container px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-black uppercase tracking-widest text-saffron mb-4">Our Initiatives</h1>
            <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-6">
              Building a Foundation for the Future
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Explore our core programs designed to provide holistic education, cultural awareness, and essential support to underprivileged children across India.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {programs.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
