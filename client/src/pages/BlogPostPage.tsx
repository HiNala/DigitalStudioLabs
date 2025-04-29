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

// Helper function to clean up and format blog post content
const processPostContent = (content: string, postTitle: string) => {
  const titleWithoutTags = postTitle.replace(/<\/?[^>]+(>|$)/g, "").trim();
  
  // Prepare regexes for title variants (with/without punctuation)
  const titleRegexBase = escapeRegExp(titleWithoutTags);
  const titleRegexWithExclamation = escapeRegExp(titleWithoutTags + "!");
  const titleRegexWithDots = escapeRegExp(titleWithoutTags + "..");
  
  // Process the content with all our fixes
  return content
    // Remove any instance of the post title that appears as a heading
    .replace(new RegExp(`<h1[^>]*>${titleRegexBase}</h1>`, 'i'), '')
    .replace(new RegExp(`<h1[^>]*>${titleRegexWithExclamation}</h1>`, 'i'), '')
    .replace(new RegExp(`<h1[^>]*>${titleRegexWithDots}</h1>`, 'i'), '')
    .replace(new RegExp(`<h2[^>]*>${titleRegexBase}</h2>`, 'i'), '')
    .replace(new RegExp(`<h2[^>]*>${titleRegexWithExclamation}</h2>`, 'i'), '')
    .replace(new RegExp(`<h2[^>]*>${titleRegexWithDots}</h2>`, 'i'), '')
    .replace(new RegExp(`<h3[^>]*>${titleRegexBase}</h3>`, 'i'), '')
    .replace(new RegExp(`<h3[^>]*>${titleRegexWithExclamation}</h3>`, 'i'), '')
    .replace(new RegExp(`<h3[^>]*>${titleRegexWithDots}</h3>`, 'i'), '')
    
    // Remove duplicate Introduction headings (common in WordPress exports)
    .replace(/<h[1-3][^>]*>Introduction<\/h[1-3]>\s*<h[1-3][^>]*>Introduction<\/h[1-3]>/i, '<h2>Introduction</h2>')
    
    // Ensure consistent headings (if Introduction appears twice with different levels, keep only one)
    .replace(/<h[1-3][^>]*>Introduction<\/h[1-3]>[\s\n]*<h[1-3][^>]*>Introduction<\/h[1-3]>/i, '<h2>Introduction</h2>')
    
    // Fix spacing for all heading levels
    .replace(/<\/h1>\s*<p>/g, '</h1><p class="mt-1">')
    .replace(/<\/h2>\s*<p>/g, '</h2><p class="mt-1">')
    .replace(/<\/h3>\s*<p>/g, '</h3><p class="mt-1">')
    
    // Enhance code blocks
    .replace(/<pre>/g, '<pre class="rounded-md p-4 bg-[#0D1117] border border-[#30363D]">')
    
    // Improve paragraph formatting and spacing
    .replace(/<p>/g, '<p class="mb-3 leading-7">')
    
    // Fix spacing between sections
    .replace(/<\/p>\s*<h1/g, '</p><h1 class="mt-8"')
    .replace(/<\/p>\s*<h2/g, '</p><h2 class="mt-6"')
    .replace(/<\/p>\s*<h3/g, '</p><h3 class="mt-4"')
    
    // Add custom styling to lists
    .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4 space-y-1">')
    .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4 space-y-1">')
    .replace(/<li>/g, '<li class="mb-1">');
};

// Utility function to escape regex special characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
        <section className="relative pb-16 pt-2 md:pt-6">
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
                <a href="/blog" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors inline-flex items-center gap-1.5">
                  <span>← Back to Blog</span>
                </a>
              </div>
            ) : post && post.length > 0 ? (
              <motion.div 
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-3 md:mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <a href="/blog" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors inline-flex items-center gap-1.5">
                      <span>← Back to Blog</span>
                    </a>
                    
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
                    className="text-3xl md:text-5xl font-poppins font-bold mb-2 gradient-text-animated gradient-text-glow"
                    dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
                  />
                </div>
                
                <div className="bg-transparent backdrop-blur-sm overflow-hidden">
                  {/* Process content to fix headers styling */}
                  <div 
                    className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-poppins prose-a:text-[#00A0B0] hover:prose-a:text-[#4D4DFF] prose-img:rounded-xl prose-p:text-[#8B949E]/90 prose-p:leading-relaxed prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-headings:font-bold prose-headings:mb-0 prose-headings:mt-0 prose-blockquote:border-l-[#4D4DFF] prose-blockquote:bg-[#161B22]/60 prose-blockquote:p-4 prose-blockquote:rounded-r-md"
                    dangerouslySetInnerHTML={{ 
                      __html: processPostContent(post[0].content.rendered, post[0].title.rendered)
                    }}
                  />
                  
                  {/* Share Section - moved closer to content */}
                  <div className="mt-6 mb-8 pb-6 border-b border-gray-700/30 text-center">
                    <p className="text-[#8B949E] mb-3">If you enjoyed this article, share it:</p>
                    <div className="flex justify-center gap-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post[0].title.rendered)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-[#1DA1F2] hover:bg-[#1a94e0] rounded-full p-2 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-[#0A66C2] hover:bg-[#0958a8] rounded-full p-2 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-[#1877F2] hover:bg-[#166bda] rounded-full p-2 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="mt-6">
                      <a href="/blog" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors inline-flex items-center gap-1.5">
                        <span>← Back to Blog</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Calendly Call-to-Action */}
                <div className="mt-12 mb-8 px-6 py-8 rounded-xl bg-gradient-to-br from-[#161B22]/90 to-[#0D1117]/90 border border-[#30363D] relative overflow-hidden">
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
                <a href="/blog" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors inline-flex items-center gap-1.5">
                  <span>← Back to Blog</span>
                </a>
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