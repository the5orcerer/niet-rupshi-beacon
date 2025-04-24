import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
            {t("faculty.title")}
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("faculty.description")}
          </p>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader className="h-8 w-8 animate-spin text-niet-blue" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faculty?.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image_url || "https://via.placeholder.com/300"} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-niet-blue font-medium mb-2">{member.position}</p>
                      <p className="text-muted-foreground mb-4">{member.department}</p>
                      <div className="text-sm">
                        <p><strong>Education:</strong> {member.education}</p>
                        <p><strong>Specialization:</strong> {member.specialization}</p>
                        <p><strong>Email:</strong> {member.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
