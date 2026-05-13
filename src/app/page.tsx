import Image from "next/image";
import whoWeAreImage from '@/assets/who we are.png';
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";
import { Heart, BookOpen, Users, Globe, ArrowRight, Quote, Calendar, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <HeroSlider />

      {/* Impact Stats Section */}
      <section className="relative -mt-24 z-20 pb-20">
        <div className="container px-6">
          <div className="bg-white shadow-2xl rounded-[2rem] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-8">
            <Counter value={500} suffix="K+" label="Students Reached" />
            <Counter value={15} suffix="K+" label="Schools Supported" />
            <Counter value={20} suffix="+" label="States Active" />
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="section-padding bg-slate-50">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Who We Are</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                  A movement for educational equity and social change.
                </h3>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-saffron pl-6">
                "VidyaBharati USA is committed to the cause of spreading value-based education 
                to every corner of India, ensuring no child is left behind because of their 
                socio-economic background."
              </p>
              
              <p className="text-slate-600 leading-relaxed">
                Since our inception, we have worked tirelessly to bridge the gap between 
                potential and opportunity. By supporting a network of schools that prioritize 
                not just academic excellence, but also cultural values and skill development, 
                we are building the future leaders of tomorrow.
              </p>
              
              <Button variant="link" size="md" className="group" href="/programs/shiksha-daan" as="span">
                Learn more about our mission 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src={whoWeAreImage}
                alt="Vidya Bharati USA students in a classroom - Empowering through quality education"
                fill
                className="object-cover object-center"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-deep-blue/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Our Impact Areas</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-black text-deep-blue">
              Holistic programs designed for sustainable impact.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link href="/impact" key={program.title} className="group cursor-pointer bg-white border border-slate-100 p-10 rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-slate-50 group-hover:bg-saffron group-hover:text-white transition-colors", program.color)}>
                  <program.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-deep-blue mb-4">{program.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {program.description}
                </p>
                <div className="flex items-center text-sm font-bold text-saffron group-hover:underline">
                  EXPLORE PROGRAM <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Testimonial Block */}
      <section className="section-padding bg-deep-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 blur-3xl w-[500px] h-[500px] bg-saffron rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <Quote className="w-20 h-20 text-saffron/30 mx-auto" />
            
            <h3 className="text-3xl md:text-5xl font-serif italic font-medium leading-relaxed">
              "Providing these children with an education isn't just about jobs; 
              it's about giving them the confidence to dream and the tools to build their own destiny."
            </h3>
            
            <div className="space-y-2">
              <div className="text-xl font-bold">Dr. Surendra Garg</div>
              <div className="text-saffron uppercase tracking-widest text-sm font-bold">President, VidyaBharati USA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section-padding overflow-hidden">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Stay Updated</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue">
                Latest News
              </h3>
            </div>
            <Button variant="outline" className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white rounded-full">
              View All Updates
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Featured News Card */}
            <div className="group relative bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[300px] lg:h-auto overflow-hidden">
                  <Image 
                    src="/images/exam-success.webp" 
                    alt="Vidya Bharati students excel in Board Exams" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-8 left-8">
                    <div className="bg-saffron text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                      Academic Excellence
                    </div>
                  </div>
                </div>
                <div className="p-10 md:p-16 space-y-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>15 May 2025</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-3xl md:text-4xl font-black text-deep-blue leading-tight group-hover:text-saffron transition-colors">
                      Vidya Bharati students excel in Board Exams
                    </h4>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Vidya Bharati students have excelled in the Board Examinations, securing top ranks in the state. 
                      Among the top 10, our students have achieved the 1st, 3rd, and 10th positions. 
                      The 1st rank holder scored a perfect 500/500, while the 3rd rank holder secured 498/500.
                    </p>
                  </div>

                  <Button variant="link" className="p-0 h-auto text-saffron font-black tracking-widest group/link">
                    READ FULL STORY 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-7xl font-serif font-black text-deep-blue max-w-4xl mx-auto leading-tight">
            Ready to make an <span className="text-saffron italic underline decoration-wavy underline-offset-8">impact</span> together?
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your support provides more than just books; it provides hope, opportunity, 
            and a path out of poverty for thousands of children.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Button variant="secondary" size="lg">Become a Partner</Button>
            <Link href="/donate">
              <Button variant="primary" size="lg" className="bg-saffron hover:bg-orange-600">Start Your Donation</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const programs = [
  {
    title: "Rural Schools",
    description: "Building and supporting safe, modern learning environments in the most remote areas of India.",
    icon: Globe,
    color: "text-blue-600",
  },
  {
    title: "Skill Support",
    description: "Equipping teenagers with vocational skills and digital literacy to ensure future employability.",
    icon: BookOpen,
    color: "text-orange-600",
  },
  {
    title: "Holistic Growth",
    description: "Focusing on yoga, sports, and cultural heritage to develop well-rounded individuals.",
    icon: Users,
    color: "text-green-600",
  },
];
