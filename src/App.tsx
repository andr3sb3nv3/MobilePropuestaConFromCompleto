import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Clock, UserX, Target, ChevronDown, Timer, 
  Check, Minus, Laptop, Users, Info, 
  MousePointer2, Zap, Palette, Rocket, Star, Eye, X, Linkedin, MessageCircle, Mail,
  ArrowRight, Hand, Send
} from 'lucide-react';
import PlanEscalamiento from './components/PlanEscalamiento';

function CreateProposal() {
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [text, setText] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [color1, setColor1] = useState('#0a192f');
  const [color2, setColor2] = useState('#4ade80');
  const [color3, setColor3] = useState('#ffffff');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    const data = { img1, img2, text, companyName, color1, color2, color3 };
    const base64 = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}#/p/${base64}`;
    setGeneratedUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-2xl my-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/5 mb-4">
            <Rocket className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-3xl font-black text-brand-primary tracking-tight">Crear Propuesta</h2>
          <p className="text-gray-500 mt-2">Personaliza la experiencia para tu cliente</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-accent" />
              Datos del Cliente
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de la Empresa</label>
              <input 
                type="text" 
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all bg-white"
                value={companyName} 
                onChange={e => setCompanyName(e.target.value)} 
                placeholder="Ej. Atenea Growth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Frase / Texto Personalizado</label>
              <textarea 
                className="w-full border border-gray-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all bg-white resize-none"
                value={text} 
                onChange={e => setText(e.target.value)} 
                placeholder="Escribe un mensaje inspirador para tu cliente..."
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-brand-accent" />
              Identidad Visual
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600 text-center">Principal</label>
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 hover:border-brand-accent transition-colors">
                  <input 
                    type="color" 
                    className="w-full h-12 cursor-pointer opacity-0 absolute inset-0 z-10"
                    value={color1} 
                    onChange={e => setColor1(e.target.value)} 
                  />
                  <div className="w-full h-12 flex items-center justify-center" style={{ backgroundColor: color1 }}>
                    <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded text-gray-900 shadow-sm">{color1}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600 text-center">Acento</label>
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 hover:border-brand-accent transition-colors">
                  <input 
                    type="color" 
                    className="w-full h-12 cursor-pointer opacity-0 absolute inset-0 z-10"
                    value={color2} 
                    onChange={e => setColor2(e.target.value)} 
                  />
                  <div className="w-full h-12 flex items-center justify-center" style={{ backgroundColor: color2 }}>
                    <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded text-gray-900 shadow-sm">{color2}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600 text-center">Fondo</label>
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 hover:border-brand-accent transition-colors">
                  <input 
                    type="color" 
                    className="w-full h-12 cursor-pointer opacity-0 absolute inset-0 z-10"
                    value={color3} 
                    onChange={e => setColor3(e.target.value)} 
                  />
                  <div className="w-full h-12 flex items-center justify-center" style={{ backgroundColor: color3 }}>
                    <span className="text-xs font-mono bg-black/10 px-2 py-1 rounded text-gray-900 shadow-sm">{color3}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Imagen 1 (Opcional)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all bg-white"
                  value={img1} 
                  onChange={e => setImg1(e.target.value)} 
                  placeholder="https://ejemplo.com/imagen1.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Imagen 2 (Opcional)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all bg-white"
                  value={img2} 
                  onChange={e => setImg2(e.target.value)} 
                  placeholder="https://ejemplo.com/imagen2.jpg"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-primary/90 transition-all mt-6 shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 text-brand-accent" />
            Generar Enlace Mágico
          </button>
          
          {generatedUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-5 bg-emerald-50 border border-emerald-100 rounded-xl break-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-emerald-800 font-bold">¡Propuesta lista!</p>
              </div>
              <div className="flex flex-col gap-3">
                <a href={generatedUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-medium hover:underline text-sm block p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                  {generatedUrl}
                </a>
                <button 
                  onClick={() => setShowPreview(true)}
                  className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Previsualizar Propuesta
                </button>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <a href="#" className="text-sm text-gray-500 hover:text-brand-primary font-medium transition-colors">Volver a la vista previa</a>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Eye className="w-5 h-5 text-brand-primary" />
                Previsualización de la Propuesta
              </h3>
              <button 
                onClick={() => setShowPreview(false)} 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <iframe 
              src={generatedUrl} 
              className="w-full flex-1 border-none bg-gray-100" 
              title="Previsualización"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

function VisionCompartidaSection({ customData }: { customData: any }) {
  const visionSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: visionSectionRef,
    offset: ["start end", "end start"]
  });
  
  // Circle 1 (Top Right) moves down and left towards center
  const circle1Y = useTransform(scrollYProgress, [0, 1], [-100, 300]);
  const circle1X = useTransform(scrollYProgress, [0, 1], [100, -300]);
  
  // Circle 2 (Bottom Left) moves up and right towards center
  const circle2Y = useTransform(scrollYProgress, [0, 1], [100, -300]);
  const circle2X = useTransform(scrollYProgress, [0, 1], [-100, 300]);

  return (
    <section 
      id="vision-compartida"
      ref={visionSectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden border-b border-gray-100 bg-brand-secondary"
    >
      {/* Defined color circle accents using client colors */}
      <motion.div 
        className="absolute -top-16 -right-16 w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none shadow-2xl" 
        style={{ 
          backgroundColor: customData.color2 || 'var(--theme-accent)',
          y: circle1Y,
          x: circle1X
        }}
      />
      <motion.div 
        className="absolute -bottom-16 -left-16 w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none shadow-2xl" 
        style={{ 
          backgroundColor: customData.color1 || 'var(--theme-primary)',
          y: circle2Y,
          x: circle2X
        }}
      />
      
      <div className="container mx-auto px-6 md:px-20 lg:px-32 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-10"
        >
          <div 
            className="inline-block px-6 py-2 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-sm bg-black text-[#4ade80]"
          >
            Visión Compartida
          </div>
          
          <h2 
            className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
            style={{ color: customData.color1 || 'var(--theme-primary)' }}
          >
            {customData.companyName || 'Tu Empresa'}
          </h2>
          
          {customData.text && (
            <div className="relative max-w-3xl mx-auto">
              <p 
                className="text-2xl md:text-4xl font-light leading-tight italic opacity-90"
                style={{ color: customData.color1 || 'var(--theme-primary)' }}
              >
                "{customData.text}"
              </p>
              <div 
                className="w-24 h-1 mx-auto mt-8 rounded-full"
                style={{ backgroundColor: customData.color2 || 'var(--theme-accent)' }}
              />
            </div>
          )}

          {customData.img1 && (
            <div className="pt-4">
              <img 
                src={customData.img1} 
                alt="Logo Cliente" 
                className="h-20 md:h-32 w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {customData.img2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-2xl mx-auto mt-12"
            >
              <div 
                className="absolute inset-0 transform rotate-2 rounded-[3rem] opacity-10" 
                style={{ backgroundColor: customData.color2 || 'var(--theme-accent)' }}
              />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-white p-2">
                <img 
                  src={customData.img2} 
                  alt="Empresa" 
                  className="w-full h-auto object-cover aspect-video rounded-[2.5rem]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface CurtainRevealProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  containerClassName?: string;
  footerClassName?: string;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ 
  children, 
  footer, 
  containerClassName,
  footerClassName 
}) => {
  return (
    <div className="relative">
      {/* Contenido principal (La "Cortina") */}
      <div className={`reveal-container ${containerClassName || ''}`}>
        {children}
      </div>

      {/* Contenido revelado (El "Fondo") */}
      <div className={`reveal-footer ${footerClassName || ''}`}>
        {footer}
      </div>
    </div>
  );
};

interface ContactCTAProps {
  companyName: string;
  setCompanyName: (name: string) => void;
}

function ContactCTA({ companyName, setCompanyName }: ContactCTAProps) {
  return (
    <div className="w-full bg-[#e0e5ec] py-16 md:py-24">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          
          {/* Columna Izquierda: Identidad y Social */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-12 p-4 sm:p-8 md:p-10 rounded-[1.5rem] md:rounded-[4rem] bg-[#e0e5ec] shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] md:shadow-[25px_25px_50px_#bebebe,-25px_-25px_50px_#ffffff]">
            
            <div className="flex flex-col items-center gap-3 md:gap-8 w-full">
              <div className="space-y-1.5 md:space-y-3">
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-[#001B3D] text-center">
                  Conecta con
                </h2>
                {/* Línea de acento sutil */}
                <div className="h-1 w-12 md:h-1.5 md:w-20 bg-[#16E077] mx-auto rounded-full" />
              </div>
              
              {/* Contenedor de imagen puramente neomórfico */}
              <div className="p-3 md:p-8 rounded-[1rem] md:rounded-[2.5rem] bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff] flex items-center justify-center">
                <img 
                  src="https://raw.githubusercontent.com/andr3sb3nv3/AteneaPNG/refs/heads/main/IMG_0211.png" 
                  alt="Atenea" 
                  className="h-8 sm:h-16 md:h-28 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Iconos Sociales con el color verde como acento en el icono mismo */}
            <div className="flex gap-3 sm:gap-6 md:gap-8 justify-center flex-wrap">
              {[
                { icon: Mail, href: "mailto:hola@ateneagrowth.com", label: "Email" },
                { icon: MessageCircle, href: "#", label: "WhatsApp" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#e0e5ec] rounded-xl md:rounded-2xl flex items-center justify-center text-[#16E077] transition-all duration-300
                             shadow-[4px_4px_8px_#b8b9be,-4px_-4px_8px_#ffffff] md:shadow-[8px_8px_16px_#b8b9be,-8px_-8px_16px_#ffffff] 
                             hover:shadow-[inset_2px_2px_4px_#b8b9be,inset_-2px_-2px_4px_#ffffff] md:hover:shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff]
                             hover:scale-95 group"
                >
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="bg-[#e0e5ec] rounded-[1.5rem] md:rounded-[4rem] p-4 sm:p-8 md:p-14 shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] md:shadow-[25px_25px_50px_#bebebe,-25px_-25px_50px_#ffffff]">
            <form className="space-y-3 sm:space-y-8 md:space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5 md:space-y-3">
                <label className="text-[9px] md:text-xs font-black text-[#001B3D]/70 ml-2 md:ml-4 uppercase tracking-[0.15em] md:tracking-[0.3em] flex items-center gap-1.5 md:gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#16E077]" />
                  Nombre
                </label>
                <input 
                  type="text" 
                  placeholder="Tu nombre completo"
                  className="w-full p-2.5 md:p-5 bg-[#e0e5ec] rounded-xl md:rounded-2xl outline-none text-[#001B3D] font-medium text-xs md:text-base
                             shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff]
                             focus:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] md:focus:shadow-[inset_10px_10px_20px_#b8b9be,inset_-10px_-10px_20px_#ffffff]
                             placeholder:text-[#001B3D]/30 transition-all"
                />
              </div>

              <div className="space-y-1.5 md:space-y-3">
                <label className="text-[9px] md:text-xs font-black text-[#001B3D]/70 ml-2 md:ml-4 uppercase tracking-[0.15em] md:tracking-[0.3em] flex items-center gap-1.5 md:gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#16E077]" />
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="hola@ateneagrowth.com"
                  className="w-full p-2.5 md:p-5 bg-[#e0e5ec] rounded-xl md:rounded-2xl outline-none text-[#001B3D] font-medium text-xs md:text-base
                             shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff]
                             focus:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] md:focus:shadow-[inset_10px_10px_20px_#b8b9be,inset_-10px_-10px_20px_#ffffff]
                             placeholder:text-[#001B3D]/30 transition-all"
                />
              </div>

              <div className="space-y-1.5 md:space-y-3">
                <label className="text-[9px] md:text-xs font-black text-[#001B3D]/70 ml-2 md:ml-4 uppercase tracking-[0.15em] md:tracking-[0.3em] flex items-center gap-1.5 md:gap-2">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#16E077]" />
                  Mensaje
                </label>
                <textarea 
                  placeholder="¿Cómo podemos ayudarte?"
                  className="w-full h-16 md:h-32 p-2.5 md:p-5 bg-[#e0e5ec] rounded-xl md:rounded-2xl outline-none text-[#001B3D] font-medium resize-none text-xs md:text-base
                             shadow-[inset_4px_4px_8px_#b8b9be,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_8px_8px_16px_#b8b9be,inset_-8px_-8px_16px_#ffffff]
                             focus:shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff] md:focus:shadow-[inset_10px_10px_20px_#b8b9be,inset_-10px_-10px_20px_#ffffff]
                             placeholder:text-[#001B3D]/30 transition-all"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 md:py-6 bg-[#16E077] rounded-xl md:rounded-2xl font-black text-[#001B3D] uppercase tracking-[0.15em] md:tracking-[0.4em] text-[9px] md:text-xs
                           shadow-[4px_4px_10px_rgba(22,224,119,0.25)] md:shadow-[8px_8px_20px_rgba(22,224,119,0.25)]
                           hover:shadow-[6px_6px_15px_rgba(22,224,119,0.35)] md:hover:shadow-[12px_12px_25px_rgba(22,224,119,0.35)]
                           active:scale-[0.98] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] md:active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1)]
                           transition-all duration-300 flex items-center justify-center gap-2 md:gap-4 group mt-1 md:mt-2"
              >
                <Send className="w-3.5 h-3.5 md:w-[18px] md:h-[18px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('patagon');
  const [selectedAllianceTab, setSelectedAllianceTab] = useState<string>('atenea');
  const [route, setRoute] = useState(window.location.hash);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowWhatsApp(true);
      } else {
        setShowWhatsApp(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const customData = React.useMemo(() => {
    if (route.startsWith('#/p/')) {
      try {
        const base64 = route.replace('#/p/', '');
        return JSON.parse(decodeURIComponent(atob(base64)));
      } catch (e) {
        console.error("Invalid custom data in URL");
      }
    }
    return null;
  }, [route]);

  const customStyles = React.useMemo(() => {
    return customData ? {
      '--theme-primary': customData.color1 || '#0a192f',
      '--theme-accent': customData.color2 || '#4ade80',
      '--theme-secondary': customData.color3 || '#ffffff',
    } as React.CSSProperties : {};
  }, [customData]);

  if (route === '#/create') {
    return <CreateProposal />;
  }

  const images = {
    img0095: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0095.jpeg",
    img0110: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0110.jpeg",
    img0114: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0114.jpeg",
    img0111: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0111.jpeg",
    img0112: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0112.jpeg",
    img0115: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0115.jpeg",
    img0104: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0104.jpeg",
    img0105: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0105.jpeg",
    img0082: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0082.jpeg",
    img0101: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0101.jpeg",
    diagrama: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/Diagrama%20sin%20ti%CC%81tulo.jpg",
    diagrama2: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/Diagrama222%20sin%20ti%CC%81tulo.jpg",
    img0121: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0121.jpeg",
    img0122: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0122.jpeg",
    img0123: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0123.jpeg",
    img0124: "https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0124.jpeg"
  };

  const plans = [
    {
      id: 'basico',
      title: 'BÁSICO',
      icon: <Rocket className="w-6 h-6 text-emerald-400" />,
      price: '$X',
      unit: 'USD',
      description: 'Ideal para empresas que buscan escala y optimización constante.',
      features: [
        'Paid Media (Estrategia e implementación)',
        'Optimización y experimentos en todos los canales',
        'Servicio de CRO (Conversión en la web)',
        'Dashboards y reporting mensual',
        'Reuniones semanales de status',
        'Automation Marketing & Emailing'
      ],
      color: 'border-emerald-500/30'
    },
    {
      id: 'patagon',
      title: 'SERVICIO PATAGON',
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      price: '$6',
      unit: 'USD x lead calificado',
      highlight: true,
      description: 'Nuestra solución estrella basada 100% en resultados reales.',
      features: [
        'Atención 24/7 con conversación natural',
        'Calificación real según tu playbook',
        'CRM actualizado automáticamente',
        'Agenda de visitas automatizada',
        'Optimización continua del pitch',
        'Pago por resultado: solo leads calificados'
      ],
      color: 'border-emerald-400'
    },
    {
      id: 'creatividades',
      title: 'CREATIVIDADES',
      icon: <Palette className="w-6 h-6 text-emerald-400" />,
      price: '$X',
      unit: 'USD',
      description: 'El motor visual para tus campañas con tecnología de IA.',
      features: [
        'Análisis y creación de piezas con IA',
        'Feedback e insights detallados',
        'Testing continuo de creatividades',
        '2 videos UGC (User Generated Content) por mes',
        'Hasta 15 creatividades estáticas mensuales'
      ],
      color: 'border-emerald-500/30'
    }
  ];

  const ateneaPoints = [
    "Generamos tráfico de calidad desde Google, Meta y LinkedIn",
    "Segmentamos y optimizamos para lead calificado",
    `Diseñamos creatividades y mensajes para ${customData?.companyName || 'proyectos inmobiliarios'}`,
    "Optimizamos de forma continua con reporting claro",
    "Aportamos expertise real en vertical inmobiliaria"
  ];

  const patagonPoints = [
    "Respondemos de forma inmediata 24/7",
    "Conversamos de manera natural y contextualizada",
    "Optimizamos las campañas en base a las que performan mejor",
    "Agendamos visitas y reuniones automáticamente",
    "Incrementamos la conversión entre 30-400%"
  ];

  const allianceRoles = [
    {
      id: 'atenea',
      label: 'Rol de Atenea',
      title: 'CAPTACIÓN + PERFORMANCE',
      logo: 'https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0184.png',
      examples: [
        { 
          title: "ATENEA GENERA Y ESCALA LA DEMANDA", 
          features: [
            'Generamos tráfico de calidad desde Google, Meta y Linkedin',
            'Segmentamos y optimizamos para lead calificado',
            'Diseñamos creatividades y mensajes para proyectos inmobiliarios',
            'Optimizamos de forma continua con reporting claro',
            'Aportamos expertise real en vertical inmobiliaria'
          ]
        },
        { title: "Caso de Éxito: Torre Norte", desc: "Reducción del 45% en el costo por lead mediante retargeting dinámico y creatividades de alto impacto." },
        { title: "Lanzamiento: Residencial Sur", desc: "Captación de 500+ leads calificados en 30 días usando segmentación avanzada por intención de compra." }
      ]
    },
    {
      id: 'patagon',
      label: 'Rol de Patagon',
      title: 'CONVERSIÓN + CALIFICACIÓN 24/7',
      logo: 'https://s.yimg.com/ny/api/res/1.2/P6UWQz6rwjfMH0Fq2E8UMg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/es/valora_628/eee9853c1556a5bf4e9c3f9a287e29e6',
      examples: [
        { 
          title: "PATAGON CONVIERTE ESA DEMANDA EN OPORTUNIDADES REALES", 
          features: [
            'Respondemos de forma inmediata 24/7',
            'Conversamos de manera natural y contextualizada',
            'Optimizamos las campañas en base a las que performan mejor',
            'Agendamos visitas y reuniones automáticamente',
            'Incrementamos la conversión entre 30-400%'
          ]
        },
        { title: "Venta Nocturna", desc: "Un lead consultó a las 3 AM; Patagon lo calificó y agendó una visita para la mañana siguiente sin intervención humana." },
        { title: "Escalabilidad de Ventas", desc: "Incremento del 150% en visitas efectivas al reducir el tiempo de respuesta de horas a segundos." }
      ]
    }
  ];

  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  useEffect(() => {
    setCurrentExampleIndex(0);
  }, [selectedAllianceTab]);

  const handleNextExample = () => {
    const role = allianceRoles.find(r => r.id === selectedAllianceTab);
    if (role && role.examples) {
      setCurrentExampleIndex((prev) => (prev + 1) % role.examples.length);
    }
  };

  const results = [
    { value: "+35%", label: "EN VENTAS CON MENOR INVERSIÓN" },
    { value: "2.5x", label: "MÁS REUNIONES AGENDADAS" },
    { value: "4x", label: "MÁS CONVERSIÓN" },
    { value: "+68%", label: "EN LEADS CALIFICADOS" }
  ];

  const serviciosList = [
    { text: "Implementación y optimización de campañas en Google Ads, Meta Ads y cualquier plataforma requerida." },
    { text: "Dashboard de métricas, reunión semanal de status, reunión mensual de seguimiento y revisión de estrategia y contacto vía email, whatsapp u otro canal que se disponga." },
    { text: "Diseño de piezas y creatividades para los anuncios." },
    { text: "Soporte, implementación, y derivados de Patagon AI." },
    { text: "Campañas automatizadas de Email Marketing." },
    { text: "Contrato por 3 meses de iniciación." },
    { text: "Auditoría inicial incluida sin costo adicional." }
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const whatsappMessage = `Hola Atenea Growth!\nLes escribo de parte de ${companyName ? companyName : '[Nombre de tu empresa]'}.\nMe gustaría contactarme con un asesor`;
  const whatsappUrl = `https://wa.me/5491124774256?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <CurtainReveal
      footer={<ContactCTA companyName={companyName} setCompanyName={setCompanyName} />}
      footerClassName="bg-white"
    >
      <div style={customStyles} className="w-full min-h-screen bg-brand-secondary font-sans text-brand-primary">
        
        {/* SECCIÓN: IMAGEN DE FONDO (CARÁTULA) */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0507.jpeg" 
          alt="Fondo" 
          className="absolute inset-0 w-full h-full object-cover saturate-150 contrast-125 brightness-110"
        />
        <div className="absolute inset-0 z-10 container mx-auto px-6 md:px-20 lg:px-32 flex flex-col justify-center pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-white text-5xl sm:text-6xl md:text-9xl font-bold leading-[1.1] tracking-tight uppercase drop-shadow-xl">
              Propuesta<br />comercial
              {customData?.companyName && (
                <>
                  <br />
                  <span className="text-brand-accent text-3xl sm:text-4xl md:text-7xl mt-2 block">
                    para {customData.companyName}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-6 md:mt-8 text-white/90 text-lg sm:text-xl md:text-2xl font-light max-w-2xl border-l-2 border-brand-accent pl-4 md:pl-6 uppercase tracking-wider drop-shadow-lg">
              Partner tecnológico de crecimiento, cobrando por <span className="text-brand-accent font-semibold drop-shadow-md">leads calificados</span>.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-white text-xs uppercase tracking-[0.3em] font-bold drop-shadow-md">Scroll</span>
          <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-white absolute top-0"
              animate={{ top: ['-50%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

      </section>

      {/* SECCIÓN: VISIÓN COMPARTIDA */}
      {customData && <VisionCompartidaSection customData={customData} />}

      {/* SECCIÓN 2: EL CONTEXTO */}
      <section className="relative w-full min-h-[100dvh] bg-[#e0e5ec] py-8 md:py-16 flex flex-col justify-center border-b border-gray-200 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-20 lg:px-32 max-w-6xl flex flex-col h-full justify-evenly">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-6 md:mb-12 text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tight text-slate-700 drop-shadow-sm uppercase">El contexto</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-4 md:space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex flex-row items-center md:items-start space-x-3 md:space-x-8 bg-[#e0e5ec] p-4 md:p-8 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]">
              <div className="bg-[#e0e5ec] p-3 md:p-5 rounded-2xl flex-shrink-0 shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
                <Timer className="w-6 h-6 md:w-10 md:h-10 text-brand-accent" />
              </div>
              <div className="flex-1 uppercase tracking-tight">
                <p className="text-[11px] sm:text-sm md:text-xl lg:text-2xl text-slate-600 leading-snug md:leading-relaxed mb-1 md:mb-2 font-medium">El sector inmobiliario pierde leads por tiempos de respuesta lentos.</p>
                <p className="text-[11px] sm:text-sm md:text-xl lg:text-2xl text-brand-accent font-black drop-shadow-sm">Responder en 5 min convierte 100x más que en 30.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-row items-center md:items-start space-x-3 md:space-x-8 bg-[#e0e5ec] p-4 md:p-8 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]">
              <div className="bg-[#e0e5ec] p-3 md:p-5 rounded-2xl flex-shrink-0 shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
                <UserX className="w-6 h-6 md:w-10 md:h-10 text-rose-400" />
              </div>
              <div className="flex-1 text-[11px] sm:text-sm md:text-xl lg:text-2xl text-slate-600 leading-snug md:leading-relaxed uppercase tracking-tight font-medium">
                <p>Los formularios y chatbots tradicionales destruyen conversión: no califican, ni actualizan el CRM.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-row items-center md:items-start space-x-3 md:space-x-8 bg-[#e0e5ec] p-4 md:p-8 rounded-3xl shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]">
              <div className="bg-[#e0e5ec] p-3 md:p-5 rounded-2xl flex-shrink-0 shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]">
                <Target className="w-6 h-6 md:w-10 md:h-10 text-blue-500" />
              </div>
              <div className="flex-1 text-[11px] sm:text-sm md:text-xl lg:text-2xl text-slate-700 leading-snug md:leading-relaxed uppercase tracking-tight font-black">
                <p>{customData?.companyName ? `${customData.companyName} necesita` : 'Las inmobiliarias necesitan'}: velocidad + calificación real + CRM en tiempo real.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* SECCIÓN: ALIANZA CON PATAGON */}
      <section className="relative w-full bg-brand-primary pt-16 md:pt-24 pb-4 md:pb-6 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 md:px-20 lg:px-32 max-w-7xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4 italic drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              Alianza con <span className="text-brand-accent drop-shadow-[0_0_12px_rgba(74,222,128,0.6)]">Patagon</span>
            </h2>
          </motion.div>

          <div className={`rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500 ${selectedAllianceTab === 'patagon' ? 'bg-[#edd5b1] shadow-[12px_12px_24px_#c9b596,-12px_-12px_24px_#ffffff]' : 'bg-brand-primary shadow-[12px_12px_24px_rgba(0,0,0,0.5),-12px_-12px_24px_rgba(255,255,255,0.05)]'}`}>
            {/* Tab Selector */}
            <div className="flex justify-center mb-4 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className={`${selectedAllianceTab === 'patagon' ? 'bg-[#edd5b1] shadow-[inset_6px_6px_12px_#c9b596,inset_-6px_-6px_12px_#ffffff]' : 'bg-brand-primary shadow-[inset_6px_6px_12px_rgba(0,0,0,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.05)]'} p-1.5 rounded-full flex flex-row gap-1 md:gap-2 relative min-w-max transition-colors duration-500`}>
                {allianceRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedAllianceTab(role.id)}
                    className={`relative px-4 py-2.5 md:px-10 md:py-4 rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${
                      selectedAllianceTab === role.id
                        ? selectedAllianceTab === 'patagon'
                          ? 'bg-[#edd5b1] text-brand-primary shadow-[4px_4px_8px_#c9b596,-4px_-4px_8px_#ffffff]'
                          : 'bg-brand-accent text-brand-primary shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.2)]'
                        : selectedAllianceTab === 'patagon' ? 'text-black/60 hover:text-black' : 'text-slate-400 hover:text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {allianceRoles.map((role) => (
                selectedAllianceTab === role.id && (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, x: role.id === 'atenea' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                  >
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <h3 className={`text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none transition-colors duration-500 ${selectedAllianceTab === 'patagon' ? 'text-black' : 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'}`}>
                          {role.title}
                        </h3>
                      </div>
                      
                      {/* Ejemplos Swipeable */}
                      <div className="relative mt-4">
                        <div className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${selectedAllianceTab === 'patagon' ? 'text-black/40' : 'text-white/40'}`}>
                          <Hand className="w-4 h-4 animate-bounce" />
                          Deslizar para ver ejemplos
                        </div>
                        
                        <div className="relative min-h-[450px] md:min-h-[520px] w-full overflow-hidden rounded-2xl">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${role.id}-${currentExampleIndex}`}
                              initial={{ x: 300, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -300, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              onDragEnd={(_, info) => {
                                if (info.offset.x < -50) handleNextExample();
                              }}
                              onClick={handleNextExample}
                              className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-start cursor-pointer select-none ${
                                selectedAllianceTab === 'patagon' 
                                  ? 'bg-[#edd5b1] shadow-[8px_8px_16px_#c9b596,-8px_-8px_16px_#ffffff] text-black' 
                                  : 'bg-brand-primary shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)] text-white'
                              } rounded-2xl transition-all duration-500`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${selectedAllianceTab === 'patagon' ? 'text-black/40' : 'text-brand-accent drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]'}`}>
                                  {currentExampleIndex === 0 ? 'Información General' : `Ejemplo ${currentExampleIndex}`}
                                </span>
                                <ArrowRight className="w-4 h-4 opacity-50" />
                              </div>
                              
                              <h4 className={`text-xl md:text-2xl font-black uppercase italic mb-2 tracking-tight leading-tight ${selectedAllianceTab === 'patagon' ? 'text-black' : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'}`}>
                                {role.examples[currentExampleIndex].title}
                              </h4>
                              
                              {role.examples[currentExampleIndex].desc && (
                                <p className={`text-sm md:text-base font-bold uppercase tracking-wide mb-4 ${selectedAllianceTab === 'patagon' ? 'text-black/80' : 'text-brand-accent drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]'}`}>
                                  {role.examples[currentExampleIndex].desc}
                                </p>
                              )}

                              {role.examples[currentExampleIndex].features && (
                                <ul className="space-y-3 md:space-y-4">
                                  {role.examples[currentExampleIndex].features.map((feature, idx) => (
                                    <li key={idx} className={`flex items-start gap-3 text-xs md:text-sm font-light uppercase tracking-tight transition-colors duration-500 ${selectedAllianceTab === 'patagon' ? 'text-black/70' : 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'}`}>
                                      <Check className={`${selectedAllianceTab === 'patagon' ? 'text-black' : 'text-brand-accent drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]'} w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-500`} />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {currentExampleIndex === 0 && role.logo && (
                                <div className="mt-auto pt-6 flex justify-center">
                                  <img 
                                    src={role.logo} 
                                    alt={`${role.id} Logo`} 
                                    className="w-1/4 md:w-1/3 h-auto object-contain hover:scale-110 transition-transform duration-700 relative z-10"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                    {role.id === 'patagon' && (
                      <div className="hidden md:flex items-center justify-center">
                        <Zap className="w-32 h-32 md:w-48 md:h-48 text-black opacity-10" />
                      </div>
                    )}
                  </motion.div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img src="https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0202.jpeg" alt="Slide 202" className="w-full h-auto object-cover" />
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img src="https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0203.jpeg" alt="Slide 203" className="w-full h-auto object-cover" />
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full"
      >
        <img src="https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0205.jpeg" alt="Slide 205" className="w-full h-auto object-cover" />
        {customData?.img1 && (
          <div className="absolute top-[21%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[10%] aspect-square flex items-center justify-center">
            <img 
              src={customData.img1} 
              alt="Logo Inmobiliaria" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </motion.section>
      
      {/* SECCIONES DE IMAGEN (COMPROBANTE) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full bg-brand-secondary flex flex-col border-b border-gray-100"
      >
        <img src={images.img0124} alt="Slide 0124" className="w-full h-auto block object-cover" />
        
        <div className="w-full overflow-hidden bg-brand-secondary flex flex-col">
          <div className="flex w-max animate-marquee">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <img 
                key={`diagrama-${idx}`} 
                src={images.diagrama} 
                alt="Diagrama" 
                className="h-20 sm:h-28 md:h-36 lg:h-48 w-auto max-w-none flex-shrink-0 object-contain" 
              />
            ))}
          </div>
          <div className="flex w-max animate-marquee-reverse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <img 
                key={`diagrama2-${idx}`} 
                src={images.diagrama2} 
                alt="Diagrama 2" 
                className="h-20 sm:h-28 md:h-36 lg:h-48 w-auto max-w-none flex-shrink-0 object-contain" 
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-hidden bg-brand-primary py-20 md:py-32"
      >
        <div className="container mx-auto px-6 md:px-20 lg:px-32 flex flex-col items-center">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-16 text-center uppercase tracking-tighter"
            >
              Resultados comprobados en negocios
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center text-white w-full">
                {results.map((res, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-[#22c55e] text-4xl sm:text-5xl md:text-8xl font-black mb-2 md:mb-4">{res.value}</span>
                      <span className="text-white text-[9px] sm:text-[10px] md:text-base font-bold tracking-widest uppercase">{res.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </motion.section>

      <div className="marquee-bar">
        <div className="marquee-row">
          {/* Se duplica el array para crear el efecto de scroll infinito sin cortes */}
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {[
                "Meta Ads", 
                "Google Ads", 
                "Mercado Libre Ads", 
                "TikTok Ads", 
                "Performance Marketing", 
                "ROAS Optimization", 
                "Full-Funnel Attribution", 
                "Creative Testing"
              ].map((item) => (
                <span key={item} className="m-item">
                  {item}
                  <span className="m-sep">✦</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SECCIÓN 8.5: PLAN DE ESCALAMIENTO */}
      <PlanEscalamiento customData={customData} />

      {/* SECCIÓN 9: DESGLOSE DE SERVICIOS */}
      <section className="min-h-screen bg-brand-primary text-white p-4 md:p-12 lg:p-24 font-sans border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 text-brand-accent inline-block border-b-4 border-brand-accent pb-2 uppercase italic tracking-tighter">
              Desglose de Servicios
            </h1>
            <p className="text-slate-400 mt-4 md:mt-6 text-sm sm:text-base md:text-xl uppercase tracking-[0.1em] md:tracking-[0.2em]">Selecciona el plan que mejor se adapte a tus objetivos</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 shadow-2xl relative overflow-hidden backdrop-blur-sm"
          >
            {/* Tab Selector */}
            <div className="flex justify-start md:justify-end mb-8 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="bg-white/5 p-1.5 rounded-full border border-white/10 flex flex-row gap-1 md:gap-2 relative min-w-max">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${
                      selectedPlan === plan.id
                        ? 'bg-brand-accent text-brand-primary shadow-[0_0_20px_rgba(74,222,128,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {plan.title}
                    {plan.highlight && (
                      <Star className={`w-3 h-3 md:w-4 md:h-4 ${selectedPlan === plan.id ? 'text-brand-primary fill-brand-primary' : 'text-emerald-500 fill-emerald-500'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              {plans.map((plan) => (
                selectedPlan === plan.id && (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex flex-col h-full rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-2 bg-white/10 border-brand-accent shadow-[0_0_50px_-10px_rgba(74,222,128,0.3)]"
                  >
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <div className="p-3 bg-brand-accent/10 rounded-2xl">
                        {plan.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase italic">{plan.title}</h3>
                    </div>

                    <div className="mb-6 md:mb-8 text-left">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-black text-brand-accent tracking-tighter">{plan.price}</span>
                        <span className="text-brand-accent/80 font-bold uppercase text-[10px] md:text-xs tracking-widest">{plan.unit}</span>
                      </div>
                      <p className="text-slate-400 text-xs md:text-sm mt-4 leading-relaxed font-medium">
                        {plan.description}
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 flex-grow text-left">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 bg-brand-accent/20 p-1 rounded-full flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-brand-accent" />
                          </div>
                          <span className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm bg-brand-accent text-black shadow-lg shadow-brand-accent/20 hover:opacity-90"
                    >
                      Elegir este plan
                      <MousePointer2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                )
              ))}
            </div>
            
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 md:pt-10 gap-4 md:gap-6">
              <div className="flex items-center gap-3 text-slate-500 text-xs md:text-sm uppercase tracking-widest font-bold">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                <span className="text-center md:text-left">Soporte técnico especializado incluido.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ 
          opacity: showWhatsApp ? 1 : 0, 
          scale: showWhatsApp ? 1 : 0,
          x: showWhatsApp ? 0 : 20
        }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        title="Contactar por WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
      </div>
    </CurtainReveal>
  );
}
