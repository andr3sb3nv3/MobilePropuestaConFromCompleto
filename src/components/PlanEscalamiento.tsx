import React, { useState, useEffect } from "react";
import { Play, Zap, Users, Pause } from "lucide-react";
import { motion } from "motion/react";

// Datos de ejemplo
const roadmapData = [
  { phase: "01", title: "Setup Inicial", timing: "Semana 1", description: "Definimos tu lead ideal, playbook de calificación y objetivos comerciales.", emoji: "🎯" },
  { phase: "02", title: "Creatividades", timing: "Semana 1–2", description: "Conectamos CRM y entrenamos al agente IA con tu proceso de ventas.", emoji: "🧪" },
  { phase: "03", title: "Go Live", timing: "Semana 2", description: "Sistema 24/7 en vivo. Respuestas inmediatas y visitas agendadas automáticamente.", emoji: "🚀" },
  { phase: "04", title: "Análisis CRO", timing: "Semana 3+", description: "Optimizamos conversión y generamos insights accionables de tu web.", emoji: "📊" },
  { phase: "05", title: "Medición Real", timing: "CONTINUO", description: "Mejora continua basada en datos. Optimización de pauta constante.", emoji: "⚡" },
  { phase: "∞", title: "Growth Partner", timing: "SIEMPRE", description: "Estructura para escalar. Somos tu socio estratégico de crecimiento.", emoji: "🤝" },
];

const narrationTexts = [
  "Arrancamos definiendo tu lead ideal, playbook de calificación y objetivos comerciales.",
  "Conectamos tu CRM y entrenamos al agente IA con tu proceso de ventas.",
  "Activamos el sistema 24/7 en vivo para respuestas inmediatas y visitas agendadas automáticamente.",
  "Optimizamos la conversión y generamos insights accionables de tu web.",
  "Realizamos una mejora continua basada en datos con optimización de pauta constante.",
  "Finalmente, nos convertimos en tu socio estratégico de crecimiento para escalar tu inmobiliaria.",
];

function useNativeTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const spanishVoices = allVoices.filter(v => v.lang.startsWith('es'));
      
      const sortedVoices = spanishVoices.sort((a, b) => {
        const isNatural = (v: SpeechSynthesisVoice) => 
          v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Natural');
        const isLatAm = (v: SpeechSynthesisVoice) => v.lang !== 'es-ES';
        const scoreA = (isNatural(a) ? 2 : 0) + (isLatAm(a) ? 1 : 0);
        const scoreB = (isNatural(b) ? 2 : 0) + (isLatAm(b) ? 1 : 0);
        return scoreB - scoreA;
      });

      setVoices(sortedVoices);
      if (sortedVoices.length > 0) setSelectedVoice(sortedVoices[0]);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text: string, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.onend = () => onEnd?.();
    window.speechSynthesis.speak(utterance);
  };

  return { speak, stop: () => window.speechSynthesis.cancel(), voices, selectedVoice, setSelectedVoice };
}

export default function PlanEscalamiento() {
  const tts = useNativeTTS();
  const [activeStep, setActiveStep] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const runStep = (idx: number) => {
    if (idx >= roadmapData.length) {
      setPlaying(false);
      setActiveStep(-1);
      return;
    }
    setActiveStep(idx);
    tts.speak(narrationTexts[idx], () => setTimeout(() => runStep(idx + 1), 1200));
  };

  const togglePresentation = () => {
    if (playing) {
      setPlaying(false);
      tts.stop();
    } else {
      setPlaying(true);
      runStep(0);
    }
  };

  return (
    <section className="py-20 bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-accent mb-12 text-center">
          Plan de Escalamiento
        </h2>
        
        <div className="flex justify-center mb-12">
          <button 
            onClick={togglePresentation}
            className="flex items-center gap-2 px-8 py-4 bg-brand-accent text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {playing ? "Detener Narración" : "Iniciar Presentación"}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roadmapData.map((step, idx) => (
            <motion.div 
              key={idx}
              animate={{ opacity: activeStep === idx ? 1 : 0.8, scale: activeStep === idx ? 1.05 : 1 }}
              className="p-8 bg-white/15 rounded-3xl border border-white/40 shadow-2xl shadow-brand-accent/40 ring-1 ring-white/20"
            >
              <div className="text-4xl mb-4">{step.emoji}</div>
              <div className="text-brand-accent font-bold mb-2 drop-shadow-md">{step.phase} - {step.timing}</div>
              <h3 className="text-2xl font-black mb-4 text-white drop-shadow-lg">{step.title}</h3>
              <p className="text-white drop-shadow-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
