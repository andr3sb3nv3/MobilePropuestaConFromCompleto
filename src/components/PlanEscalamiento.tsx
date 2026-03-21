import React from "react";
import { motion } from "motion/react";

const roadmapData = [
  { phase: "01 — Semana 1", title: "Setup Inicial", description: "Definimos tu lead ideal, playbook de calificación y objetivos comerciales.", emoji: "🎯" },
  { phase: "02 — Semana 1–2", title: "Creatividades", description: "Conectamos CRM y entrenamos al agente IA con tu proceso de ventas.", emoji: "🧪" },
  { phase: "03 — Semana 2", title: "Go Live", description: "Sistema 24/7 en vivo. Respuestas inmediatas y visitas agendadas automáticamente.", emoji: "🚀" },
  { phase: "04 — Semana 3+", title: "Análisis CRO", description: "Optimizamos conversión y generamos insights accionables de tu web.", emoji: "📊" },
  { phase: "05 — Continuo", title: "Medición Real", description: "Mejora continua basada en datos. Optimización de pauta constante.", emoji: "⚡" },
  { phase: "Partner", title: "Growth Partner", description: "Acompañamiento estratégico a largo plazo para escalar tus resultados.", emoji: "🤝", isInfinite: true },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } }
};

export default function PlanEscalamiento({ customData }: { customData: any }) {
  return (
    <section className="bg-[#001A31] text-white py-20 min-h-screen relative bg-grid">
      <div className="max-w-7xl mx-auto px-8 py-20 relative">
        <div className="flex flex-col lg:flex-row gap-20">
          
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <span className="border border-[#16E077]/20 bg-[#16E077]/5 text-[#16E077] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase inline-block mb-8">
              Implementation Roadmap
            </span>
            <h2 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight uppercase">
              Roadmap - <br/> <span className="text-[#16E077]">Atenea</span> <br/> 
              {customData?.companyName ? (
                <>
                  <span style={{ color: customData?.color1 }}>{customData?.companyName?.split(' ')[0]}</span>
                  <span style={{ color: customData?.color2 }}>{customData?.companyName?.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <span className="text-white">Inmobiliaria</span>
              )}
            </h2>
            <p className="mt-8 text-gray-300 max-w-xs text-xs font-bold tracking-widest leading-relaxed opacity-80 uppercase">
              PARTNER DE CRECIMIENTO INTEGRAL: DESDE LA ESTRATEGIA HASTA LA OPTIMIZACIÓN CONTINUA.
            </p>
          </div>

          <div className="lg:w-2/3 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#16E077] to-transparent opacity-40 shadow-[0_0_8px_rgba(22,224,119,0.15)]"></div>

            <div className="space-y-32 py-4">
              {roadmapData.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className="relative pl-12"
                >
                  <div className={`absolute -left-[4px] top-2 w-2 h-2 rounded-full z-10 ${step.isInfinite ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-[#16E077] shadow-[0_0_15px_2px_rgba(22,224,119,0.15),0_0_5px_#16E077]'}`}></div>
                  <p className="text-[#16E077] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">{step.phase}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center gap-3">
                    <span>{step.emoji}</span> {step.isInfinite ? <span className="text-[#16E077]">∞</span> : null} {step.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed font-light opacity-90">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
