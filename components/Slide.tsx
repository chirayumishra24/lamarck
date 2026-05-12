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
        staggerChildren: 0.15 
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
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
      className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px]"
          style={{ backgroundColor: data.accentColor || '#d4a574' }}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.07] blur-[100px]"
          style={{ backgroundColor: '#ffffff' }}
        />
        
        {/* Subtle Decorative Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col h-full justify-center relative z-10">
        
        {data.type === 'title' && (
          <div className="text-center space-y-10">
            <div className="flex flex-col items-center gap-4">
              <motion.div variants={itemVariants} className="w-24 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              <motion.div 
                variants={itemVariants}
                className="text-sm md:text-base uppercase tracking-[0.6em] text-accent-gold font-medium"
              >
                {data.tagline}
              </motion.div>
              <motion.div variants={itemVariants} className="w-24 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
            </div>
            
            <div className="space-y-4">
              <motion.h1 
                variants={itemVariants}
                className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-none text-gradient-gold drop-shadow-2xl"
              >
                {data.title}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-2xl md:text-5xl font-serif italic text-text-secondary max-w-4xl mx-auto leading-relaxed"
              >
                {data.subtitle}
              </motion.p>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="pt-12 flex justify-center gap-8 opacity-40"
            >
              <div className="w-2 h-2 rounded-full bg-accent-gold" />
              <div className="w-2 h-2 rounded-full bg-accent-gold" />
              <div className="w-2 h-2 rounded-full bg-accent-gold" />
            </motion.div>
          </div>
        )}

        {data.type === 'content' && (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider mb-2">
                  Section Overview
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-[1.1]" style={{ color: data.accentColor }}>
                  {data.title}
                </h2>
                <div className="h-1 w-20 rounded-full" style={{ backgroundColor: data.accentColor }} />
                <p className="text-xl md:text-2xl text-text-secondary font-serif italic max-w-xl">{data.subtitle}</p>
              </motion.div>
              
              <ul className="space-y-6">
                {data.content?.map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    className="text-lg md:text-xl flex items-start gap-5 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-accent-gold group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-black transition-all">
                      {i + 1}
                    </div>
                    <span className="leading-relaxed pt-0.5">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {data.image && (
              <motion.div 
                variants={itemVariants}
                className="relative group h-[400px] lg:h-[600px]"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/20 to-transparent rounded-3xl -rotate-3 transition-transform group-hover:rotate-0 duration-700" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                  <Image 
                    src={data.image} 
                    alt={data.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                {/* Decorative Frame Corner */}
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-accent-gold/40" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-accent-gold/40" />
              </motion.div>
            )}
          </div>
        )}

        {data.type === 'grid' && (
          <div className="space-y-16">
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-6xl md:text-8xl font-bold text-gradient-gold">
                {data.title}
              </h2>
              <div className="w-24 h-px bg-white/20 mx-auto" />
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.gridItems?.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="glass-card p-10 rounded-3xl relative overflow-hidden group cursor-default"
                >
                  <div className="absolute top-0 right-0 p-6 text-4xl font-bold opacity-5 group-hover:opacity-10 transition-opacity">
                    0{i + 1}
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />
                  
                  <h3 className="text-2xl font-bold mb-6 text-accent-gold group-hover:translate-x-2 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed font-sans text-lg">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {data.type === 'image' && (
          <div className="space-y-12">
             <motion.div variants={itemVariants} className="text-center space-y-4">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tight" style={{ color: data.accentColor }}>{data.title}</h2>
                <p className="text-2xl font-serif italic text-text-secondary max-w-2xl mx-auto">{data.subtitle}</p>
             </motion.div>
             
             <div className="grid lg:grid-cols-12 gap-12 items-center">
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-7 relative h-[500px] rounded-[40px] overflow-hidden border border-white/10 group bg-white/5 backdrop-blur-md"
                >
                  <Image 
                    src={data.image!} 
                    alt={data.title} 
                    fill 
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[40px]" />
                </motion.div>
                
                <div className="lg:col-span-5 space-y-8">
                  {data.content?.map((item, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="glass-card p-8 rounded-2xl border-l-4"
                      style={{ borderLeftColor: data.accentColor }}
                    >
                      <p className="text-xl leading-relaxed text-text-primary">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {data.type === 'quote' && (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16 items-center">
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-2 relative aspect-square rounded-full p-4 border-2 border-accent-gold/20 animate-float"
            >
               <div className="absolute inset-0 rounded-full bg-accent-gold/5 blur-3xl" />
               <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-accent-gold shadow-[0_0_50px_rgba(212,165,116,0.2)]">
                  <Image src={data.image!} alt={data.title} fill className="object-cover" />
               </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-10">
               <div className="text-8xl font-serif text-accent-gold/20 h-8 leading-none">"</div>
               <h2 className="text-5xl md:text-8xl font-bold italic font-serif leading-tight text-white" style={{ color: data.accentColor }}>
                {data.title}
               </h2>
               <div className="flex items-center gap-6">
                 <div className="h-px flex-1 bg-gradient-to-r from-accent-gold to-transparent" />
                 <div className="text-accent-gold font-bold tracking-widest uppercase text-sm">Conclusion</div>
               </div>
               <ul className="space-y-4">
                  {data.content?.map((item, i) => (
                    <li key={i} className="text-xl text-text-secondary flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                      {item}
                    </li>
                  ))}
               </ul>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
