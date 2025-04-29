import { useEffect, useState, useMemo } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Share2, 
  BookOpen, 
  ChevronLeft, 
  Bookmark, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Copy, 
  Check
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { Spinner } from '@/components/ui/spinner';
import StarButton from '@/components/ui/star-button';
import { useTheme } from '@/providers/ThemeProvider';

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

// Reading time calculation function
const calculateReadingTime = (content: string): number => {
  // Strip HTML tags
  const text = content.replace(/<\/?[^>]+(>|$)/g, '');
  // Count words (roughly)
  const wordCount = text.split(/\s+/).length;
  // Average reading speed: 200-250 words per minute
  const readingTimeMinutes = Math.ceil(wordCount / 225);
  return Math.max(1, readingTimeMinutes); // Minimum 1 minute
};

// Blog content processor with expert-level formatting
const processBlogContent = (content: string, postTitle: string): string => {
  // Extract title without HTML tags
  const plainTitle = postTitle.replace(/<\/?[^>]+(>|$)/g, '').trim();
  
  // Step 1: Clean the content first
  let processedContent = content
    // Remove WordPress auto-generated title elements that match the post title
    .replace(new RegExp(`<h1[^>]*>${plainTitle}[.!?]*</h1>`, 'gi'), '')
    .replace(new RegExp(`<h2[^>]*>${plainTitle}[.!?]*</h2>`, 'gi'), '')
    .replace(new RegExp(`<h3[^>]*>${plainTitle}[.!?]*</h3>`, 'gi'), '')
    // Remove all consecutive br tags (common in WordPress exports)
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '')
    .replace(/<br\s*\/?>/gi, '')
    // Remove all empty paragraphs
    .replace(/<p>\s*(&nbsp;)*\s*<\/p>/gi, '')
    // Remove height-setting divs that create large gaps
    .replace(/<div style="height:\s*\d+px[^>]*><\/div>/gi, '')
    // Remove excessive newlines
    .replace(/\n\s*\n/g, '\n');
  
  // Step 2: Handle duplicate introduction sections (common problem)
  const introductionMatches = processedContent.match(/<h[1-3][^>]*>Introduction[.!?]*<\/h[1-3]>/gi);
  if (introductionMatches && introductionMatches.length > 1) {
    // Remove all Introduction headings
    processedContent = processedContent.replace(/<h[1-3][^>]*>Introduction[.!?]*<\/h[1-3]>/gi, '');
    
    // Find the first paragraph or heading to insert before
    const firstContentMatch = processedContent.match(/<(p|h[1-6])[^>]*>/i);
    if (firstContentMatch && firstContentMatch.index !== undefined) {
      // Add single styled introduction heading
      processedContent = 
        processedContent.slice(0, firstContentMatch.index) +
        '<div class="blog-section-intro"><h2 id="introduction" class="blog-heading">Introduction</h2></div>' +
        processedContent.slice(firstContentMatch.index);
    }
  }
  
  // Step 3: Apply premium styling to enhance readability
  
  // 3.1: Style headings with proper hierarchy and custom classes
  processedContent = processedContent
    .replace(/<h1([^>]*)>(.*?)<\/h1>/gi, '<div class="blog-section"><h1$1 class="blog-heading blog-heading-1">$2</h1></div>')
    .replace(/<h2([^>]*)>(.*?)<\/h2>/gi, '<div class="blog-section"><h2$1 class="blog-heading blog-heading-2">$2</h2></div>')
    .replace(/<h3([^>]*)>(.*?)<\/h3>/gi, '<div class="blog-section"><h3$1 class="blog-heading blog-heading-3">$2</h3></div>');
  
  // 3.2: Enhance paragraphs with better typography
  processedContent = processedContent
    .replace(/<p([^>]*)>(.*?)<\/p>/gi, '<p$1 class="blog-paragraph">$2</p>');
  
  // 3.3: Style lists for better readability
  processedContent = processedContent
    .replace(/<ul([^>]*)>/gi, '<ul$1 class="blog-list blog-list-unordered">')
    .replace(/<ol([^>]*)>/gi, '<ol$1 class="blog-list blog-list-ordered">')
    .replace(/<li([^>]*)>(.*?)<\/li>/gi, '<li$1 class="blog-list-item">$2</li>');
  
  // 3.4: Enhance code blocks with syntax highlighting styling
  processedContent = processedContent
    .replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/g, '<pre$1 class="blog-code-block">$2</pre>')
    .replace(/<code([^>]*)>([\s\S]*?)<\/code>/g, '<code$1 class="blog-code">$2</code>');
  
  // 3.5: Style blockquotes for impactful callouts
  processedContent = processedContent
    .replace(/<blockquote([^>]*)>([\s\S]*?)<\/blockquote>/g, 
      '<blockquote$1 class="blog-blockquote"><div class="blog-blockquote-content">$2</div></blockquote>');
  
  // 3.6: Enhance images with proper framing and lazy loading
  processedContent = processedContent
    .replace(/<img([^>]*)>/gi, '<div class="blog-image-container"><img$1 loading="lazy" class="blog-image"></div>');
  
  // 3.7: Add table styling
  processedContent = processedContent
    .replace(/<table([^>]*)>/gi, '<div class="blog-table-container"><table$1 class="blog-table">')
    .replace(/<\/table>/gi, '</table></div>')
    .replace(/<th([^>]*)>/gi, '<th$1 class="blog-table-header">')
    .replace(/<td([^>]*)>/gi, '<td$1 class="blog-table-cell">');
  
  // 3.8: Style links for better visibility and interaction
  processedContent = processedContent
    .replace(/<a([^>]*)href="([^"]*)"([^>]*)>(.*?)<\/a>/gi, 
      '<a$1href="$2"$3 class="blog-link" target="_blank" rel="noopener noreferrer">$4</a>');

  // 3.9: Add formatting for emphasis elements
  processedContent = processedContent
    .replace(/<strong([^>]*)>(.*?)<\/strong>/gi, '<strong$1 class="blog-strong">$2</strong>')
    .replace(/<em([^>]*)>(.*?)<\/em>/gi, '<em$1 class="blog-emphasis">$2</em>');
  
  // 3.10: Add section dividers between major sections for better visual separation
  processedContent = processedContent
    .replace(/<\/div>\s*<div class="blog-section">/gi, 
      '</div><div class="blog-section-divider"></div><div class="blog-section">');
  
  return processedContent;
};

