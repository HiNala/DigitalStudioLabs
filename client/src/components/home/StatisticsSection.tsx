import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statistics = [
  {
    id: 1,
    value: 10,
    label: 'Projects in Pipeline',
    icon: 'bx-rocket',
    color: 'from-[#00A0B0] to-[#4D4DFF]'
  },
  {
    id: 2,
    value: 100,
    label: 'Commitment Level',
    suffix: '%',
    icon: 'bx-badge-check',
    color: 'from-[#4D4DFF] to-[#00A0B0]'
  },
  {
    id: 3,
    value: 15,
    label: 'Years Combined Experience',
    icon: 'bx-calendar-star',
    color: 'from-[#00A0B0] to-[#4D4DFF]'
  },
  {
    id: 4,
    value: 24,
    label: 'Hour Response Time',
    suffix: 'h',
    icon: 'bx-time',
    color: 'from-[#4D4DFF] to-[#00A0B0]'
  }
];

const Counter = ({ value, duration = 2000, suffix = '' }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const StatisticsSection = () => {
  return (
    <section className="py-20 bg-[#0D1117] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 bg-[#00A0B0]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Our <span className="gradient-text">Commitment</span> to Excellence
          </h2>
          <p className="text-[#8B949E] text-lg">
            While we're a new studio, our founding team brings years of industry expertise
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="bg-[#161B22]/80 p-8 rounded-xl border border-[#30363D] text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(0, 160, 176, 0.5)' }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mx-auto flex items-center justify-center mb-6`}>
                <i className={`bx ${stat.icon} text-3xl text-white`}></i>
              </div>
              
              <h3 className="text-4xl font-poppins font-bold mb-2 gradient-text">
                <Counter value={stat.value} suffix={stat.suffix || ''} />
              </h3>
              
              <p className="text-[#8B949E] text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="/about" className="text-[#E6EDF3] border border-[#30363D] px-8 py-3 rounded-md inline-flex items-center space-x-2 hover:border-[#00A0B0] transition-all">
            <span>Our story and approach</span>
            <i className='bx bx-right-arrow-alt'></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection; 