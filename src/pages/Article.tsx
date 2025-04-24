
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";

const Article = () => {
  const { id } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-niet-blue" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-niet-navy dark:text-white">Article not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {article.image_url && (
            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-niet-navy dark:text-white">
            {article.title}
          </h1>
          
          <div className="flex items-center mb-8 text-muted-foreground">
            <div className="flex items-center">
              <span className="font-medium">By {article.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={article.published_at} className="text-sm">
                {new Date(article.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
