import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Clock, UserX, Target, ChevronDown, Timer, 
  Check, Minus, Laptop, Users, Info, 
  MousePointer2, Zap, Palette, Rocket, Star, Eye, X, Linkedin, MessageCircle, Mail
} from 'lucide-react';

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

function ContactCTA() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20 bg-white text-center">
      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-primary mb-8">
        Hablemos
      </h2>
      
      <div className="flex justify-center gap-6 mb-12">
        <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-brand-accent hover:text-white transition-colors text-brand-primary">
          <Linkedin className="w-8 h-8" />
        </a>
        <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-brand-accent hover:text-white transition-colors text-brand-primary">
          <MessageCircle className="w-8 h-8" />
        </a>
        <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-brand-accent hover:text-white transition-colors text-brand-primary">
          <Mail className="w-8 h-8" />
        </a>
      </div>

      <form className="max-w-md mx-auto space-y-4 text-left">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nombre de la empresa</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            placeholder="Ej. Acme Corp"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>
        <button 
          type="button"
          className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-colors uppercase tracking-wider text-sm"
        >
          Enviar Mensaje
        </button>
      </form>

      {/* Logo Atenea Footer */}
      <div className="mt-20 flex justify-center">
        <a href="#/create" className="inline-block transition-transform hover:scale-105">
          <img 
            src="https://raw.githubusercontent.com/andr3sb3nv3/AteneaPNG/refs/heads/main/IMG_0184.png" 
            alt="Logo Atenea" 
            className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('patagon');
  const [selectedAllianceTab, setSelectedAllianceTab] = useState<string>('atenea');
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
      description: 'ATENEA GENERA Y ESCALA LA DEMANDA',
      logo: 'https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0184.png',
      features: [
        'Generamos tráfico de calidad desde Google, Meta y Linkedin',
        'Segmentamos y optimizamos para lead calificado',
        'Diseñamos creatividades y mensajes para proyectos inmobiliarios',
        'Optimizamos de forma continua con reporting claro',
        'Aportamos expertise real en vertical inmobiliaria'
      ]
    },
    {
      id: 'patagon',
      label: 'Rol de Patagon',
      title: 'CONVERSIÓN + CALIFICACIÓN 24/7',
      description: 'PATAGON CONVIERTE ESA DEMANDA EN OPORTUNIDADES REALES',
      logo: 'https://s.yimg.com/ny/api/res/1.2/P6UWQz6rwjfMH0Fq2E8UMg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/es/valora_628/eee9853c1556a5bf4e9c3f9a287e29e6',
      features: [
        'Respondemos de forma inmediata 24/7',
        'Conversamos de manera natural y contextualizada',
        'Optimizamos las campañas en base a las que performan mejor',
        'Agendamos visitas y reuniones automáticamente',
        'Incrementamos la conversión entre 30-400%'
      ]
    }
  ];

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

  return (
    <CurtainReveal
      footer={<ContactCTA />}
      footerClassName="bg-white"
    >
      <div style={customStyles} className="w-full min-h-screen bg-brand-secondary font-sans text-brand-primary">
        
        {/* SECCIÓN: IMAGEN DE FONDO (CARÁTULA) */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <img 
          src="https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/ffffff.drawio.png" 
          alt="Fondo" 
          className="absolute inset-0 w-full h-full object-cover saturate-150 contrast-125 brightness-110"
        />
        <div className="absolute inset-0 z-10 container mx-auto px-6 md:px-20 lg:px-32 flex flex-col justify-center">
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

        {/* Bottom Right Logo */}
        <motion.div
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <img 
            src="https://raw.githubusercontent.com/andr3sb3nv3/Banco-de-im-genes-Atenea/refs/heads/main/IMG_0184.png" 
            alt="Logo Atenea" 
            className="h-24 md:h-32 w-auto object-contain"
          />
        </motion.div>
      </section>

      {/* SECCIONES DE IMAGEN */}
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

      {/* SECCIÓN: VISIÓN COMPARTIDA */}
      {customData && <VisionCompartidaSection customData={customData} />}

      {/* SECCIÓN 2: EL CONTEXTO */}
      <section className="relative w-full min-h-screen bg-brand-secondary py-20 md:py-24 flex flex-col justify-center border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-20 lg:px-32 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight text-brand-primary">El contexto</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12 md:space-y-20"
          >
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-10">
              <div className="bg-gray-100 p-4 md:p-5 rounded-2xl flex-shrink-0"><Timer className="w-10 h-10 md:w-12 md:h-12 text-gray-700" /></div>
              <div className="flex-1 border-b border-gray-200 pb-8 md:pb-10 uppercase tracking-tight">
                <p className="text-lg sm:text-xl md:text-3xl text-gray-700 leading-relaxed mb-4">El sector inmobiliario pierde miles de leads por tiempos de respuesta lentos y mala calificación.</p>
                <p className="text-lg sm:text-xl md:text-3xl text-[#22c55e] font-bold">Responder en 5 minutos convierte 100x más que hacerlo en 30.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-10">
              <div className="bg-gray-100 p-4 md:p-5 rounded-2xl flex-shrink-0"><UserX className="w-10 h-10 md:w-12 md:h-12 text-gray-700" /></div>
              <div className="flex-1 border-b border-gray-200 pb-8 md:pb-10 text-lg sm:text-xl md:text-3xl text-gray-700 leading-relaxed uppercase tracking-tight">
                <p>Los formularios y chatbots tradicionales destruyen conversión: no califican, no siguen el playbook y no actualizan el CRM.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-10">
              <div className="bg-gray-100 p-4 md:p-5 rounded-2xl flex-shrink-0"><Target className="w-10 h-10 md:w-12 md:h-12 text-gray-700" /></div>
              <div className="flex-1 text-lg sm:text-xl md:text-3xl text-gray-700 leading-relaxed uppercase tracking-tight font-bold">
                <p>{customData?.companyName ? `${customData.companyName} necesita` : 'Las inmobiliarias necesitan'}: velocidad + calificación real + CRM actualizado en tiempo real para no perder oportunidades.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN: ALIANZA CON PATAGON */}
      <section className="relative w-full bg-brand-primary py-20 md:py-32 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 md:px-20 lg:px-32 max-w-7xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8 italic">
              Alianza con <span className="text-brand-accent">Patagon</span>
            </h2>
          </motion.div>

          <div className={`border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 shadow-2xl relative overflow-hidden backdrop-blur-sm transition-all duration-500 ${selectedAllianceTab === 'patagon' ? 'bg-[#edd5b1]' : 'bg-white/5'}`}>
            {/* Tab Selector */}
            <div className="flex justify-center mb-12 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className={`${selectedAllianceTab === 'patagon' ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} p-1.5 rounded-full border flex flex-row gap-1 md:gap-2 relative min-w-max transition-colors duration-500`}>
                {allianceRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedAllianceTab(role.id)}
                    className={`relative px-4 py-2.5 md:px-10 md:py-4 rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${
                      selectedAllianceTab === role.id
                        ? 'bg-brand-accent text-brand-primary shadow-[0_0_20px_rgba(74,222,128,0.3)]'
                        : selectedAllianceTab === 'patagon' ? 'text-black/60 hover:text-black hover:bg-black/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                        <h3 className={`text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none transition-colors duration-500 ${selectedAllianceTab === 'patagon' ? 'text-black' : 'text-white'}`}>
                          {role.title}
                        </h3>
                        <p className={`text-lg font-bold uppercase tracking-wide transition-colors duration-500 ${selectedAllianceTab === 'patagon' ? 'text-black/80' : 'text-brand-accent'}`}>
                          {role.description}
                        </p>
                        <ul className="space-y-4">
                          {role.features.map((feature, idx) => (
                            <li key={idx} className={`flex items-start gap-3 text-sm md:text-base font-light uppercase tracking-tight transition-colors duration-500 ${selectedAllianceTab === 'patagon' ? 'text-black/70' : 'text-slate-300'}`}>
                              <Check className={`${selectedAllianceTab === 'patagon' ? 'text-black' : 'text-brand-accent'} w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-500`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {role.logo && (
                        <div className="pt-4 flex justify-center">
                          <img 
                            src={role.logo} 
                            alt={`${role.id} Logo`} 
                            className="w-1/4 md:w-1/3 h-auto object-contain hover:scale-110 transition-transform duration-700 relative z-10"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
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
      
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img src={images.img0082} alt="Slide 82" className="w-full h-auto object-cover" />
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

      {/* SECCIÓN 8: SERVICIOS */}
      <section className="relative w-full min-h-screen bg-brand-primary py-16 md:py-20 text-white flex items-center">
        <div className="container mx-auto px-6 md:px-20 lg:px-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-4 space-y-8 md:space-y-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-4 md:mb-8 italic underline decoration-brand-accent underline-offset-8 decoration-4">Servicios</h2>
            <div>
              <div className="inline-block bg-brand-accent text-brand-primary px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest mb-4">Representa</div>
              <p className="text-lg md:text-xl font-medium text-gray-400 mb-6 uppercase italic">Equipo dedicado a {customData?.companyName || '(Inmobiliaria)'}</p>
              <ul className="space-y-3">
                {['Account Manager', 'Paid Media Analyst', 'Patagon Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-base md:text-lg text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-8 space-y-6 pt-4"
          >
            <ul className="space-y-3 md:space-y-4">
              {serviciosList.map((s, i) => (
                <motion.li 
                  key={i} 
                  variants={fadeInUp}
                  className="flex items-start gap-3 text-base sm:text-lg md:text-xl font-light text-gray-200 leading-snug uppercase tracking-tight"
                >
                  <Check className="text-brand-accent w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" />
                  {s.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

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
      </div>
    </CurtainReveal>
  );
}
