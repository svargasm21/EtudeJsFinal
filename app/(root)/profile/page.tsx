'use client';

import React from 'react';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div >
        logueate papu
      </div>
    );
  }

  // Calcular estadísticas del usuario
  const cursosCompletados = user.inscripciones?.filter(i => 
    i.progreso && parseFloat(i.progreso.porcentajeAvance.toString()) >= 100
  ).length || 0;
  
  const promedioGeneral = user.inscripciones && user.inscripciones.length > 0 
    ? Math.round(user.inscripciones.reduce((acc, i) => 
        acc + (i.progreso ? parseFloat(i.progreso.porcentajeAvance.toString()) : 0), 0
      ) / user.inscripciones.length)
    : 0;

  const fechaRegistro = new Date(user.fechaRegistro).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long'
  });

  const diasDesdeLaInscripcion = Math.floor(
    (new Date().getTime() - new Date(user.fechaRegistro).getTime()) / (1000 * 3600 * 24)
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header con gradiente */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-yellow-400/10 to-transparent rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4">
            Mi Perfil
          </h1>
          <p className="text-gray-300 text-lg">Gestiona tu información y progreso musical</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Información del Usuario */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 rounded-full flex items-center justify-center border border-yellow-400/40">
                  <img
                    src="/icons/user-fill.svg"
                    alt="Usuario"
                    className="w-14 h-14 brightness-0 invert"
                  />
                </div>
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-lg -z-10"></div>
              </div>
              
              <h2 className="text-2xl font-bold text-yellow-200 mb-2">{user.nombre}</h2>
              <p className="text-gray-400 mb-2">{user.correo}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <span>Miembro desde {fechaRegistro}</span>
                <span>•</span>
                <span>{cursosCompletados > 0 ? 'Nivel Intermedio' : 'Principiante'}</span>
              </div>
              
              <Button 
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium shadow-lg hover:shadow-red-400/20 transition-all duration-300"
                onClick={logout}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Estadísticas y Progreso */}
        <div className="lg:col-span-2 space-y-8">
          {/* Estadísticas Mejoradas */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-yellow-200 mb-6 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Estadísticas Generales
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/20 rounded-xl p-4 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-300 mb-1">{cursosCompletados}</div>
                  <p className="text-gray-400 text-sm">Cursos Completados</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-600/20 to-green-500/20 rounded-xl p-4 border border-green-400/20 group-hover:border-green-400/40 transition-all duration-300">
                  <div className="text-3xl font-bold text-green-300 mb-1">{user.inscripciones?.length || 0}</div>
                  <p className="text-gray-400 text-sm">Cursos Inscritos</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/20 rounded-xl p-4 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-300">
                  <div className="text-3xl font-bold text-purple-300 mb-1">{promedioGeneral}%</div>
                  <p className="text-gray-400 text-sm">Promedio General</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 rounded-xl p-4 border border-yellow-400/20 group-hover:border-yellow-400/40 transition-all duration-300">
                  <div className="text-3xl font-bold text-yellow-300 mb-1">{diasDesdeLaInscripcion}</div>
                  <p className="text-gray-400 text-sm">Días como Miembro</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progreso Actual */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-yellow-200 mb-6 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Progreso Actual
            </h3>
            <div className="space-y-6">
              {user.inscripciones && user.inscripciones.length > 0 ? (
                user.inscripciones.map((inscripcion, index) => {
                  const progreso = inscripcion.progreso ? parseFloat(inscripcion.progreso.porcentajeAvance.toString()) : 0;
                  const colorType = index % 3;
                  
                  const getColorClasses = (type: number) => {
                    switch (type) {
                      case 0:
                        return {
                          text: 'text-yellow-400',
                          bg: 'bg-gradient-to-r from-yellow-600 to-yellow-400',
                          shadow: 'shadow-yellow-400/30'
                        };
                      case 1:
                        return {
                          text: 'text-blue-400',
                          bg: 'bg-gradient-to-r from-blue-600 to-blue-400',
                          shadow: 'shadow-blue-400/30'
                        };
                      default:
                        return {
                          text: 'text-purple-400',
                          bg: 'bg-gradient-to-r from-purple-600 to-purple-400',
                          shadow: 'shadow-purple-400/30'
                        };
                    }
                  };
                  
                  const colors = getColorClasses(colorType);
                  
                  return (
                    <div key={inscripcion.id} className="group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-200 font-medium">{inscripcion.curso.titulo}</span>
                        <span className={`${colors.text} font-bold`}>{Math.round(progreso)}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <div className={`${colors.bg} h-3 rounded-full transition-all duration-1000 ease-out shadow-lg ${colors.shadow}`} 
                             style={{width: `${progreso}%`}}></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No tienes cursos inscritos aún</p>
                  <Button 
                    className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Explorar Cursos
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Logros Recientes */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300">
            <h3 className="text-2xl font-bold text-yellow-200 mb-6 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              Logros Recientes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-600/10 to-transparent rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 rounded-full flex items-center justify-center">
                  <img src="/icons/star.svg" alt="Logro" className="w-6 h-6 brightness-0 invert" />
                </div>
                <div>
                  <p className="text-gray-200 font-medium">Primera escala completada</p>
                  <p className="text-gray-500 text-sm">Hace 2 días</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-600/10 to-transparent rounded-xl border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full flex items-center justify-center">
                  <img src="/icons/verified.svg" alt="Logro" className="w-6 h-6 brightness-0 invert" />
                </div>
                <div>
                  <p className="text-gray-200 font-medium">10 días consecutivos</p>
                  <p className="text-gray-500 text-sm">Hace 1 día</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-600/10 to-transparent rounded-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400/30 to-blue-600/30 rounded-full flex items-center justify-center">
                  <img src="/icons/tick.svg" alt="Logro" className="w-6 h-6 brightness-0 invert" />
                </div>
                <div>
                  <p className="text-gray-200 font-medium">Primer curso completado</p>
                  <p className="text-gray-500 text-sm">Hace 1 semana</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-600/10 to-transparent rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400/30 to-purple-600/30 rounded-full flex items-center justify-center">
                  <img src="/icons/heart.svg" alt="Logro" className="w-6 h-6 brightness-0 invert" />
                </div>
                <div>
                  <p className="text-gray-200 font-medium">100 ejercicios completados</p>
                  <p className="text-gray-500 text-sm">Hace 3 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
