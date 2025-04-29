import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { Spinner } from '@/components/ui/spinner';

// WordPress post type definition
interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  tags: number[];
  featured_media: number;
}

const BlogPage = () => {
  useEffect(() => {
    document.title = 'Blog | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  // Fetch blog posts from WordPress REST API
  const { data: posts, isLoading, error } = useQuery<WordPressPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await fetch('https://mediumpurple-buffalo-559300.hostingersite.com/wp-json/wp/v2/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Strip HTML tags from content
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Floating Orbs Background */}
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
          <FloatingOrbs 
            count={12}
            colors={['#4D4DFF', '#00A0B0']}
            minSize={100}
            maxSize={400}
            minSpeed={0.1}
            maxSpeed={0.3}
            minOpacity={0.03}
            maxOpacity={0.08}
          />
        </div>
        
        {/* Hero Section - Reduced spacing */}
        <SpotlightLayout
          className="relative overflow-hidden py-12 md:py-16 bg-transparent"
          spotlightColor="rgba(77, 77, 255, 0.15)"
          spotlightSize={500}
          withMultipleSpotlights={true}
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
              Our <span className="gradient-text-animated gradient-text-glow">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl dark:text-[#8B949E] light:text-gray-600 mb-0">
              Insights, updates, and thoughts from the Digital Studio Labs team
            </p>
          </motion.div>
        </SpotlightLayout>

        {/* Blog Posts Section - Much tighter spacing */}
        <section className="pt-4 pb-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium mb-4 text-red-500">Error loading blog posts</h3>
                <p className="dark:text-[#8B949E] light:text-gray-600">
                  Please try again later or contact us if the issue persists.
                </p>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="max-w-5xl mx-auto">
                {posts.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    className="relative mb-10 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <a 
                      href={`/blog/${post.slug}`}
                      className="block overflow-hidden"
                    >
                      <div className="bg-transparent backdrop-blur-sm border-b border-gray-700/30 pb-10 relative">
                        {/* Subtle divider with gradient */}
                        {index !== posts.length - 1 && (
                          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4D4DFF]/20 to-transparent"></div>
                        )}
                        
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          {/* Left content */}
                          <div className="w-full md:w-3/4 relative z-10">
                            {/* Date and reading time */}
                            <div className="flex items-center gap-4 mb-3 text-sm dark:text-[#8B949E] light:text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{formatDate(post.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>5 min read</span>
                              </div>
                            </div>
                            
                            {/* Title with hover effect */}
                            <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-4 group-hover:text-[#00A0B0] transition-colors duration-300">
                              <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                            </h2>
                            
                            {/* Excerpt with subtle fade effect */}
                            <div 
                              className="prose dark:prose-invert prose-md mb-4 dark:text-[#8B949E]/90 light:text-gray-600 line-clamp-3 relative"
                              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                            />
                          </div>
                          
                          {/* Right icon with hover effect */}
                          <div className="hidden md:flex md:w-1/4 justify-end items-start pt-4">
                            <div className="relative p-4 group-hover:scale-110 transition-transform duration-300">
                              <div className="rounded-full bg-gradient-to-br from-[#4D4DFF]/80 to-[#00A0B0]/80 p-4 backdrop-blur-md shadow-lg relative">
                                <ArrowUpRight className="w-6 h-6 text-white" />
                                <div className="absolute inset-0 rounded-full bg-[#4D4DFF]/20 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium mb-4">No posts found</h3>
                <p className="dark:text-[#8B949E] light:text-gray-600">
                  Check back soon for new content!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage; 