import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { BackToTop } from "@/components/BackToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Placeholder sections - we would create individual component files for these in a complete implementation
const About = () => (
  <section id="about" className="py-20 bg-white dark:bg-niet-navy/20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins text-niet-navy dark:text-white">About NIET</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 dark:bg-niet-navy/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 text-niet-navy dark:text-white">Our History</h3>
          <p className="text-gray-700 dark:text-gray-300">Founded in 2005, NIET has established itself as a premier institution for technical education in Bangladesh, continuously evolving to meet the demands of the industry.</p>
        </div>
        <div className="bg-gray-50 dark:bg-niet-navy/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 text-niet-navy dark:text-white">Our Mission</h3>
          <p className="text-gray-700 dark:text-gray-300">To provide quality education in engineering and technology, fostering innovation and research while preparing students for the global workforce with practical skills.</p>
        </div>
        <div className="bg-gray-50 dark:bg-niet-navy/40 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 text-niet-navy dark:text-white">Our Values</h3>
          <p className="text-gray-700 dark:text-gray-300">Excellence, integrity, innovation, inclusivity, and social responsibility guide every aspect of our institution's operation and educational philosophy.</p>
        </div>
      </div>
    </div>
  </section>
);

const Programs = () => (
  <section id="programs" className="py-20 bg-gray-50 dark:bg-niet-navy/10">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins text-niet-navy dark:text-white">Our Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['Computer Science & Engineering', 'Electrical & Electronic Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Business Administration', 'Architecture'].map((program, index) => (
          <div key={index} className="bg-white dark:bg-niet-navy/30 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
            <div className="h-48 bg-gradient-to-r from-niet-blue to-niet-cyan flex items-center justify-center">
              <div className="rounded-full bg-white/20 p-6 group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-niet-navy dark:text-white">{program}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Comprehensive curriculum with emphasis on practical skills and industry-relevant knowledge.</p>
              <a href="#" className="text-niet-blue hover:text-niet-cyan transition-colors font-medium">Learn more &rarr;</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Faculty = () => {
  const { data: faculty, isLoading } = useQuery({
    queryKey: ["faculty"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) return null;

  return (
    <section id="faculty" className="py-20 bg-gray-50 dark:bg-niet-navy/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins text-niet-navy dark:text-white">
          Our Esteemed Faculty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faculty?.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image_url || '/placeholder.svg'} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <div className="flex items-center mb-2">
                    <Badge variant="secondary">{member.position}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <Link 
                    to="/faculty" 
                    className="text-niet-blue hover:text-niet-cyan transition-colors"
                  >
                    View Full Profile &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/faculty" 
            className="inline-block px-6 py-3 bg-niet-blue text-white rounded-lg hover:bg-niet-cyan transition-colors"
          >
            Meet All Faculty Members
          </Link>
        </div>
      </div>
    </section>
  );
};

const Articles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .limit(4);
      
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) return null;

  return (
    <section id="blog" className="py-20 bg-white dark:bg-niet-navy/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-poppins text-niet-navy dark:text-white">
          Latest Research & Insights
        </h2>
        <Carousel className="w-full">
          <CarouselContent>
            {articles?.map((article) => (
              <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image_url || '/placeholder.svg'} 
                        alt={article.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground">By {article.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen font-inter">
          <Navbar />
          <Hero />
          <About />
          <Programs />
          <Faculty />
          <Gallery />
          <Articles />
          <Footer />
          <BackToTop />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default Index;
