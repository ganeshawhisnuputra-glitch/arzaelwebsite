import React, { useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const LettersPage: React.FC = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-[#041D1E] text-[#F3EBD7] overflow-hidden flex flex-col items-center justify-center pt-12 md:pt-16 pb-28 px-4 selection:bg-[#D9878D] selection:text-[#041D1E]">
      {/* Lamp glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none mix-blend-screen opacity-30 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #C4956A 0%, transparent 70%)',
          animation: reducedMotion ? 'none' : 'flicker 4s infinite alternate ease-in-out'
        }}
      />
      {/* Desk gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-[#041D1E] via-[#0D5659] to-transparent opacity-80 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center md:items-end justify-center gap-12 md:gap-8 min-h-[60vh]">
        
        {/* Left Community Object */}
        <div className="order-2 md:order-1 flex justify-center group perspective-1000 z-10">
           <a 
              href="https://whatsapp.com/channel/0029VbDDRbVAYlUJFTdpbt0e"
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-56 bg-[#F3EBD7] text-[#041D1E] p-3 rotate-[-5deg] ${reducedMotion ? '' : 'transition-transform duration-300 hover:rotate-[-2deg] hover:-translate-y-2 hover:shadow-2xl'} shadow-lg border border-[#C4956A]/20 focus:outline-none focus:ring-4 focus:ring-[#D9878D] focus:ring-offset-4 focus:ring-offset-[#041D1E]`}
              aria-label="ARZAEL MEME PACK"
           >
              <div className="flex gap-2 mb-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-12 bg-[#041D1E]/10 rounded-sm"></div>
                ))}
              </div>
              <div className="font-sans text-xs font-bold border-b border-[#041D1E]/20 pb-1 mb-1">ARZAEL MEME PACK</div>
              <div className="font-serif text-sm">TAKE THE MEMES &rarr;</div>
           </a>
        </div>

        {/* Center Envelope */}
        <div className="order-1 md:order-2 flex flex-col items-center justify-end z-30 w-full md:w-auto mt-8 md:mt-0">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl md:text-5xl text-[#F3EBD7] tracking-wider mb-2 drop-shadow-md">THE DESK</h1>
            <p className="font-sans text-sm md:text-base text-[#F3EBD7]/70">Leave a forwarding address.</p>
          </div>
          
          <button 
            type="button"
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
            className="group relative w-full max-w-[400px] h-[250px] focus:outline-none focus:ring-4 focus:ring-[#D9878D] focus:ring-offset-4 focus:ring-offset-[#041D1E] cursor-pointer"
            aria-expanded={envelopeOpen}
            aria-label={envelopeOpen ? "Close letter form" : "Open letter form"}
          >
            {/* Envelope Back */}
            <div className="absolute inset-0 bg-[#E6DBC4] shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-sm border border-[#D1C4A5]" />
            
            {/* Letter Content (Slides up) */}
            <div 
              className={`absolute bottom-0 left-[2%] w-[96%] bg-[#F9F4E8] p-6 shadow-inner border border-[#E6DBC4] flex flex-col justify-between
                ${reducedMotion 
                  ? (envelopeOpen ? '-translate-y-[160px] h-[300px] z-20 opacity-100' : 'translate-y-0 h-[240px] z-10 opacity-0 pointer-events-none') 
                  : `transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${envelopeOpen ? '-translate-y-[160px] h-[300px] z-20 opacity-100' : 'translate-y-0 h-[240px] z-10 opacity-0 pointer-events-none delay-200'}`
                }
              `}
              onClick={(e) => {
                if(envelopeOpen) e.stopPropagation();
              }}
            >
              <div>
                 <h2 className="font-serif text-2xl text-[#041D1E] mb-4">A Note to the Unsent</h2>
                 <form 
                   className="flex flex-col gap-3"
                   onSubmit={(e) => {
                     e.preventDefault();
                     // Handle submit
                   }}
                 >
                   <label htmlFor="email" className="font-sans text-xs uppercase tracking-widest text-[#041D1E]/70 font-semibold">
                     Email address:
                   </label>
                   <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="where should I send it?"
                     required
                     className="bg-transparent border-b border-[#041D1E]/30 pb-1 text-[#041D1E] font-serif placeholder:text-[#041D1E]/40 focus:outline-none focus:border-[#D9878D] focus:border-b-2 transition-colors"
                     tabIndex={envelopeOpen ? 0 : -1}
                   />
                   <button 
                     type="submit"
                     className="mt-4 self-start font-sans text-sm font-bold tracking-wider text-[#F9F4E8] bg-[#041D1E] px-6 py-2 hover:bg-[#D9878D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9878D] focus:ring-offset-2 focus:ring-offset-[#F9F4E8]"
                     tabIndex={envelopeOpen ? 0 : -1}
                   >
                     WRITE TO ME
                   </button>
                 </form>
              </div>
            </div>

            {/* Envelope Flap */}
            <div 
              className="absolute top-0 left-0 w-full h-[140px] origin-top z-40 pointer-events-none flex justify-center"
              style={{
                perspective: '1000px',
              }}
            >
              <div 
                className={`w-0 h-0 origin-top
                  border-l-[200px] border-r-[200px] border-t-[140px] 
                  border-l-transparent border-r-transparent border-t-[#D1C4A5] 
                  drop-shadow-md
                  ${reducedMotion 
                    ? (envelopeOpen ? 'rotate-x-180 opacity-0' : 'rotate-x-0 opacity-100') 
                    : `transition-transform duration-500 ease-in-out ${envelopeOpen ? 'rotate-x-[180deg]' : 'rotate-x-0'}`
                  }
                `}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: envelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  zIndex: envelopeOpen ? 15 : 40,
                }}
              />
            </div>
            
            {/* Envelope Front Panels */}
            <div className="absolute bottom-0 left-0 w-full h-[250px] pointer-events-none overflow-hidden z-30">
              {/* Left triangle */}
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[200px] border-r-[200px] border-b-[150px] border-l-[#E6DBC4] border-r-transparent border-b-transparent drop-shadow-sm" />
              {/* Right triangle */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[200px] border-r-[200px] border-b-[150px] border-r-[#E6DBC4] border-l-transparent border-b-transparent drop-shadow-sm" />
              {/* Bottom triangle */}
              <div className="absolute bottom-0 left-0 w-full h-0 border-l-[200px] border-r-[200px] border-b-[150px] border-l-transparent border-r-transparent border-b-[#EAE0CD] drop-shadow-[0_-2px_4px_rgba(0,0,0,0.05)]" />
            </div>
          </button>
        </div>

        {/* Right Community Objects */}
        <div className="order-3 flex flex-row md:flex-col gap-6 md:gap-8 items-center justify-center z-10">
           <a 
              href="https://whatsapp.com/channel/0029VbD8NKK96H4Qk6zjml2n"
              target="_blank"
              rel="noopener noreferrer"
              className={`group block w-40 md:w-48 bg-[#F9F4E8] text-[#041D1E] p-4 shadow-md border border-gray-200 rotate-[3deg] ${reducedMotion ? '' : 'transition-transform duration-300 hover:rotate-[6deg] hover:-translate-y-2'} focus:outline-none focus:ring-4 focus:ring-[#D9878D] focus:ring-offset-4 focus:ring-offset-[#041D1E] relative`}
              aria-label="HOUSE OF ZAELION WhatsApp"
           >
              {/* Folded corner effect */}
              <div className={`absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-l-[20px] border-b-[20px] border-t-[#041D1E] border-r-[#041D1E] border-b-[#E6DBC4] border-l-transparent ${reducedMotion ? '' : 'transition-transform duration-300 group-hover:scale-110 origin-bottom-left'}`} />
              
              <div className="font-serif text-sm font-bold border-b border-[#041D1E]/20 pb-2 mb-2">WHATSAPP</div>
              <div className="font-sans text-xs font-medium">HOUSE OF ZAELION</div>
              <div className="font-serif text-xs mt-3 text-[#0D5659] font-bold">ENTER THE HOUSE &rarr;</div>
           </a>

           <a 
              href="https://www.instagram.com/channel/AbZgkI631L4FVv90/"
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-32 md:w-40 bg-[#F3EBD7] text-[#041D1E] p-2 pb-6 shadow-xl border border-gray-300 rotate-[-8deg] ${reducedMotion ? '' : 'transition-transform duration-300 hover:rotate-[-4deg] hover:-translate-y-2'} focus:outline-none focus:ring-4 focus:ring-[#D9878D] focus:ring-offset-4 focus:ring-offset-[#041D1E]`}
              aria-label="HOUSE OF ZAELION Instagram"
           >
              <div className="w-full h-24 bg-[#041D1E] mb-2 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C4956A_0%,_transparent_70%)] opacity-20"></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#F3EBD7] opacity-50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#F3EBD7]"></div>
                </div>
              </div>
              <div className="font-serif text-xs text-center font-bold">FIND THE OTHERS</div>
           </a>
        </div>
      </div>
      
      {/* CSS Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flicker {
          0%, 100% { opacity: 0.25; }
          30% { opacity: 0.35; }
          70% { opacity: 0.2; }
          80% { opacity: 0.4; }
        }
      `}} />
    </div>
  );
};
