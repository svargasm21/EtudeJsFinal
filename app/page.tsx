import Link from "next/link";
import { Button } from "../components/ui/button";
import { NavButtons } from "../components/ui/NavButtons";
import { Music, Piano, Users, Star, BookOpen, Headphones, Play, Award, TrendingUp } from "lucide-react";
import { isAuthenticated } from "../lib/auth-utils";
import { redirect } from "next/navigation";

const LandingPage = async () => {
  // Verificar si el usuario ya está autenticado
  const userIsAuthenticated = await isAuthenticated();
  
  // Si ya está autenticado, redirigir al dashboard
  if (userIsAuthenticated) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: <Piano className="w-8 h-8" />,
      title: "Piano Virtual Interactivo",
      description: "Practica con nuestro piano digital avanzado con sonidos realistas y respuesta táctil perfecta.",
      color: "yellow"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Cursos Estructurados",
      description: "Desde principiante hasta avanzado, con lecciones progresivas adaptadas a tu ritmo de aprendizaje.",
      color: "blue"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidad Global",
      description: "Únete a miles de estudiantes alrededor del mundo y comparte tu progreso musical.",
      color: "green"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificaciones",
      description: "Obtén certificados oficiales al completar cursos y demuestra tu nivel musical.",
      color: "purple"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progreso Personalizado",
      description: "Sistema de seguimiento inteligente que adapta las lecciones a tu velocidad de aprendizaje.",
      color: "cyan"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Audio de Calidad Studio",
      description: "Experimenta cada nota con la máxima calidad de audio para una experiencia inmersiva.",
      color: "orange"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Estudiante Principiante",
      text: "En solo 3 meses logré tocar mis primeras canciones. La plataforma es increíblemente intuitiva.",
      rating: 5,
      image: "�‍🎓"
    },
    {
      name: "Carlos Ruiz",
      role: "Músico Intermedio", 
      text: "Los cursos avanzados me ayudaron a perfeccionar técnicas que llevaba años intentando dominar.",
      rating: 5,
      image: "�‍🎼"
    },
    {
      name: "Ana Martín",
      role: "Profesora de Música",
      text: "Uso EtudeJS para complementar mis clases presenciales. Mis alumnos han mejorado notablemente.",
      rating: 5,
      image: "�‍🏫"
    }
  ];

  const stats = [
    { number: "10K+", label: "Estudiantes Activos", icon: <Users className="w-6 h-6" /> },
    { number: "200+", label: "Lecciones Disponibles", icon: <BookOpen className="w-6 h-6" /> },
    { number: "98%", label: "Satisfacción", icon: <Star className="w-6 h-6" /> },
    { number: "50+", label: "Países", icon: <Award className="w-6 h-6" /> }
  ];

  return (
    // Landing page con su propio diseño independiente
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation Header independiente */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center backdrop-blur-lg border border-yellow-400/30">
              <span className="text-yellow-400 font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              EtudeJS
            </span>
          </div>
          
          <NavButtons />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                Domina el
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Piano Digital
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              La plataforma más avanzada para aprender piano online. 
              <br />
              <span className="text-yellow-300">Desde principiante hasta profesional</span>, 
              a tu propio ritmo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-scaleIn" style={{ animationDelay: '200ms' }}>
            <Link href="/dashboard">
              <Button 
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Empezar Ahora Gratis
              </Button>
            </Link>
            <Link href="/documentation">
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg rounded-2xl backdrop-blur-sm"
              >
                <Music className="w-5 h-5 mr-2" />
                Ver Características
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2 text-yellow-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Por qué elegir 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                {" "}EtudeJS?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Una experiencia de aprendizaje completa con tecnología de vanguardia 
              y metodología pedagógica comprobada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="stats-card p-8 rounded-3xl group cursor-default animate-fadeInUp hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                  feature.color === 'yellow' ? 'bg-yellow-400/20 text-yellow-300' :
                  feature.color === 'blue' ? 'bg-blue-400/20 text-blue-300' :
                  feature.color === 'green' ? 'bg-green-400/20 text-green-300' :
                  feature.color === 'purple' ? 'bg-purple-400/20 text-purple-300' :
                  feature.color === 'cyan' ? 'bg-cyan-400/20 text-cyan-300' :
                  'bg-orange-400/20 text-orange-300'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lo que dicen nuestros
              <span className="bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
                {" "}estudiantes
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Miles de personas han transformado su vida musical con EtudeJS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="stats-card p-8 rounded-3xl animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="stats-card p-12 rounded-3xl relative overflow-hidden animate-fadeInUp">
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 opacity-50" />
            <div className="absolute top-6 right-6 text-4xl animate-float">🎵</div>
            <div className="absolute bottom-6 left-6 text-4xl animate-float" style={{ animationDelay: '2s' }}>�</div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para comenzar tu
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  {" "}viaje musical?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Únete a miles de estudiantes que ya están dominando el piano. 
                <br />
                <strong className="text-yellow-300">¡Primer mes completamente gratis!</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/dashboard">
                  <Button 
                    size="lg"
                    className="px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 glow-pulse"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Comenzar Gratis
                  </Button>
                </Link>
                <Link href="/documentation">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-10 py-5 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-xl rounded-2xl backdrop-blur-sm"
                  >
                    Ver Documentación
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center backdrop-blur-lg border border-yellow-400/30">
              <span className="text-yellow-400 font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              EtudeJS
            </span>
          </div>
          
          <div className="flex justify-center gap-6 mb-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-yellow-300 transition-colors">
              Dashboard
            </Link>
            <Link href="/login" className="text-gray-400 hover:text-yellow-300 transition-colors">
              Iniciar Sesión
            </Link>
            <Link href="#features" className="text-gray-400 hover:text-yellow-300 transition-colors">
              Características
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;