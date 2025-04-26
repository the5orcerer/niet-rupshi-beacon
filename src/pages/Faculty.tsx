
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FacultyCard } from "@/components/FacultyCard";

// Demo faculty data
const demoFaculty = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    position: "Professor",
    department: "Computer Science",
    email: "sarah.johnson@niet.edu",
    phone: "+1234567890",
    education: ["Ph.D. in Computer Science, MIT", "M.S. in AI, Stanford"],
    bio: "Leading researcher in Artificial Intelligence and Machine Learning with over 15 years of experience.",
    image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    linkedin_url: "https://linkedin.com",
    research_interests: ["AI", "Machine Learning", "Neural Networks"]
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    position: "Associate Professor",
    department: "Electrical Engineering",
    email: "michael.chen@niet.edu",
    phone: "+1234567891",
    education: ["Ph.D. in Electrical Engineering, Berkeley"],
    bio: "Specialized in VLSI design and embedded systems. Published numerous papers in top conferences.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    linkedin_url: "https://linkedin.com",
    research_interests: ["VLSI Design", "Embedded Systems", "IoT"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    position: "Assistant Professor",
    department: "Mechanical Engineering",
    email: "emily.rodriguez@niet.edu",
    phone: "+1234567892",
    education: ["Ph.D. in Robotics, ETH Zurich"],
    bio: "Robotics expert focusing on human-robot interaction and collaborative robotics.",
    image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    linkedin_url: "https://linkedin.com",
    research_interests: ["Robotics", "Human-Robot Interaction", "Control Systems"]
  }
];

const Faculty = () => {
  const { t } = useLanguage();
  
  const { data: faculty, isLoading } = useQuery({
    queryKey: ["faculty"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data?.length ? data : demoFaculty; // Use demo faculty if no data
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center text-niet-navy dark:text-white">
            Our Distinguished Faculty
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Meet our exceptional team of educators and researchers who are passionate about shaping the future through innovation and excellence in education.
          </p>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader className="h-8 w-8 animate-spin text-niet-blue" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faculty?.map((member) => (
                <FacultyCard key={member.id} faculty={member} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faculty;
