import { useEffect } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
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
        
        {/* Blog Post Hero */}
        <section className="relative pb-20 pt-8 md:pt-12">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] to-transparent h-64 z-0 opacity-70"></div>
          <div className="absolute right-0 top-1/4 rounded-full w-64 h-64 bg-[#4D4DFF]/5 blur-3xl -z-10"></div>
          <div className="absolute left-0 top-1/3 rounded-full w-64 h-64 bg-[#00A0B0]/5 blur-3xl -z-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
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
                <div className="mb-12 md:mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <StarButton href="/blog" size="sm">
                      ← Back to Blog
                    </StarButton>
                    
                    <div className="flex items-center gap-4 text-sm dark:text-[#8B949E] light:text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post[0].date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                  
                  <h1 
                    className="text-3xl md:text-5xl font-poppins font-bold mb-6 gradient-text-animated gradient-text-glow"
                    dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
                  />
                </div>
                
                <div className="bg-transparent backdrop-blur-sm overflow-hidden">
                  {/* Process content to fix headers styling */}
                  <div 
                    className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-poppins prose-a:text-[#00A0B0] hover:prose-a:text-[#4D4DFF] prose-img:rounded-xl prose-p:text-[#8B949E]/90 prose-p:leading-relaxed prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8 prose-blockquote:border-l-[#4D4DFF] prose-blockquote:bg-[#161B22]/60 prose-blockquote:p-4 prose-blockquote:rounded-r-md"
                    dangerouslySetInnerHTML={{ 
                      __html: post[0].content.rendered
                        // Remove duplicate headers (match h1, h2, h3 tags with similar content)
                        .replace(/<h1.*?>Cloud Infrastructure!?<\/h1>/, '')
                        .replace(/<h2.*?>Cloud Infrastructure<\/h2>/, '')
                        // Enhance code blocks
                        .replace(/<pre>/g, '<pre class="rounded-md p-4 bg-[#0D1117] border border-[#30363D]">')
                        // Add line height to paragraphs
                        .replace(/<p>/g, '<p class="mb-5 leading-8">')
                    }}
                  />
                </div>
                
                {/* Calendly Call-to-Action */}
                <div className="mt-16 mb-8 px-6 py-8 rounded-xl bg-gradient-to-br from-[#161B22]/90 to-[#0D1117]/90 border border-[#30363D] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -right-10 top-10 rounded-full w-40 h-40 bg-[#4D4DFF]/20 blur-3xl"></div>
                    <div className="absolute -left-10 bottom-10 rounded-full w-40 h-40 bg-[#00A0B0]/20 blur-3xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-poppins font-bold mb-4">Need help implementing solutions like this?</h3>
                    <p className="text-[#8B949E] mb-6 max-w-2xl">Schedule a free consultation with our experts to discuss your project needs and discover how Digital Studio Labs can help bring your vision to life.</p>
                    <div className="flex flex-wrap gap-4">
                      <StarButton 
                        href="https://calendly.com/digitalstudiolabs/free-consultation" 
                        size="lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Schedule Free Consultation
                      </StarButton>
                      <StarButton 
                        href="/blog" 
                        size="md"
                        variant="outline"
                      >
                        Back to Blog
                      </StarButton>
                    </div>
                  </div>
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