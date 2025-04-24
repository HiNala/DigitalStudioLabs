import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'CEO & Co-Founder',
    bio: 'Alex brings 15+ years of software development and leadership experience, having previously led engineering teams at top tech companies.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'CTO & Co-Founder',
    bio: 'With a Ph.D. in Computer Science and extensive experience in AI and machine learning, Sarah leads our technical strategy and innovation.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: 3,
    name: 'Michael Lee',
    role: 'Lead Developer',
    bio: 'Michael is an expert in modern web technologies and leads our development team with a focus on code quality and performance.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: 4,
    name: 'Emma Wilson',
    role: 'UI/UX Designer',
    bio: 'Emma creates intuitive and beautiful user experiences with a deep understanding of user-centered design principles.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    socials: {
      linkedin: '#',
      twitter: '#',
      dribbble: '#'
    }
  }
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-fade-in');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-radial">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            A passionate group of experts dedicated to creating exceptional digital solutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-[#161B22]/80 rounded-xl border border-[#30363D] overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] to-transparent opacity-70"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-poppins font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#00A0B0] font-medium">{member.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-[#8B949E] mb-6">{member.bio}</p>
                
                <div className="flex space-x-4">
                  {Object.entries(member.socials).map(([platform, url]) => (
                    <a 
                      key={platform}
                      href={url}
                      className="text-[#8B949E] hover:text-[#00A0B0] transition-colors"
                      aria-label={`${member.name}'s ${platform}`}
                    >
                      <i className={`bx bxl-${platform} text-xl`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 