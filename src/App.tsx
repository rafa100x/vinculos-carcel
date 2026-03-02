/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Heart, 
  Users, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Clock,
  Award,
  Star,
  Quote,
  CreditCard,
  ShieldCheck,
  Eye,
  ShoppingBag
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const BonusCard = ({ number, title, description, image }: { number: number, title: string, description: string, image: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-crimson/50 transition-all flex flex-col">
    <div className="h-64 overflow-hidden relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 bg-crimson text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
        Bono #0{number}
      </div>
    </div>
    <div className="p-6 relative">
      <div className="absolute -top-10 -right-2 text-6xl font-display font-black text-white/5 group-hover:text-crimson/10 transition-colors">
        0{number}
      </div>
      <h3 className="text-xl mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 text-sm relative z-10 leading-relaxed">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, text, image }: { name: string, role: string, text: string, image: string }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
    <Quote className="text-crimson/20 absolute top-4 right-4" size={40} />
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-crimson text-crimson" />)}
    </div>
    <p className="text-gray-300 italic mb-6 leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-crimson/30">
        <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <div className="font-display font-bold text-sm uppercase tracking-wider">{name}</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">{role}</div>
      </div>
    </div>
  </div>
);

const PurchaseNotification = () => {
  const [visible, setVisible] = useState(false);
  const [purchase, setPurchase] = useState({ name: '', location: '', product: '', time: '' });

  const purchases = [
    { name: 'Fabian', location: 'Neuquén', product: 'Full Pack Emocional', time: '10 minutos' },
    { name: 'Carlos', location: 'Córdoba', product: 'Método D.E.S.A.T.A.R.', time: '5 minutos' },
    { name: 'Marcos', location: 'Buenos Aires', product: 'Vínculos sin Dolor', time: '2 minutos' },
    { name: 'Roberto', location: 'Salta', product: 'Protocolo de Estabilidad', time: '15 minutos' },
    { name: 'Jose', location: 'Mendoza', product: 'App Goodsana (Upsell)', time: '8 minutos' },
    { name: 'Luis', location: 'Rosario', product: 'Full Pack Emocional', time: '12 minutos' },
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      setPurchase(randomPurchase);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const interval = setInterval(showNotification, 15000);
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-6 left-6 z-50 bg-navy/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-xs"
        >
          <div className="bg-crimson p-2 rounded-lg">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white">
              <span className="font-bold">{purchase.name}</span> de {purchase.location}
            </p>
            <p className="text-[10px] text-gray-400">Compró <span className="text-crimson font-bold">{purchase.product}</span> hace {purchase.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LiveViewers = () => {
  const [viewers, setViewers] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-crimson font-bold text-xs uppercase tracking-widest animate-pulse">
      <Eye size={14} /> {viewers} personas viendo esta oferta ahora
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 16, minutes: 46, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="text-2xl md:text-3xl font-display font-black text-crimson flex gap-2">
      <span>{format(timeLeft.hours)}</span>
      <span>:</span>
      <span>{format(timeLeft.minutes)}</span>
      <span>:</span>
      <span>{format(timeLeft.seconds)}</span>
    </div>
  );
};

export default function App() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-crimson selection:text-white">
      <PurchaseNotification />
      
      {/* Sticky CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur border-t border-white/10 p-3 md:p-4 md:px-12 flex justify-between items-center shadow-2xl"
          >
            <div className="hidden md:block">
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Método D.E.S.A.T.A.R.</div>
              <div className="text-lg font-display font-black">RECUPERÁ TU SOBERANÍA</div>
            </div>
            <div className="w-full md:w-auto flex flex-col items-center gap-1">
              <a 
                href="https://goodsana.com/checkouts/cn/hWN9OLEZt2rgRPA8j3ffn8Rm/es-ar?_r=AQABh35obymE4wjHubkA7qDAKXQ1Wf6CywxTzOWacR-MCpY&cart_link_id=TrBsONxt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-crimson hover:bg-crimson/90 text-white font-display font-black text-xs md:text-base px-6 py-3 md:px-8 md:py-4 rounded-lg crimson-glow crimson-glow-hover transition-all flex items-center gap-2 group w-full md:w-auto justify-center"
              >
                COMPRAR AHORA - $18.990
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest font-bold">7 días de garantía de soberanía</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Bar - Urgency */}
      <div className="bg-crimson text-white text-center py-2 text-xs font-bold tracking-widest uppercase px-4">
        Atención: Oferta de lanzamiento disponible por tiempo limitado
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-display font-black tracking-tighter">
          GOOD<span className="text-crimson">SANA</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <a href="#metodo" className="hover:text-white transition-colors">El Método</a>
          <a href="#stack" className="hover:text-white transition-colors">Los Bonos</a>
          <a href="#social" className="hover:text-white transition-colors">Testimonios</a>
          <a href="#garantia" className="hover:text-white transition-colors">Garantía</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-6 md:pt-12 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div {...fadeIn} className="text-left order-2 lg:order-1">
            <span className="inline-block border border-crimson/30 text-crimson text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1 rounded-full mb-6 md:mb-8">
              Para Padres que se sienten rehenes
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl mb-6 md:mb-8 leading-[0.9] tracking-tighter">
              CORTÁ EL APEGO <br />
              <span className="text-crimson">SIN PERDER</span> <br />
              A TUS HIJOS
            </h1>
            
            {/* Mobile Image - Moved above button */}
            <div className="lg:hidden mb-8">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/METODO_CORE_EMOCIONAL_PAZ_HIJOS.jpg?v=1770753490" 
                  alt="Método Core Emocional" 
                  className="w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8 md:mb-12 leading-relaxed font-light">
              Recuperá tu soberanía personal y dignidad paternal. Dejá de ser "negociable" en una relación que te desprecia.
            </p>
            
            <div className="flex flex-col items-start gap-4">
              <div className="w-full md:w-auto flex flex-col items-center gap-2">
                <a 
                  href="https://goodsana.com/checkouts/cn/hWN9OLEZt2rgRPA8j3ffn8Rm/es-ar?_r=AQABh35obymE4wjHubkA7qDAKXQ1Wf6CywxTzOWacR-MCpY&cart_link_id=TrBsONxt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-crimson hover:bg-crimson/90 text-white font-display font-black text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 rounded-lg crimson-glow crimson-glow-hover transition-all flex items-center gap-3 group w-full md:w-auto text-center justify-center"
                >
                  QUIERO EL MÉTODO D.E.S.A.T.A.R.
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Acceso inmediato al contenido completo</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                  <Lock size={12} /> Pago seguro
                </p>
                <div className="flex gap-2 opacity-30 grayscale">
                  <CreditCard size={16} />
                  <ShieldCheck size={16} />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block order-1 lg:order-2"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/METODO_CORE_EMOCIONAL_PAZ_HIJOS.jpg?v=1770753490" 
                alt="Método Core Emocional" 
                className="w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-crimson/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-crimson/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* The Truth Bomb Section */}
      <section className="bg-white/5 border-y border-white/10 py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-6 md:mb-8">
            <AlertTriangle className="text-crimson" size={40} md:size={48} />
          </div>
          <h2 className="text-3xl md:text-4xl text-center mb-12">
            LA VERDAD QUE NADIE TE DICE: <br />
            <span className="text-crimson">"AGUANTAR NO ES AMAR, ES SOBREVIVIR"</span>
          </h2>
          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p>
              Sé por lo que estás pasando. Te quedás en silencio cuando te desprecian. Bajás la cabeza ante exigencias absurdas. Te volviste invisible en tu propia casa.
            </p>
            <p className="font-bold text-white border-l-4 border-crimson pl-6 italic">
              "Lo hago por los chicos", te decís cada noche.
            </p>
            <p>
              Pero la realidad es más oscura: el miedo a perder el vínculo con tus hijos te volvió un hombre <span className="text-white font-bold underline decoration-crimson underline-offset-4">negociable</span>. Y cuando un hombre es negociable, pierde su autoridad, su paz y, eventualmente, el respeto de sus propios hijos.
            </p>
            <p>
              Es hora de recuperar tu soberanía. No mañana. Hoy.
            </p>
          </div>
        </div>
      </section>

      {/* Real-Time Urgency Section */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-crimson/10 border-2 border-crimson rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 crimson-glow relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/5 blur-3xl rounded-full -z-10"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 flex-1 text-center md:text-left">
            <div className="relative">
              <div className="bg-crimson p-4 rounded-full animate-pulse shadow-lg shadow-crimson/20">
                <Users className="text-white" size={28} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-navy animate-ping"></div>
            </div>
            <div className="space-y-1">
              <LiveViewers />
              <h3 className="text-white font-display font-black text-xl md:text-3xl uppercase tracking-tighter leading-none">
                EL PRECIO ESTÁ A PUNTO DE SUBIR
              </h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Debido al alto volumen de compras en los últimos 15 minutos
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-3 md:gap-4 items-center lg:items-end">
            <div className="w-full max-w-xs bg-white/10 h-2 md:h-3 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "94%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="bg-crimson h-full crimson-glow"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <span className="text-crimson font-black text-[10px] uppercase tracking-widest">94% de cupos reservados</span>
              <div className="flex items-center gap-2 text-white font-bold text-xs bg-crimson px-4 py-2 md:px-6 md:py-3 rounded-xl animate-bounce shadow-lg shadow-crimson/30">
                <AlertTriangle size={14} />
                ¡ÚLTIMA OPORTUNIDAD!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="social" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">PADRES QUE RECUPERARON SU <span className="text-crimson">DIGNIDAD</span></h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm">Historias reales de soberanía recuperada</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TestimonialCard 
            name="Diego" 
            role="Padre de 2 hijos" 
            text="Pensé que aguantar los gritos era el precio por ver a mis hijos. Con el método entendí que mi silencio los estaba dañando más a ellos que a mí. Hoy tengo paz."
            image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_diego.jpg?v=1771112219"
          />
          <TestimonialCard 
            name="Nicolas" 
            role="Empresario" 
            text="El blindaje emocional me salvó. Pasé de ser un rehén en mi propia casa a un hombre con límites claros. La relación con mi ex mejoró porque ya no puede manipularme."
            image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_nicolas.jpg?v=1771112219"
          />
          <TestimonialCard 
            name="Martin" 
            role="Docente" 
            text="Lo más difícil fue aceptar que la familia que soñé no existía. El bono de 'La Herida Invisible' fue clave para mi proceso. Gracias por hablarle al hombre de frente."
            image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_martin.jpg?v=1771112220"
          />
          <TestimonialCard 
            name="Lucas" 
            role="Padre" 
            text="Recuperar mi autoridad paternal fue lo mejor que pude hacer por mis hijos. Ellos necesitaban un padre fuerte, no uno que aguantara desprecios."
            image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/testimonial_lucas.jpg?v=1771112219"
          />
        </div>

        {/* Chat Proofs */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/CHAT_01.png?v=1771105594",
            "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/CHAT_02.png?v=1771105594",
            "https://cdn.shopify.com/s/files/1/0752/5194/1565/files/CHAT_03.png?v=1771105594"
          ].map((chat, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden border border-white/10 shadow-xl"
            >
              <img src={chat} alt={`Chat Proof ${i+1}`} className="w-full" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Authority Section */}
      <section className="bg-white/5 py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/success_4_energy.jpg?v=1770561201" 
                  alt="Mentor Goodsana" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-crimson p-8 rounded-2xl crimson-glow">
                <div className="text-4xl font-display font-black">10+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Años de Experiencia</div>
              </div>
            </div>
            <div>
              <span className="text-crimson font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Tu Mentor</span>
              <h2 className="text-4xl mb-8">SOY EL QUE TE DICE LO QUE <span className="text-crimson">NADIE SE ATREVE</span></h2>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  He pasado la última década ayudando a hombres a navegar las aguas más oscuras de las dinámicas de pareja tóxicas. No soy un gurú de autoayuda; soy un estratega de soberanía personal.
                </p>
                <p>
                  Mi misión es simple: que ningún padre tenga que elegir entre su dignidad y sus hijos. He visto cómo el sistema y la cultura intentan castrar la autoridad paternal, y estoy aquí para darte las herramientas tácticas para que eso no te pase a vos.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="bg-white/10 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest text-white">Estratega Paternal</div>
                  <div className="bg-white/10 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest text-white">Experto en Dinámicas Tóxicas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Method Section */}
      <section id="metodo" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl mb-8">EL MÉTODO <span className="text-crimson">D.E.S.A.T.A.R.</span></h2>
            <p className="text-gray-400 mb-8 text-base md:text-lg">
              Un sistema táctico diseñado para hombres que necesitan cortar el cordón umbilical emocional con una pareja tóxica sin detonar su relación con sus hijos.
            </p>
            <ul className="space-y-4 md:space-y-6">
              {[
                { t: "Dignidad", d: "Restablecimiento de tus límites innegociables." },
                { t: "Estrategia", d: "Protocolos de comunicación para evitar la manipulación." },
                { t: "Soberanía", d: "Independencia emocional total de su validación." },
                { t: "Autoridad", d: "Recuperación de tu rol como pilar paternal." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="bg-crimson/10 text-crimson p-1 rounded h-fit">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="font-display font-bold text-white block uppercase text-xs md:text-sm tracking-wider">{item.t}</span>
                    <span className="text-gray-400 text-xs md:text-sm">{item.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square bg-gradient-to-br from-crimson/20 to-transparent rounded-2xl border border-white/10 flex items-center justify-center p-8 md:p-12 overflow-hidden">
              <Shield size={120} className="text-crimson/20 absolute md:size-[200px]" />
              <div className="relative z-10 text-center">
                <div className="text-4xl md:text-6xl font-display font-black mb-2 md:mb-4">D.E.S.A.T.A.R.</div>
                <div className="text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase text-gray-400">Protocolo de Soberanía</div>
              </div>
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-navy border border-white/10 p-4 md:p-6 rounded-xl shadow-2xl">
              <div className="text-2xl md:text-3xl font-display font-bold text-crimson">100%</div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500">Enfoque Paternal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-24 bg-navy border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Para quién SÍ */}
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>
              <h3 className="text-2xl md:text-3xl font-display font-black mb-8 flex items-center gap-4">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <CheckCircle2 className="text-green-500" size={24} />
                </div>
                ESTO ES PARA VOS SI...
              </h3>
              <ul className="space-y-6">
                {[
                  "Te sentís rehén emocional de tu ex pareja.",
                  "Tenés miedo de perder el vínculo con tus hijos si ponés límites.",
                  "Sentís que perdiste tu autoridad y dignidad como hombre.",
                  "Querés dejar de ser 'negociable' y recuperar tu paz mental.",
                  "Estás dispuesto a tomar acción radical por tu soberanía."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-300 text-sm md:text-base">
                    <div className="text-green-500 mt-1 shrink-0">•</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Para quién NO */}
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/5 blur-3xl rounded-full"></div>
              <h3 className="text-2xl md:text-3xl font-display font-black mb-8 flex items-center gap-4">
                <div className="bg-crimson/20 p-2 rounded-lg">
                  <AlertTriangle className="text-crimson" size={24} />
                </div>
                ESTO NO ES PARA VOS SI...
              </h3>
              <ul className="space-y-6">
                {[
                  "Buscás una solución mágica sin cambiar tu comportamiento.",
                  "Querés usar a tus hijos como herramientas de venganza.",
                  "No estás dispuesto a enfrentar la verdad de tu situación.",
                  "Preferís seguir aguantando desprecios por comodidad.",
                  "No valorás tu propia dignidad ni tu rol paternal."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-300 text-sm md:text-base">
                    <div className="text-crimson mt-1 shrink-0">•</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Stack (Bonuses) */}
      <section id="stack" className="bg-white/5 py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">EL STACK DE <span className="text-crimson">SOBERANÍA</span></h2>
            <p className="text-gray-400 uppercase tracking-widest text-sm">Todo lo que necesitás para el blindaje total</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BonusCard 
              number={1} 
              title="La Herida Invisible" 
              description="Duelo a la familia que no fue. Cómo soltar la fantasía del hogar perfecto para construir una realidad sólida."
              image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B1_Herida_Invisible.jpg?v=1770753039"
            />
            <BonusCard 
              number={2} 
              title="Superar la Traición" 
              description="Infidelidad y contacto diario. Cómo gestionar el dolor cuando tenés que verla todos los días por los chicos."
              image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B2_Traicion.jpg?v=1770753038"
            />
            <BonusCard 
              number={3} 
              title="Ex con Nueva Pareja" 
              description="Aceptación y límites. El protocolo táctico para cuando un tercero entra en la dinámica familiar."
              image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B3_Ex_con_Pareja.jpg?v=1770753039"
            />
            <BonusCard 
              number={4} 
              title="Padre en Guardia" 
              description="Blindaje emocional de los hijos. Cómo evitar que ellos sean usados como proyectiles en la guerra."
              image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B4_Padre_en_Guardia.jpg?v=1770753039"
            />
            <BonusCard 
              number={5} 
              title="Protocolo de Estabilidad" 
              description="Regulación emocional post-contacto. El método para volver a tu centro después de una interacción tóxica."
              image="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/B5_Protocolo_Estabilidad.jpg?v=1770753039"
            />
            <div className="bg-crimson p-4 md:p-6 rounded-xl flex flex-col justify-center items-center text-center group cursor-pointer hover:scale-[1.02] transition-transform min-h-[200px] md:min-h-[300px]">
              <Award size={32} className="mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl mb-1 md:text-xl">VALOR TOTAL: +$100.000</h3>
              <p className="text-white/80 text-xs md:text-sm font-bold mb-4 md:mb-6">INCLUIDO HOY GRATIS</p>
              <div className="text-[8px] md:text-xs uppercase tracking-widest opacity-50">Acceso Inmediato</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-yellow-100 relative overflow-hidden text-navy">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-crimson text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-crimson/20">
              🔥 PRECIO DE LANZAMIENTO
            </div>
          </div>
          
          {/* Prices */}
          <div className="mb-8">
            <div className="text-6xl md:text-8xl font-display font-black text-navy mb-2">$18.990 ARS</div>
            <div className="text-gray-400 line-through text-2xl md:text-3xl font-bold">$100.000 ARS</div>
          </div>

          {/* Timer Box */}
          <div className="bg-red-50 border border-red-200 rounded-3xl p-6 mb-10 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-crimson font-bold text-sm mb-4">
              <Clock size={18} />
              El precio sube cuando el contador llega a cero
            </div>
            <div className="flex justify-center">
              <CountdownTimer />
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-green-50/50 border border-green-100 rounded-3xl p-8 mb-10 text-left max-w-2xl mx-auto">
            <ul className="space-y-5">
              <li className="flex items-center gap-3 text-navy font-medium">
                <div className="bg-green-500 rounded-md p-0.5"><CheckCircle2 size={16} className="text-white" /></div>
                Guía completa VÍNCULO + ejercicios prácticos
              </li>
              <li className="flex items-center gap-3 text-navy font-medium">
                <span className="text-xl">🎁</span>
                5 Bonos exclusivos (valor +$100.000)
              </li>
              <li className="flex items-center gap-3 text-navy font-medium">
                <span className="text-xl">📩</span>
                Acceso inmediato por mail
              </li>
              <li className="flex items-center gap-3 text-navy font-medium">
                <span className="text-xl">🛡️</span>
                Garantía total de 7 días
              </li>
              <li className="flex items-center gap-3 text-navy font-medium">
                <span className="text-xl">🔒</span>
                Pago 100% seguro con tarjeta o MercadoPago
              </li>
            </ul>
          </div>

          {/* Button */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <a 
              href="https://goodsana.com/checkouts/cn/hWN9OLEZt2rgRPA8j3ffn8Rm/es-ar?_r=AQABh35obymE4wjHubkA7qDAKXQ1Wf6CywxTzOWacR-MCpY&cart_link_id=TrBsONxt"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-crimson hover:bg-crimson/90 text-white font-display font-black text-xl md:text-2xl px-10 py-6 md:px-16 md:py-8 rounded-full shadow-[0_10px_30px_rgba(224,30,55,0.3)] transition-all w-full max-w-xl block text-center group"
            >
              QUIERO SANAR HOY →
            </a>
            <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
              👆 Más de 1.800 padres ya accedieron a la guía
            </p>
          </div>
          
          {/* Trust Section */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-[32px] p-6 md:p-8 text-left">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                <ShieldCheck className="text-crimson" size={32} />
              </div>
              <div>
                <h4 className="text-green-700 font-bold text-lg leading-tight">MercadoLíder Platinum</h4>
                <p className="text-gray-500 text-sm">¡Uno de los mejores del sitio!</p>
              </div>
            </div>
            
            <div className="relative h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-yellow-200 to-green-500 w-full"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-black text-navy text-lg">1.894</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Ventas</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 rounded-full p-1 mb-1">
                  <div className="bg-white rounded-full p-0.5">
                    <ChevronDown size={12} className="text-gray-400 rotate-180" />
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Atención</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-500 rounded-md p-0.5 mb-1">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Entrega</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="garantia" className="py-24 max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <img 
            src="https://cdn.shopify.com/s/files/1/0752/5194/1565/files/Captura_de_pantalla_2026-02-10_a_la_s_07.35.08.png?v=1770719727" 
            alt="Sello de Seguridad" 
            className="h-32 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-3xl mb-6">GARANTÍA DE SOBERANÍA</h2>
        <p className="text-xl text-gray-400 leading-relaxed mb-8">
          Probá el método por 7 días. Si no sentís que estás recuperando el control de tu vida y tu dignidad, te devuelvo el 100% de tu inversión. Sin preguntas. De hombre a hombre.
        </p>
        <div className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em]">7 DÍAS DE RIESGO CERO</div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white/5 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl text-center mb-16">PREGUNTAS FRECUENTES</h2>
          <div className="space-y-6">
            {[
              { q: "¿Es seguro el pago?", a: "Absolutamente. Utilizamos encriptación de grado bancario y procesadores líderes como Mercado Pago y PayPal para garantizar que tus datos estén 100% protegidos." },
              { q: "¿Cómo recibo el material?", a: "Inmediatamente después del pago, recibirás un correo electrónico con tus credenciales de acceso a nuestra plataforma exclusiva para miembros." },
              { q: "¿Qué pasa si no me sirve?", a: "Tenés 7 días de garantía. Si sentís que el método no es para vos, nos mandás un mail y te devolvemos el dinero sin vueltas." },
              { q: "¿Necesito conocimientos previos?", a: "No. El método está diseñado paso a paso, con lenguaje claro y tácticas directas que podés aplicar desde el primer minuto." },
              { q: "¿Puedo acceder desde mi celular?", a: "Sí, nuestra plataforma es 100% responsiva. Podés ver los videos y descargar el material desde cualquier dispositivo con internet." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h3 className="text-lg mb-3 flex justify-between items-center cursor-pointer group">
                  {faq.q}
                  <ChevronDown size={18} className="text-gray-500 group-hover:text-crimson transition-colors" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-5xl mb-8">EL TIEMPO DE AGUANTAR <br /> <span className="text-crimson">SE TERMINÓ</span></h2>
        <div className="flex flex-col items-center gap-3">
          <a 
            href="https://goodsana.com/checkouts/cn/hWN9OLEZt2rgRPA8j3ffn8Rm/es-ar?_r=AQABh35obymE4wjHubkA7qDAKXQ1Wf6CywxTzOWacR-MCpY&cart_link_id=TrBsONxt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-crimson hover:bg-crimson/90 text-white font-display font-black text-lg md:text-xl px-10 py-5 md:px-12 md:py-6 rounded-lg crimson-glow crimson-glow-hover transition-all inline-flex items-center gap-3 group"
          >
            EMPEZAR MI TRANSFORMACIÓN
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">Únete a más de 500 padres que ya recuperaron su paz</p>
        </div>
        <p className="mt-12 text-gray-500 text-[10px]">GOODSANA © {new Date().getFullYear()} - Todos los derechos reservados</p>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-[10px] text-gray-600 uppercase tracking-widest px-6">
        <div className="flex justify-center gap-8 mb-4">
          <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Contacto</a>
        </div>
        <p>Este sitio no es parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera.</p>
      </footer>
    </div>
  );
}
