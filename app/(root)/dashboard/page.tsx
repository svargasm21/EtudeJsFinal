import Link from "next/link";
import { Button } from "../../../components/ui/button";
import BookList from "../../../components/ui/CourseList";
import DashboardStats from "../../../components/ui/DashboardStats";
import QuickActions from "../../../components/ui/QuickActions";
import { sampleBooks } from "../../constants";

const DashboardPage = () => {
  // Datos simulados del dashboard
  const userName = "Alex"; // En producción vendría del auth
  const currentTime = new Date().getHours();
  
  const getGreeting = () => {
    if (currentTime < 12) return "Buenos días";
    if (currentTime < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const dashboardStats = [
    {
      title: "Cursos Completados",
      value: "12",
      change: "+3 este mes",
      color: "green" as const,
      icon: "✅",
    },
    {
      title: "Horas de Práctica",
      value: "47h",
      change: "+12h esta semana",
      color: "blue" as const,
      icon: "⏱️",
    },
    {
      title: "Nivel Actual",
      value: "Intermedio",
      change: "Próximo: Avanzado",
      color: "purple" as const,
      icon: "🎯",
    },
    {
      title: "Racha Diaria",
      value: "15 días",
      change: "¡Nuevo récord!",
      color: "yellow" as const,
      icon: "🔥",
    },
  ];

  const quickActions = [
    {
      title: "Continuar Piano",
      description: "Retomar práctica desde donde lo dejaste",
      href: "/piano",
      color: "yellow" as const,
      icon: "🎹",
    },
    {
      title: "Explorar Cursos",
      description: "Descubre nuevos cursos disponibles",
      href: "/courses",
      color: "blue" as const,
      icon: "📚",
    },
    {
      title: "Ver Progreso",
      description: "Revisa tus estadísticas detalladas",
      href: "/profile",
      color: "green" as const,
      icon: "📊",
    },
    {
      title: "Documentación",
      description: "Guías y tutoriales completos",
      href: "/documentation",
      color: "purple" as const,
      icon: "📖",
    },
  ];

  const recentActivity = [
    { action: "Completaste", course: "Acordes Básicos", time: "hace 2 horas", color: "green" },
    { action: "Iniciaste", course: "Escalas Avanzadas", time: "ayer", color: "blue" },
    { action: "Desbloqueaste", course: "Ritmo y Compás", time: "hace 3 días", color: "yellow" },
  ];

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8 pb-8 dashboard-grid">
      {/* Header de Bienvenida Premium */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-blue-500/10 to-purple-500/10 opacity-80" />
        
        {/* Elementos decorativos flotantes */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-purple-400/10 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="animate-fadeInUp">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span>📅</span>
                  <span className="capitalize">{currentDate}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
                  {getGreeting()} 👋
                </h1>
                <p className="text-xl text-gray-300">
                  Listo para continuar tu viaje musical 🎵
                </p>
              </div>
              
              {/* Quick Stats Row Mejorada */}
              <div className="flex flex-wrap gap-4 mt-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <div className="px-4 py-2 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-200 hover:bg-yellow-400/30 transition-all duration-300">
                  🎯 Nivel: Intermedio
                </div>
                <div className="px-4 py-2 rounded-full bg-green-400/20 border border-green-400/30 text-green-200 hover:bg-green-400/30 transition-all duration-300">
                  🔥 15 días seguidos
                </div>
                <div className="px-4 py-2 rounded-full bg-blue-400/20 border border-blue-400/30 text-blue-200 hover:bg-blue-400/30 transition-all duration-300">
                  ⭐ 12 cursos completados
                </div>
              </div>
            </div>
            
            <div className="animate-scaleIn space-y-4">
              <Link href="/piano">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 glow-pulse"
                >
                  🎹 Continuar Piano
                </Button>
              </Link>
              <div className="text-center text-sm text-gray-400">
                Última práctica: hace 3 horas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats con componente reutilizable */}
      <DashboardStats stats={dashboardStats} />

      {/* Quick Actions con componente reutilizable */}
      <QuickActions actions={quickActions} />

      {/* Recent Activity & Popular Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Mejorada */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 animate-fadeInUp">
            📈 Actividad Reciente
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div 
                key={index}
                className="stats-card p-4 animate-fadeInUp group cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.color === 'green' ? 'bg-green-400' :
                    activity.color === 'blue' ? 'bg-blue-400' :
                    'bg-yellow-400'
                  } animate-float`} 
                  style={{ animationDelay: `${index * 300}ms` }} />
                  <div className="flex-1">
                    <p className="text-white text-sm group-hover:text-yellow-200 transition-colors">
                      <span className="text-yellow-300 font-medium">{activity.action}</span> {activity.course}
                    </p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Ver todas las actividades */}
            <Link href="/profile">
              <div className="stats-card p-3 group cursor-pointer text-center hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-transparent transition-all duration-300">
                <span className="text-gray-400 group-hover:text-yellow-300 text-sm transition-colors">
                  Ver todas las actividades →
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Popular Courses */}
        <div className="lg:col-span-2">
          <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <BookList 
              title="🔥 Cursos Populares"
              courses={sampleBooks}
              containerClassName=""
            />
          </div>
        </div>
      </div>

      {/* Motivational Section Mejorada */}
      <div className="relative text-center p-8 rounded-3xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '400ms' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-purple-500/20 to-blue-500/20 opacity-30" />
        <div className="absolute inset-0 backdrop-blur-lg border border-white/10 rounded-3xl" />
        
        {/* Elementos decorativos */}
        <div className="absolute top-6 left-6 text-2xl animate-float">🎵</div>
        <div className="absolute top-6 right-6 text-2xl animate-float" style={{ animationDelay: '1s' }}>🎶</div>
        <div className="absolute bottom-6 left-1/4 text-xl animate-float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-6 right-1/4 text-xl animate-float" style={{ animationDelay: '0.5s' }}>🌟</div>
        
        <div className="relative z-10 space-y-4">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            💫 "La música es el lenguaje universal del alma"
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Continúa practicando y domina el arte del piano paso a paso. 
            <br />
            Cada día es una oportunidad para mejorar tu técnica y expresión musical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Link href="/courses">
              <Button 
                variant="outline" 
                className="border-purple-400/50 text-purple-300 hover:bg-purple-400/20 hover:text-white transition-all duration-300"
              >
                Explorar más cursos
              </Button>
            </Link>
            <Link href="/piano">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300">
                Practicar ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
