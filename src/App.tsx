import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, UserX, Target, ChevronDown, Timer, 
  Check, Minus, Laptop, Users, Info, 
  MousePointer2, Zap, Palette, Rocket, Star
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

  const handleGenerate = () => {
    const data = { img1, img2, text, companyName, color1, color2, color3 };
    const base64 = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}${window.location.pathname}#/p/${base64}`;
    setGeneratedUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg my-8">
        <h2 className="text-2xl font-bold mb-6 text-brand-primary">Crear Propuesta Personalizada</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-accent outline-none"
              value={companyName} 
              onChange={e => setCompanyName(e.target.value)} 
              placeholder="Ej. Atenea Growth"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen 1</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-accent outline-none"
              value={img1} 
              onChange={e => setImg1(e.target.value)} 
              placeholder="https://ejemplo.com/imagen1.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen 2</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-accent outline-none"
              value={img2} 
              onChange={e => setImg2(e.target.value)} 
              placeholder="https://ejemplo.com/imagen2.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frase / Texto</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-brand-accent outline-none"
              value={text} 
              onChange={e => setText(e.target.value)} 
              placeholder="Escribe la frase aquí..."
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color Principal (Oscuro)</label>
              <input 
                type="color" 
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                value={color1} 
                onChange={e => setColor1(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color Acento (Brillante)</label>
              <input 
                type="color" 
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                value={color2} 
                onChange={e => setColor2(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Color Secundario (Claro)</label>
              <input 
                type="color" 
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                value={color3} 
                onChange={e => setColor3(e.target.value)} 
              />
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            className="w-full bg-brand-accent text-brand-primary font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-4"
          >
            Generar URL
          </button>
          
          {generatedUrl && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg break-all">
              <p className="text-sm text-gray-600 mb-2 font-bold">URL Generada:</p>
              <a href={generatedUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-medium hover:underline text-sm">
                {generatedUrl}
              </a>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-800 hover:underline">Volver a la propuesta principal</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('patagon');
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#/create') {
    return <CreateProposal />;
  }

  let customData: { img1?: string, img2?: string, text?: string, companyName?: string, color1?: string, color2?: string, color3?: string } | null = null;
  if (route.startsWith('#/p/')) {
    try {
      const base64 = route.replace('#/p/', '');
      customData = JSON.parse(decodeURIComponent(atob(base64)));
    } catch (e) {
      console.error("Invalid custom data in URL");
    }
  }

  const customStyles = customData ? {
    '--theme-primary': customData.color1 || '#0a192f',
    '--theme-accent': customData.color2 || '#4ade80',
    '--theme-secondary': customData.color3 || '#ffffff',
  } as React.CSSProperties : {};

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
    "Diseñamos creatividades y mensajes para proyectos inmobiliarios",
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
    <div style={customStyles} className="w-full min-h-screen bg-brand-secondary font-sans text-brand-primary overflow-x-hidden">
      
      {/* SECCIÓN: IMAGEN DE FONDO (CARÁTULA) */}
      <section className="relative w-full flex items-center overflow-hidden">
        <img 
          src={images.img0121} 
          alt="Fondo" 
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 z-10 container mx-auto px-6 md:px-20 lg:px-32 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
      </section>

      {/* SECCIÓN PERSONALIZADA (Si existe) */}
      {customData && (customData.img1 || customData.img2 || customData.text) && (
        <section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-24 md:py-32 overflow-hidden border-b border-gray-100">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          
          <div className="container mx-auto px-6 md:px-20 lg:px-32 max-w-7xl relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 md:mb-24"
            >
              <div className="inline-block bg-brand-accent text-brand-primary px-6 py-2 rounded-full font-bold text-sm uppercase tracking-[0.2em] mb-6 shadow-lg shadow-brand-accent/30">
                Visión Compartida
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-brand-primary uppercase tracking-tighter leading-none mb-8">
                Por qué creemos en el <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">potencial de tu negocio</span>
              </h2>
              
              {customData.text && (
                <div className="relative max-w-5xl mx-auto mt-16">
                  <div className="absolute inset-0 bg-brand-accent transform rotate-1 rounded-3xl opacity-20"></div>
                  <div className="relative p-8 md:p-16 bg-brand-secondary rounded-3xl shadow-2xl border border-gray-100 transform -rotate-1 transition-transform hover:rotate-0 duration-500">
                    <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 text-brand-accent opacity-40">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-24 md:h-24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-2xl sm:text-4xl md:text-6xl font-black text-brand-primary uppercase tracking-tighter leading-[1.1] relative z-10 italic">
                      "{customData.text}"
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            <div className={`grid grid-cols-1 ${customData.img1 && customData.img2 ? 'md:grid-cols-2' : 'max-w-4xl mx-auto'} gap-8 md:gap-12`}>
              {customData.img1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rounded-3xl overflow-hidden shadow-2xl border-8 border-brand-secondary bg-brand-secondary flex items-center justify-center hover:border-brand-accent transition-colors duration-500 group"
                >
                  <img src={customData.img1} alt="Visión 1" className="w-full h-auto object-contain max-h-[700px] group-hover:scale-[1.02] transition-transform duration-700" />
                </motion.div>
              )}
              {customData.img2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="rounded-3xl overflow-hidden shadow-2xl border-8 border-brand-secondary bg-brand-secondary flex items-center justify-center hover:border-brand-accent transition-colors duration-500 group"
                >
                  <img src={customData.img2} alt="Visión 2" className="w-full h-auto object-contain max-h-[700px] group-hover:scale-[1.02] transition-transform duration-700" />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

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
                <p>Las inmobiliarias necesitan: velocidad + calificación real + CRM actualizado en tiempo real para no perder oportunidades.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img src={images.img0122} alt="Slide 122" className="w-full h-auto object-cover" />
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img src={images.img0123} alt="Slide 123" className="w-full h-auto object-cover" />
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <img src={images.img0105} alt="Slide 105" className="w-full h-auto object-cover" />
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
              <p className="text-lg md:text-xl font-medium text-gray-400 mb-6 uppercase italic">Equipo dedicado a (Inmobiliaria)</p>
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 text-emerald-400 inline-block border-b-4 border-emerald-400 pb-2 uppercase italic tracking-tighter">
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
                        ? 'bg-emerald-400 text-brand-primary shadow-[0_0_20px_rgba(52,211,153,0.3)]'
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
                    className="relative flex flex-col h-full rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-2 bg-white/10 border-emerald-400 shadow-[0_0_50px_-10px_rgba(52,211,153,0.3)]"
                  >
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <div className="p-3 bg-emerald-500/10 rounded-2xl">
                        {plan.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase italic">{plan.title}</h3>
                    </div>

                    <div className="mb-6 md:mb-8 text-left">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter">{plan.price}</span>
                        <span className="text-emerald-400/80 font-bold uppercase text-[10px] md:text-xs tracking-widest">{plan.unit}</span>
                      </div>
                      <p className="text-slate-400 text-xs md:text-sm mt-4 leading-relaxed font-medium">
                        {plan.description}
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 flex-grow text-left">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 bg-emerald-500/20 p-1 rounded-full flex-shrink-0">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                          </div>
                          <span className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
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

      {/* Footer Final */}
      <footer className="w-full bg-brand-secondary py-12 md:py-16 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 font-bold gap-6 md:gap-0">
          <span className="tracking-[0.3em] md:tracking-[0.5em] text-center md:text-left">ATENEA GROWTH MARKETING</span>
          <a href="#/create" className="uppercase tracking-widest text-center hover:text-gray-600 transition-colors">Propuesta Comercial - 2024</a>
          <div className="flex items-center space-x-3 text-black">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-black rotate-45" />
            <span className="font-black uppercase tracking-widest text-black text-[10px] md:text-xs">PATAGON AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
