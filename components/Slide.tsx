'use client';

import { motion, Variants } from 'framer-motion';
import { SlideData } from '@/lib/slides-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Slide({ data, isActive }: { data: SlideData; isActive: boolean }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-16 overflow-hidden"
    >
      {/* Background Mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full opacity-10 blur-[100px]"
          style={{ backgroundColor: data.accentColor || '#d4a574' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
      </div>

      {/* Main Content Scrollable Area on Mobile */}
      <div className="w-full max-w-7xl h-full flex flex-col justify-center overflow-y-auto md:overflow-visible no-scrollbar pt-12 pb-24 md:p-0">
        
        {data.type === 'title' && (
          <div className="text-center space-y-8 md:space-y-12">
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-accent-gold font-bold">
                {data.tagline}
              </div>
              <div className="h-px w-12 bg-accent-gold/40 mx-auto" />
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-tight md:leading-none text-gradient-gold"
              >
                {data.title}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-4xl font-serif italic text-text-secondary max-w-3xl mx-auto"
              >
                {data.subtitle}
              </motion.p>
            </div>
          </div>
        )}

        {data.type === 'content' && (
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-10">
              <motion.div variants={itemVariants} className="space-y-3">
                <h2 className="text-4xl md:text-7xl font-bold leading-tight" style={{ color: data.accentColor }}>
                  {data.title}
                </h2>
                <p className="text-lg md:text-2xl text-text-secondary font-serif italic">{data.subtitle}</p>
                <div className="h-0.5 w-16 bg-accent-gold/40" />
              </motion.div>
              
              <ul className="space-y-4 md:space-y-6">
                {data.content?.map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="text-base md:text-xl flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-[10px] md:text-xs font-bold text-accent-gold">
                      {i + 1}
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {data.image && (
              <motion.div 
                variants={itemVariants}
                className="relative aspect-video lg:aspect-square w-full max-h-[300px] md:max-h-none rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl order-first lg:order-last mb-8 lg:mb-0"
              >
                <Image 
                  src={data.image} 
                  alt={data.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            )}
          </div>
        )}

        {data.type === 'grid' && (
          <div className="space-y-8 md:space-y-16">
            <motion.div variants={itemVariants} className="text-center space-y-2">
              <h2 className="text-4xl md:text-7xl font-bold text-gradient-gold">
                {data.title}
              </h2>
              <div className="h-px w-12 bg-white/20 mx-auto" />
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {data.gridItems?.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-2 right-4 text-3xl font-bold opacity-5">{i + 1}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-accent-gold">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {data.type === 'image' && (
          <div className="space-y-8 md:space-y-12">
             <motion.div variants={itemVariants} className="text-center space-y-2">
                <h2 className="text-4xl md:text-7xl font-bold" style={{ color: data.accentColor }}>{data.title}</h2>
                <p className="text-lg md:text-2xl font-serif italic text-text-secondary">{data.subtitle}</p>
             </motion.div>
             
             <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                <motion.div 
                  variants={itemVariants}
                  className="relative aspect-video rounded-2xl md:rounded-[40px] overflow-hidden border border-white/10 bg-white/5"
                >
                  <Image 
                    src={data.image!} 
                    alt={data.title} 
                    fill 
                    className="object-contain p-4 md:p-8"
                  />
                </motion.div>
                
                <div className="space-y-4 md:space-y-8">
                  {data.content?.map((item, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="glass-card p-4 md:p-8 rounded-xl border-l-4"
                      style={{ borderLeftColor: data.accentColor }}
                    >
                      <p className="text-sm md:text-xl leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {data.type === 'quote' && (
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 text-center">
            <motion.div 
              variants={itemVariants} 
              className="relative w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-accent-gold shadow-2xl"
            >
               <Image src={data.image!} alt={data.title} fill className="object-cover" />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-8">
               <h2 className="text-3xl md:text-7xl font-bold italic font-serif leading-tight text-gradient-gold">
                "{data.title}"
               </h2>
               <div className="h-px w-12 md:w-20 bg-accent-gold/40 mx-auto" />
               <ul className="space-y-2 md:space-y-4 text-text-secondary text-sm md:text-xl">
                  {data.content?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
               </ul>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
