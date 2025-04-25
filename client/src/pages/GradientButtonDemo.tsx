import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { GradientButton } from '@/components/ui/gradient-button';
import { ArrowRight, Zap, Code, Layers } from 'lucide-react';

const GradientButtonDemo = () => {
  useEffect(() => {
    document.title = 'Gradient Button Demo | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <SpotlightLayout spotlightSize={800} spotlightColor="#4D4DFF">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                  Gradient <span className="gradient-text-animated gradient-text-glow">Button</span> Demo
                </h1>
                <p className="text-xl dark:text-[#8B949E] light:text-gray-600 mb-12">
                  A showcase of our new gradient button component with multiple variants and styles.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="dark:bg-[#161B22] light:bg-white rounded-xl p-8 border dark:border-[#30363D] light:border-gray-200">
                  <h2 className="text-2xl font-poppins font-bold mb-8">Default Buttons</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton>Get Started</GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Default Button</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton variant="variant">Get Started</GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Variant Button</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-poppins font-bold mb-8">With Icons</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton>
                        <Zap className="mr-2 h-4 w-4" /> Quick Action
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Left Icon</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton variant="variant">
                        Explore More <ArrowRight className="ml-2 h-4 w-4" />
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Right Icon</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-poppins font-bold mb-8">Different Sizes</h2>
                  
                  <div className="flex flex-wrap justify-center gap-8 mb-12">
                    <div className="flex flex-col items-center">
                      <GradientButton className="px-4 py-2 text-sm min-w-[100px]">
                        Small
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Small</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <GradientButton>
                        Medium
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Medium</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <GradientButton className="px-12 py-5 text-lg min-w-[180px]">
                        Large
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Large</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-poppins font-bold mb-8">Use Cases</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton>
                        <Code className="mr-2 h-4 w-4" /> Try Demo
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Product Demo</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton variant="variant">
                        <Layers className="mr-2 h-4 w-4" /> View Pricing
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Pricing Page</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <GradientButton>
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </GradientButton>
                      <p className="text-sm dark:text-[#8B949E] light:text-gray-500 mt-2">Contact Page</p>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-[#0D1117] rounded-lg p-6 mt-8">
                    <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-auto">
                      <code>{`import { GradientButton } from "@/components/ui/gradient-button"

function MyComponent() {
  return (
    <div>
      <GradientButton>Default Button</GradientButton>
      <GradientButton variant="variant">Variant Style</GradientButton>
      <GradientButton className="px-4 py-2 text-sm">Custom Size</GradientButton>
    </div>
  )
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightLayout>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GradientButtonDemo;