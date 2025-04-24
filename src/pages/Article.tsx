
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    return <div className="flex justify-center py-20">Loading article...</div>;
  }

  if (!article) {
    return <div className="flex justify-center py-20">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main className="py-20">
        <article className="container mx-auto px-4 max-w-4xl">
          {article.image_url && (
            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
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
            <span>By {article.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString()}
            </time>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