// Share functionality hook
const useShare = (url: string, title: string) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy URL: ', err));
  };

  return {
    copied,
    copyToClipboard,
    shareLinks: {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
  };
};

// The main BlogPostPage component with premium design
const BlogPostPage = () => {
  const [, params] = useRoute<{ slug: string }>('/blog/:slug');
  const slug = params?.slug || '';
  const { theme } = useTheme();
  const [showToc, setShowToc] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch the blog post data
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

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!post || !post[0]) return 5; // Default
    return calculateReadingTime(post[0].content.rendered);
  }, [post]);

  // Process the content for expert-level formatting
  const processedContent = useMemo(() => {
    if (!post || !post[0]) return '';
    return processBlogContent(post[0].content.rendered, post[0].title.rendered);
  }, [post]);

  // Share functionality
  const { copied, copyToClipboard, shareLinks } = useShare(
    typeof window !== 'undefined' ? window.location.href : '',
    post && post[0] ? post[0].title.rendered : ''
  );

  // Update document title
  useEffect(() => {
    if (post && post[0]) {
      const title = new DOMParser().parseFromString(post[0].title.rendered, 'text/html').body.textContent;
      document.title = `${title} | Digital Studio Labs Blog`;
    }
  }, [post]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-10">
        {/* Ambient background effects */}
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
        
        {/* Article Header with ambient gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#0D1117]/90 to-transparent opacity-80"></div>
          <div className="absolute -right-32 top-0 rounded-full w-96 h-96 bg-[#4D4DFF]/5 blur-3xl"></div>
          <div className="absolute -left-32 top-64 rounded-full w-96 h-96 bg-[#00A0B0]/5 blur-3xl"></div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#161B22]/60 backdrop-blur-sm border border-[#30363D] rounded-xl p-8 max-w-lg mx-auto"
              >
                <h3 className="text-2xl font-medium mb-4 text-red-400">Error Loading Article</h3>
                <p className="text-[#8B949E] mb-8">
                  We couldn't load this article. Please try again later or contact us if the issue persists.
                </p>
                <a 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-[#00A0B0] hover:text-[#4D4DFF] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Return to Blog</span>
                </a>
              </motion.div>
            </div>
          ) : post && post.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 py-6">
              {/* Main article column */}
              <motion.div 
                className="w-full lg:w-3/4 lg:pr-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back to blog link */}
                <div className="mb-4">
                  <a 
                    href="/blog" 
                    className="inline-flex items-center gap-2 text-[#00A0B0] hover:text-[#4D4DFF] transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Blog</span>
                  </a>
                </div>
                
                {/* Article header */}
                <header className="mb-6">
                  <h1 
                    className="text-3xl md:text-5xl font-poppins font-bold mb-4 gradient-text-animated leading-tight"
                    dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
                  />
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#8B949E]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post[0].date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{readingTime} min read</span>
                    </div>
                    <button 
                      onClick={() => setShowToc(!showToc)}
                      className="flex items-center gap-2 text-[#00A0B0] hover:text-[#4D4DFF] transition-colors"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{showToc ? 'Hide Table of Contents' : 'Show Table of Contents'}</span>
                    </button>
                  </div>
                </header>
                
                {/* Table of Contents (conditionally shown) */}
                <AnimatePresence>
                  {showToc && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#161B22]/90 to-[#0D1117]/90 border border-[#30363D]">
                        <h2 className="text-xl font-bold mb-2">Table of Contents</h2>
                        <div className="blog-toc-content">
                          {/* TOC would be generated here - placeholder for now */}
                          <ul className="space-y-1">
                            <li>
                              <a href="#introduction" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                                Introduction
                              </a>
                            </li>
                            <li>
                              <a href="#key-concepts" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                                Key Concepts
                              </a>
                            </li>
                            <li>
                              <a href="#implementation" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                                Implementation
                              </a>
                            </li>
                            <li>
                              <a href="#conclusion" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                                Conclusion
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Main article content */}
                <article className="relative">
                  {/* Premium styled content */}
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                  
                  {/* Article footer with sharing options */}
                  <div className="mt-10 mb-6 pt-6 border-t border-[#30363D]/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[#8B949E]">Share this article:</span>
                        <div className="flex items-center gap-2">
                          <a 
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
                            aria-label="Share on Twitter"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                          <a 
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] transition-colors"
                            aria-label="Share on LinkedIn"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                          <a 
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors"
                            aria-label="Share on Facebook"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                          <button
                            onClick={copyToClipboard}
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#E6EDF3]/10 hover:bg-[#E6EDF3]/20 text-[#E6EDF3] transition-colors relative"
                            aria-label="Copy link"
                          >
                            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                            {copied && (
                              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-green-400 whitespace-nowrap">
                                Copied!
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <a
                          href="/blog"
                          className="inline-flex items-center gap-2 text-[#00A0B0] hover:text-[#4D4DFF] transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Back to all articles</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
                
                {/* Calendly Call-to-Action */}
                <div className="mt-8 mb-6 px-6 py-6 rounded-xl bg-gradient-to-br from-[#161B22]/90 to-[#0D1117]/90 border border-[#30363D] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -right-10 top-10 rounded-full w-40 h-40 bg-[#4D4DFF]/20 blur-3xl"></div>
                    <div className="absolute -left-10 bottom-10 rounded-full w-40 h-40 bg-[#00A0B0]/20 blur-3xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-poppins font-bold mb-3">Need help implementing solutions like this?</h3>
                    <p className="text-[#8B949E] mb-4 max-w-2xl">
                      Schedule a free consultation with our experts to discuss your project needs and discover 
                      how Digital Studio Labs can help bring your vision to life.
                    </p>
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
              </motion.div>
              
              {/* Sidebar column (only on desktop) */}
              <motion.aside
                className="hidden lg:block w-1/4 relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="sticky top-24 w-full">
                  {/* Author profile */}
                  <div className="p-4 rounded-xl bg-[#161B22]/40 backdrop-blur-sm border border-[#30363D] mb-4">
                    <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] flex items-center justify-center text-white font-bold text-lg">
                        D
                      </div>
                      <div>
                        <h4 className="font-medium">Digital Studio Labs</h4>
                        <p className="text-sm text-[#8B949E]">Tech & Development Team</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#8B949E]">
                      Our team of experts shares insights on the latest technologies, 
                      development practices, and digital transformation strategies.
                    </p>
                  </div>
                  
                  {/* Related content */}
                  <div className="p-4 rounded-xl bg-[#161B22]/40 backdrop-blur-sm border border-[#30363D] mb-4">
                    <h3 className="text-lg font-semibold mb-3">Related Articles</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="/blog/cloud-infrastructure" className="group">
                          <h4 className="font-medium group-hover:text-[#00A0B0] transition-colors">Cloud Infrastructure</h4>
                          <p className="text-sm text-[#8B949E]">Modern solutions for scalable business operations</p>
                        </a>
                      </li>
                      <li>
                        <a href="/blog/ai-integration" className="group">
                          <h4 className="font-medium group-hover:text-[#00A0B0] transition-colors">AI Integration Strategies</h4>
                          <p className="text-sm text-[#8B949E]">Implementing AI in existing workflows</p>
                        </a>
                      </li>
                      <li>
                        <a href="/blog/software-development" className="group">
                          <h4 className="font-medium group-hover:text-[#00A0B0] transition-colors">Software Development Process</h4>
                          <p className="text-sm text-[#8B949E]">Best practices for efficient development</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Newsletter signup */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#161B22]/90 to-[#0D1117]/90 border border-[#30363D] relative overflow-hidden">
                    <div className="absolute -right-10 bottom-0 rounded-full w-32 h-32 bg-[#4D4DFF]/10 blur-3xl"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                      <p className="text-sm text-[#8B949E] mb-3">
                        Subscribe to our newsletter for the latest insights and articles.
                      </p>
                      <div className="flex flex-col gap-2">
                        <input 
                          type="email" 
                          placeholder="Your email address" 
                          className="w-full px-3 py-2 rounded-md bg-[#0D1117] border border-[#30363D] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A0B0]"
                        />
                        <button className="w-full px-3 py-2 rounded-md bg-gradient-to-r from-[#00A0B0] to-[#4D4DFF] text-white font-medium text-sm hover:opacity-90 transition-opacity">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          ) : (
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#161B22]/60 backdrop-blur-sm border border-[#30363D] rounded-xl p-8 max-w-lg mx-auto"
              >
                <h3 className="text-2xl font-medium mb-4">Article Not Found</h3>
                <p className="text-[#8B949E] mb-8">
                  The article you're looking for might have been removed or doesn't exist.
                </p>
                <a 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-[#00A0B0] hover:text-[#4D4DFF] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Return to Blog</span>
                </a>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;