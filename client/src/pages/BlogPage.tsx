import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import { Spinner } from '@/components/ui/spinner';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    document.title = 'Blog | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  // Fetch blog posts from WordPress REST API with pagination
  const { data: posts, isLoading, error, refetch } = useQuery<WordPressPost[]>({
    queryKey: ['blog-posts', currentPage],
    queryFn: async () => {
      const response = await fetch(`https://mediumpurple-buffalo-559300.hostingersite.com/wp-json/wp/v2/posts?page=${currentPage}&per_page=${postsPerPage}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      // Get total pages from headers
      const totalPosts = response.headers.get('X-WP-Total');
      const totalPages = response.headers.get('X-WP-TotalPages');
      
      if (totalPages) {
        setTotalPages(parseInt(totalPages));
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

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    let items = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          onClick={() => handlePageChange(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Calculate range of pages to show around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust to show up to maxVisiblePages
    if (endPage - startPage < maxVisiblePages - 3) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
      } else {
        startPage = Math.max(2, endPage - (maxVisiblePages - 3));
      }
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

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
            <Badge variant="secondary" className="mb-6">
              Latest Updates
            </Badge>
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-8">
              Our <span className="gradient-text-animated gradient-text-glow">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl dark:text-[#8B949E] light:text-gray-600 mb-8 max-w-2xl mx-auto">
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
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map(post => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="grid grid-rows-[auto_auto_1fr_auto] h-full transition-all duration-300 hover:shadow-lg hover:shadow-[#00A0B0]/5 hover:border-[#00A0B0]/30 dark:hover:border-[#00A0B0]/20">
                        <CardHeader className="pb-2">
                          <div className="text-sm dark:text-[#8B949E] light:text-gray-500 mb-2">
                            {formatDate(post.date)}
                          </div>
                          <CardTitle className="text-xl hover:text-[#00A0B0] transition-colors duration-300">
                            <Link to={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription 
                            className="line-clamp-3 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                          />
                        </CardContent>
                        <CardFooter className="mt-auto">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] transition-colors duration-300 font-medium"
                          >
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                          </PaginationItem>
                        )}
                        
                        {generatePaginationItems()}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 dark:bg-[#161B22]/80 light:bg-white/60 backdrop-blur-md rounded-xl overflow-hidden border dark:border-[#30363D] light:border-gray-200/70 shadow-lg p-8">
                <h3 className="text-2xl font-medium mb-4">No posts found</h3>
                <p className="dark:text-[#8B949E] light:text-gray-600 mb-8">
                  Check back soon for new content!
                </p>
                <StarButton href="/" size="md">
                  Back to Home
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

export default BlogPage; 