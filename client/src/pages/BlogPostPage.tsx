import { useEffect } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { Spinner } from '@/components/ui/spinner';
import StarButton from '@/components/ui/star-button';

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

const BlogPostPage = () => {
  // Extract the slug from the URL
  const [, params] = useRoute<{ slug: string }>('/blog/:slug');
  const slug = params?.slug || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch blog post by slug
  const { data: post, isLoading, error } = useQuery<WordPressPost[]>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await fetch(`https://mediumpurple-buffalo-559300.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Update document title when post loads
  useEffect(() => {
    if (post && post[0]) {
      const title = new DOMParser().parseFromString(post[0].title.rendered, 'text/html').body.textContent;
      document.title = `${title} | Digital Studio Labs Blog`;
    }
  }, [post]);

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
        
        {/* Blog Post Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium mb-4 text-red-500">Error loading blog post</h3>
                <p className="dark:text-[#8B949E] light:text-gray-600 mb-8">
                  Please try again later or contact us if the issue persists.
                </p>
                <StarButton href="/blog" size="md">
                  Back to Blog
                </StarButton>
              </div>
            ) : post && post.length > 0 ? (
              <motion.div 
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-8">
                  <StarButton href="/blog" size="sm" className="mb-6">
                    ← Back to Blog
                  </StarButton>
                  <h1 
                    className="text-3xl md:text-5xl font-poppins font-bold mb-4"
                    dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
                  />
                  <div className="text-sm dark:text-[#8B949E] light:text-gray-500 mb-6">
                    {formatDate(post[0].date)}
                  </div>
                </div>
                
                <div className="dark:bg-[#161B22]/80 light:bg-white/60 backdrop-blur-md rounded-xl overflow-hidden border dark:border-[#30363D] light:border-gray-200/70 shadow-lg p-6 md:p-10">
                  <div 
                    className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-poppins prose-a:text-[#00A0B0] hover:prose-a:text-[#4D4DFF] prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
                  />
                </div>
                
                <div className="mt-10 flex justify-center">
                  <StarButton href="/blog" size="md">
                    Back to Blog
                  </StarButton>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium mb-4">Post not found</h3>
                <p className="dark:text-[#8B949E] light:text-gray-600 mb-8">
                  The blog post you're looking for might have been removed or doesn't exist.
                </p>
                <StarButton href="/blog" size="md">
                  Back to Blog
                </StarButton>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage; 