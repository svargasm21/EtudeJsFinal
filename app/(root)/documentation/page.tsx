import React from 'react';

const Documentation = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header elegante */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-400/10 to-transparent rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-blue-400/20 rounded-3xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-2xl mb-6 border border-blue-400/40">
            <img src="/icons/search-fill.svg" alt="Documentación" className="w-10 h-10 brightness-0 invert" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-6">
            Documentación
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Todo lo que necesitas saber para aprovechar al máximo EtudeJS y tu viaje musical
          </p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Guía de Inicio */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-green-400/20 rounded-2xl p-8 hover:border-green-400/40 transition-all duration-300 group">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-xl flex items-center justify-center border border-green-400/40 group-hover:scale-110 transition-transform duration-300">
              <span className="text-green-300 font-bold text-lg">🚀</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-200 mb-2">Guía de Inicio</h2>
              <p className="text-gray-400">Primeros pasos en tu journey musical</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Bienvenido a EtudeJS, tu plataforma de aprendizaje musical interactiva diseñada para músicos de todos los niveles.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center border border-green-400/30 flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-gray-200 font-medium mb-1">Explora nuestros cursos interactivos</h4>
                <p className="text-gray-500 text-sm">Desde teoría básica hasta composición avanzada</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center border border-green-400/30 flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-gray-200 font-medium mb-1">Practica con el piano virtual</h4>
                <p className="text-gray-500 text-sm">Herramientas interactivas para mejorar tu técnica</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center border border-green-400/30 flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-gray-200 font-medium mb-1">Rastrea tu progreso</h4>
                <p className="text-gray-500 text-sm">Estadísticas detalladas y logros desbloqueables</p>
              </div>
            </div>
          </div>
        </div>

        {/* Piano Virtual */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300 group">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 rounded-xl flex items-center justify-center border border-yellow-400/40 group-hover:scale-110 transition-transform duration-300">
              <span className="text-yellow-300 font-bold text-lg">🎹</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-yellow-200 mb-2">Piano Virtual</h2>
              <p className="text-gray-400">Tu instrumento digital personalizado</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Domina nuestro piano virtual interactivo con controles intuitivos y retroalimentación en tiempo real.
          </p>
          
          <div className="bg-gradient-to-r from-yellow-600/10 to-transparent rounded-xl p-4 border border-yellow-400/20 mb-6">
            <h4 className="text-yellow-200 font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              Controles de Teclado
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300 font-medium mb-2">Teclas Blancas:</p>
                <div className="flex flex-wrap gap-1">
                  {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                    <span key={key} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded border border-gray-600/30 text-xs font-mono">
                      {key}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-gray-300 font-medium mb-2">Teclas Negras:</p>
                <div className="flex flex-wrap gap-1">
                  {['W', 'E', 'T', 'Y', 'U', 'O', 'P'].map((key) => (
                    <span key={key} className="px-2 py-1 bg-gray-800/80 text-gray-300 rounded border border-gray-500/30 text-xs font-mono">
                      {key}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400">💡</span>
            </div>
            <p>Tip: Mantén presionadas varias teclas para crear acordes</p>
          </div>
        </div>

        {/* Características */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400/30 to-purple-600/30 rounded-2xl mb-4 border border-purple-400/40">
              <span className="text-purple-300 font-bold text-2xl">✨</span>
            </div>
            <h2 className="text-3xl font-bold text-purple-200 mb-3">Características Principales</h2>
            <p className="text-gray-400 text-lg">Descubre todo lo que EtudeJS tiene para ofrecer</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/10 rounded-xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 group">
              <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-blue-400">🔊</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-200 mb-2">Audio Interactivo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Escucha las notas mientras tocas con calidad de audio profesional y respuesta instantánea
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600/10 to-green-500/10 rounded-xl p-6 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 group">
              <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-green-400">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-green-200 mb-2">Progreso Visual</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Visualiza tu mejora con gráficos detallados y métricas de rendimiento en tiempo real
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-500/10 rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 group">
              <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-yellow-400">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-yellow-200 mb-2">Aprendizaje Adaptativo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Contenido personalizado que se adapta a tu ritmo y estilo de aprendizaje único
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/10 to-purple-500/10 rounded-xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 group">
              <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-purple-400">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">Sistema de Logros</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Desbloquea insignias y celebra hitos mientras avanzas en tu journey musical
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-600/10 to-red-500/10 rounded-xl p-6 border border-red-400/20 hover:border-red-400/40 transition-all duration-300 group">
              <div className="w-10 h-10 bg-red-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-red-400">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-red-200 mb-2">Práctica Intensiva</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sesiones de práctica enfocadas con ejercicios específicos para cada nivel
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-600/10 to-cyan-500/10 rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group">
              <div className="w-10 h-10 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-cyan-400">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-cyan-200 mb-2">Comunidad</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Conecta con otros músicos, comparte tu progreso y aprende en comunidad
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-yellow-600/20 via-yellow-400/10 to-transparent rounded-2xl p-8 border border-yellow-400/20 text-center">
        <h3 className="text-2xl font-bold text-yellow-200 mb-4">¿Listo para comenzar?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Inicia tu journey musical hoy mismo y descubre todo tu potencial con nuestras herramientas interactivas
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
            Empezar Ahora
          </button>
          <button className="px-8 py-3 border border-yellow-400/40 text-yellow-200 hover:bg-yellow-400/10 rounded-xl transition-all duration-300">
            Ver Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
