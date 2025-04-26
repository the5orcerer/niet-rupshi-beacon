import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";
import { ArticleActions } from "@/components/ArticleActions";
import { Toaster } from "@/components/ui/sonner";

// Add a demo article if no article is found
const demoArticle = {
  id: "demo-article",
  title: "Advancing Technology Education: A New Paradigm",
  content: `In today's rapidly evolving technological landscape, education plays a pivotal role in shaping the future workforce. Our institution stands at the forefront of this evolution, implementing innovative teaching methodologies and cutting-edge curriculum design.

The integration of practical, hands-on experience with theoretical knowledge has proven to be highly effective in preparing students for real-world challenges. Through our state-of-the-art laboratories and industry partnerships, students gain invaluable exposure to current industry practices and emerging technologies.

Furthermore, our research initiatives continue to push boundaries in various fields, from artificial intelligence to sustainable engineering. These endeavors not only contribute to the body of knowledge but also provide students with opportunities to participate in groundbreaking research projects.

We remain committed to fostering an environment of innovation, critical thinking, and technological excellence. Our goal is to empower the next generation of engineers and technologists to make meaningful contributions to society through their work and research.`,
  image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  author: "Dr. Sarah Johnson",
  published_at: new Date().toISOString(),
  excerpt: "Exploring the future of technology education and its impact on shaping tomorrow's innovators.",
};

const Article = () => {
  const { id } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      if (id === "demo-article") {
        return demoArticle;
      }
      
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data || demoArticle; // Fallback to demo article if none found
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
          
          <div className="flex items-center justify-between mb-8 text-muted-foreground">
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
            <ArticleActions articleId={article.id} />
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
      <Toaster />
    </div>
  );
};

export default Article;
