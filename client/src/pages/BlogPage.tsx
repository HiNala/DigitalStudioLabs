import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
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
        
        {/* Hero Section */}
        <SpotlightLayout
          className="relative overflow-hidden py-20 md:py-28 bg-transparent"
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
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-8">
              Our <span className="gradient-text-animated gradient-text-glow">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl dark:text-[#8B949E] light:text-gray-600 mb-8">
              Insights, updates, and thoughts from the Digital Studio Labs team
            </p>
          </motion.div>
        </SpotlightLayout>

        {/* Blog Posts Section */}
        <section className="py-16 md:py-24">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <motion.article 
                    key={post.id}
                    className="dark:bg-[#161B22]/80 light:bg-white/60 backdrop-blur-md rounded-xl overflow-hidden border dark:border-[#30363D] light:border-gray-200/70 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-6">
                      <div className="mb-3 text-sm dark:text-[#8B949E] light:text-gray-500">
                        {formatDate(post.date)}
                      </div>
                      <h2 className="text-xl font-bold mb-4 hover:text-[#00A0B0] transition-colors duration-300">
                        <a href={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </h2>
                      <div 
                        className="prose dark:prose-invert prose-sm mb-4 dark:text-[#8B949E] light:text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <a 
                        href={`/blog/${post.slug}`}
                        className="inline-block text-[#00A0B0] hover:text-[#4D4DFF] transition-colors duration-300 font-medium"
                      >
                        Read More →
                      </a>
                    </div>
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