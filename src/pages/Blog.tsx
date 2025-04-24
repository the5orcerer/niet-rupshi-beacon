
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

const Blog = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-niet-navy dark:text-white">
            Blog & News
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center">Loading articles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles?.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {article.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={article.image_url} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          By {article.author}
                        </span>
                        <Link 
                          to={`/blog/${article.id}`}
                          className="text-niet-blue hover:text-niet-cyan transition-colors"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
