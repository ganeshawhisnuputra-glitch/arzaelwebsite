import React, { useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const PRODUCTS = [
  { id: 'ss-tee', name: 'SELF SABOTAGE TEE', price: 'Rp 299.000', category: 'ARZAEL HANDMADE', description: 'Hand-printed. Each one slightly different. That\'s the point.', sizes: ['S','M','L','XL'] },
  { id: 'ss-poster', name: 'SELF SABOTAGE POSTER', price: 'Rp 149.000', category: 'SELF SABOTAGE', description: 'Limited edition artwork print.', sizes: [] },
  { id: 'anesthesia-digital', name: 'ANESTHESIA — DIGITAL', price: 'Rp 29.000', category: 'MUSIC', description: 'High-quality digital download.', sizes: [] },
];

export const ShopPage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (id: string) => {
    setCart((prev) => [...prev, id]);
  };

  const activeProduct = PRODUCTS.find(p => p.id === selectedProduct);

  const getProductVisual = (id: string) => {
    switch (id) {
      case 'ss-tee':
        return (
          <div className="relative w-40 h-32 bg-[#F3EBD7]/10 border border-[#F3EBD7]/20 rounded-sm flex flex-col items-center justify-center transform-gpu shadow-xl">
            {/* Folded Tee Representation */}
            <div className="w-32 h-24 bg-[#041D1E] border border-[#0D5659] relative overflow-hidden flex items-center justify-center">
               <span className="font-display text-[#F3EBD7]/50 text-xl rotate-12">ARZAEL</span>
               <div className="absolute top-0 right-0 w-8 h-8 bg-[#D9878D] -mr-4 -mt-4 rotate-45 border-b border-[#041D1E]" />
            </div>
            {/* Tag */}
            <div className="absolute top-2 right-4 w-6 h-10 bg-[#D9878D] border border-black origin-top transform rotate-12 flex items-end justify-center pb-1 shadow-sm transition-transform group-hover:rotate-6">
              <div className="w-2 h-2 rounded-full bg-[#041D1E] absolute top-1" />
              <span className="text-[0.5rem] font-bold text-black rotate-90 origin-left ml-4 whitespace-nowrap">Rp 299K</span>
            </div>
          </div>
        );
      case 'ss-poster':
        return (
          <div className="relative w-48 h-16 bg-[#F3EBD7]/5 border border-[#F3EBD7]/20 flex items-center justify-center rounded-sm shadow-xl">
            {/* Tube Representation */}
            <div className="w-40 h-8 bg-[#0D5659] rounded-full border border-black relative overflow-hidden flex items-center justify-center shadow-inner">
               <div className="absolute left-0 w-4 h-full bg-black/40 rounded-l-full" />
               <div className="absolute right-0 w-4 h-full bg-black/40 rounded-r-full" />
               <span className="font-display text-[#F3EBD7]/60 text-xs tracking-widest">S.S. POSTER TUBE</span>
            </div>
            {/* Tag */}
             <div className="absolute -bottom-4 right-8 w-12 h-6 bg-[#D9878D] border border-black origin-top-right transform -rotate-12 flex items-center justify-center shadow-sm transition-transform group-hover:-rotate-6">
              <span className="text-[0.6rem] font-bold text-black whitespace-nowrap">Rp 149K</span>
            </div>
          </div>
        );
      case 'anesthesia-digital':
        return (
           <div className="relative w-24 h-36 bg-[#F3EBD7]/10 border border-[#F3EBD7]/30 p-2 flex flex-col items-center justify-start shadow-xl">
            {/* Cassette / Receipt */}
            <div className="w-full h-full bg-[#F3EBD7] text-[#041D1E] font-sans p-2 flex flex-col text-[0.5rem] leading-tight opacity-90">
               <span className="font-bold border-b border-[#041D1E]/30 pb-1 mb-1">RECEIPT</span>
               <span>ARZAEL</span>
               <span>ANESTHESIA</span>
               <span>DIGITAL DL</span>
               <div className="mt-auto border-t border-[#041D1E]/30 pt-1 flex justify-between font-bold">
                 <span>TOTAL</span>
                 <span>29K</span>
               </div>
            </div>
             {/* Tag */}
             <div className="absolute -left-2 top-8 w-10 h-6 bg-[#D9878D] border border-black origin-top-left transform -rotate-45 flex items-center justify-center shadow-sm transition-transform group-hover:-rotate-12 z-10">
              <span className="text-[0.6rem] font-bold text-black whitespace-nowrap">Rp 29K</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#041D1E] text-[#F3EBD7] font-serif overflow-x-hidden flex items-center justify-center relative perspective-1000 p-4 sm:p-8">
      {/* Cart Indicator */}
      <div className="absolute top-6 right-6 sm:top-12 sm:right-12 z-50">
        <div className="relative">
          <div className="bg-[#D9878D] text-[#041D1E] font-sans font-bold px-3 py-1 text-sm border-2 border-black rotate-3 hover:-rotate-3 transition-transform cursor-default">
            COLLECTION [{cart.length}]
          </div>
        </div>
      </div>

      {/* Main Locker Experience */}
      <div className="w-full max-w-4xl relative z-10">
        {/* Locker Frame */}
        <div 
          className="relative w-full aspect-[4/5] sm:aspect-video bg-[#0D5659] border-8 border-[#041D1E] shadow-2xl overflow-hidden flex flex-col sm:flex-row"
          style={{
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Locker Door (Decorative on Desktop, open state) */}
          <div className="hidden sm:block absolute top-0 left-0 w-1/4 h-full border-r-4 border-black/50 origin-left transform-gpu rotate-y-12 bg-[#0D5659] z-20"
               style={{ transform: 'perspective(1000px) rotateY(-20deg)', boxShadow: '20px 0 30px rgba(0,0,0,0.5)' }}>
            <div className="w-full h-full p-4 border border-white/10 flex flex-col justify-between opacity-50">
               <div className="w-2 h-16 bg-[#C5B383] rounded-sm ml-auto mt-20" />
               <div className="w-16 h-24 border border-white/20 mx-auto mb-10 text-[0.5rem] p-2 text-white/50 font-sans">INSPECTION RECORD</div>
            </div>
          </div>

          {/* Shelves Content Area */}
          <div className="w-full sm:w-3/4 sm:ml-auto h-full flex flex-col relative z-10 p-4 sm:p-12 space-y-8 sm:space-y-16 overflow-y-auto hide-scrollbar">
            
            {PRODUCTS.map((product) => (
              <div key={product.id} className="relative group w-full flex flex-col sm:flex-row items-center sm:items-end border-b-2 border-black/40 pb-4">
                
                {/* Item interactive container */}
                <button
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative z-20 outline-none transition-transform duration-300 ease-out 
                    ${prefersReducedMotion ? '' : 'hover:-translate-y-2 hover:scale-105 focus-visible:-translate-y-2 focus-visible:scale-105'}
                  `}
                  aria-label={`View details for ${product.name}`}
                >
                  {getProductVisual(product.id)}
                </button>

                {/* Info plate on shelf */}
                <div className="mt-4 sm:mt-0 sm:ml-12 text-center sm:text-left flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-display text-xl tracking-wider text-[#F3EBD7]">{product.name}</h3>
                  <p className="text-xs font-sans text-[#F3EBD7]/60 tracking-widest">{product.category}</p>
                </div>

              </div>
            ))}
          </div>

          {/* Detail Panel Overlay */}
          <div 
            className={`absolute top-0 right-0 w-full sm:w-1/2 h-full bg-[#041D1E]/95 backdrop-blur-sm border-l border-[#F3EBD7]/20 z-30 transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col p-8
              ${selectedProduct ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            {activeProduct && (
              <>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="self-end text-[#F3EBD7]/60 hover:text-[#D9878D] font-sans text-sm tracking-widest transition-colors mb-8"
                  aria-label="Close details"
                >
                  [ CLOSE ]
                </button>
                
                <div className="flex-1 flex flex-col space-y-6">
                  <div>
                    <p className="text-[#D9878D] font-sans text-xs font-bold tracking-widest mb-1">{activeProduct.category}</p>
                    <h2 className="font-display text-3xl text-[#F3EBD7] leading-none mb-2">{activeProduct.name}</h2>
                    <p className="font-sans text-xl font-bold text-[#F3EBD7]">{activeProduct.price}</p>
                  </div>

                  <p className="font-sans text-sm text-[#F3EBD7]/80 leading-relaxed max-w-sm">
                    {activeProduct.description}
                  </p>

                  {activeProduct.sizes.length > 0 && (
                    <div className="space-y-2 pt-4">
                      <p className="font-sans text-xs tracking-widest text-[#F3EBD7]/60">SIZE / FIT</p>
                      <div className="flex gap-2">
                        {activeProduct.sizes.map(size => (
                          <button key={size} className="w-10 h-10 border border-[#F3EBD7]/30 text-sm font-sans hover:bg-[#F3EBD7] hover:text-[#041D1E] transition-colors focus-visible:bg-[#F3EBD7] focus-visible:text-[#041D1E]">
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-8">
                    <button 
                      onClick={() => {
                        handleAddToCart(activeProduct.id);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-[#D9878D] text-[#041D1E] font-sans font-bold py-4 hover:bg-[#F3EBD7] transition-colors focus-visible:bg-[#F3EBD7] active:scale-[0.98]"
                    >
                      ADD TO COLLECTION
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
