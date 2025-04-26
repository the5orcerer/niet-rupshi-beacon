import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FacultyCard } from "@/components/FacultyCard";

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
      return data;
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
            Meet our exceptional team of educators and researchers dedicated to shaping the future through innovation and excellence in education. Our faculty members bring diverse expertise and real-world experience to the classroom.
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
