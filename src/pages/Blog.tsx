
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ArticleActions } from "@/components/ArticleActions";
import { Toaster } from "@/components/ui/sonner";

const Blog = () => {
  const [page, setPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(6); // Initial display count
  const itemsPerPage = 6;

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

  const loadMore = () => {
    setDisplayCount(prevCount => prevCount + itemsPerPage);
  };

  const totalPages = articles ? Math.ceil(articles.length / itemsPerPage) : 0;
  const displayedArticles = articles ? articles.slice(0, displayCount) : [];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-niet-navy dark:text-white">
            Blog & News
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Stay up-to-date with the latest research, innovations, and events at the National Institute of Engineering and Technology.
          </p>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader className="h-10 w-10 animate-spin text-niet-blue mb-4" />
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedArticles?.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardContent className="p-0 h-full flex flex-col">
                      {article.image_url && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={article.image_url} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-col gap-4">
                          <ArticleActions articleId={article.id} />
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              By {article.author}
                            </span>
                            <Link 
                              to={`/blog/${article.id}`}
                              className="text-niet-blue hover:text-niet-cyan transition-colors font-medium"
                            >
                              Read more →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {articles && displayCount < articles.length && (
                <div className="mt-12 flex justify-center">
                  <Button 
                    onClick={loadMore}
                    variant="outline" 
                    className="px-8 py-2 border-niet-blue text-niet-blue hover:bg-niet-blue/10"
                  >
                    Load More Articles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Blog;
