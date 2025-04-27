import { useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { Spinner } from '@/components/ui/spinner';
import StarButton from '@/components/ui/star-button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
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
      const response = await fetch(`https://mediumpurple-buffalo-559300.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  // Calculate estimated reading time
  const getReadingTime = (content: string) => {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
    return readingTime;
  };

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
      <main className="pt-20 min-h-screen">
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
                  <Link to="/blog" className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] transition-colors duration-300 font-medium mb-8">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Blog
                  </Link>
                  
                  {/* Title */}
                  <motion.h1
                    className="text-3xl md:text-5xl font-poppins font-bold mb-4"
                    dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  
                  {/* Meta information */}
                  <motion.div 
                    className="flex flex-wrap gap-4 md:gap-6 mb-8 text-sm dark:text-[#8B949E] light:text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(post[0].date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {getReadingTime(post[0].content.rendered)} min read
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      <Badge variant="secondary" className="mr-2">
                        Blog
                      </Badge>
                    </div>
                  </motion.div>
                </div>
                
                {/* Featured image - conditionally render if available */}
                {post[0]._embedded && post[0]._embedded['wp:featuredmedia'] && post[0]._embedded['wp:featuredmedia'][0] && (
                  <motion.div 
                    className="mb-8 overflow-hidden rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <img 
                      src={post[0]._embedded['wp:featuredmedia'][0].source_url} 
                      alt={post[0]._embedded['wp:featuredmedia'][0].alt_text || post[0].title.rendered}
                      className="w-full h-auto object-cover rounded-xl shadow-lg"
                    />
                  </motion.div>
                )}
                
                {/* Post content */}
                <Card className="border dark:border-[#30363D] light:border-gray-200/70 dark:bg-[#161B22]/80 light:bg-white/60 backdrop-blur-md shadow-lg overflow-hidden">
                  <CardContent className="p-6 md:p-10">
                    <motion.div 
                      className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-poppins prose-a:text-[#00A0B0] hover:prose-a:text-[#4D4DFF] prose-img:rounded-xl prose-img:shadow-md prose-pre:bg-[#0D1117] dark:prose-pre:bg-black/50 prose-code:text-[#00A0B0]"
                      dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </CardContent>
                </Card>
                
                {/* Post navigation */}
                <motion.div 
                  className="mt-10 flex justify-between items-center flex-wrap gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] transition-colors duration-300 font-medium"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Blog
                  </Link>
                  
                  <StarButton href="/contact" size="sm">
                    Get in Touch
                  </StarButton>
                </motion.div>
              </motion.div>
            ) : (
              <div className="text-center py-12 dark:bg-[#161B22]/80 light:bg-white/60 backdrop-blur-md rounded-xl overflow-hidden border dark:border-[#30363D] light:border-gray-200/70 shadow-lg p-8">
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