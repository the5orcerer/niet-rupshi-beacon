
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  is_important: boolean;
}

// Mock data for announcements
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Upcoming Campus Closure",
    content: "The campus will be closed from December 24th to January 2nd for the winter holidays. All administrative offices will be closed during this period.",
    date: "2023-12-15",
    category: "Administrative",
    is_important: true
  },
  {
    id: "2",
    title: "New Computer Lab Opening Ceremony",
    content: "We're excited to announce the opening of our new state-of-the-art computer lab in the Technology Building. The opening ceremony will take place on October 15th at 2:00 PM.",
    date: "2023-10-01",
    category: "Facilities",
    is_important: false
  },
  {
    id: "3",
    title: "Fall Semester Registration Deadline",
    content: "Registration for the Fall semester courses will close on August 15th. Please make sure to complete your course selection before the deadline.",
    date: "2023-08-01",
    category: "Academic",
    is_important: true
  },
  {
    id: "4",
    title: "Faculty Research Symposium",
    content: "The annual Faculty Research Symposium will be held on November 10-12. Faculty members are invited to submit their research abstracts by October 1st.",
    date: "2023-09-15",
    category: "Research",
    is_important: false
  },
  {
    id: "5",
    title: "Library Hours Extended for Exam Period",
    content: "The central library will extend its operating hours from 8:00 AM to midnight during the final examination period (May 15-30).",
    date: "2023-05-01",
    category: "Facilities",
    is_important: false
  },
  {
    id: "6",
    title: "Scholarship Application Deadline",
    content: "The deadline for submitting applications for the Merit Scholarship Program is March 31st. All eligible students are encouraged to apply.",
    date: "2023-03-01",
    category: "Financial",
    is_important: true
  }
];

const Announcements = () => {
  // In a real implementation, you would fetch announcements from Supabase
  // For now, we'll use mock data
  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      // Simulate API call with mock data
      return new Promise<Announcement[]>((resolve) => {
        setTimeout(() => {
          resolve(mockAnnouncements);
        }, 500);
      });
    },
  });

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center space-x-4 mb-8">
            <div className="bg-niet-blue/20 p-3 rounded-full">
              <Bell className="h-8 w-8 text-niet-blue" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-niet-navy dark:text-white">
                Announcements
              </h1>
              <p className="text-muted-foreground mt-2">
                Stay updated with the latest news and events from our institution
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader className="h-24 bg-gray-200 dark:bg-gray-800" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                  </CardContent>
                </Card>
              ))
            ) : (
              announcements?.map((announcement) => (
                <Card 
                  key={announcement.id} 
                  className={`overflow-hidden ${
                    announcement.is_important ? 'border-l-4 border-l-niet-coral' : ''
                  } hover:shadow-md transition-shadow`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      {announcement.is_important && (
                        <Badge variant="destructive">Important</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center justify-between">
                      <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      <Badge variant="outline">{announcement.category}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="px-8">
              Load More Announcements
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Announcements;
