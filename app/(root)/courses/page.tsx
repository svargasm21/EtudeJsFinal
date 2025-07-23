import React from 'react';
import BookList from '../../../components/ui/CourseList';
import { sampleBooks } from '../../constants';
import { Button } from '../../../components/ui/button';

const Courses = () => {
  const inProgressCourses = sampleBooks.slice(0, 2);
  const availableCourses = sampleBooks.slice(2);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-yellow-400/10 to-transparent rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-6">
                Mis Cursos
              </h1>
              <p className="text-gray-300 text-xl leading-relaxed mb-8">
                Continúa tu aprendizaje musical con nuestros cursos interactivos diseñados para llevarte al siguiente nivel
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold px-8 py-3 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                  Explorar Nuevo Curso
                </Button>
                <Button variant="outline" className="border-yellow-400/40 text-yellow-200 hover:bg-yellow-400/10 px-8 py-3">
                  Ver Progreso
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 rounded-full blur-xl absolute -inset-4"></div>
                <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-yellow-400/30 flex items-center justify-center relative">
                  <img src="/icons/book.svg" alt="Courses" className="w-16 h-16 brightness-0 invert" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/20 backdrop-blur-sm border border-blue-400/20 rounded-xl p-6 text-center hover:border-blue-400/40 transition-all duration-300 group">
          <div className="text-3xl font-bold text-blue-300 mb-2 group-hover:scale-110 transition-transform duration-300">3</div>
          <p className="text-gray-400">Completados</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-green-500/20 backdrop-blur-sm border border-green-400/20 rounded-xl p-6 text-center hover:border-green-400/40 transition-all duration-300 group">
          <div className="text-3xl font-bold text-green-300 mb-2 group-hover:scale-110 transition-transform duration-300">2</div>
          <p className="text-gray-400">En Progreso</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-6 text-center hover:border-yellow-400/40 transition-all duration-300 group">
          <div className="text-3xl font-bold text-yellow-300 mb-2 group-hover:scale-110 transition-transform duration-300">85%</div>
          <p className="text-gray-400">Promedio</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/20 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6 text-center hover:border-purple-400/40 transition-all duration-300 group">
          <div className="text-3xl font-bold text-purple-300 mb-2 group-hover:scale-110 transition-transform duration-300">15h</div>
          <p className="text-gray-400">Tiempo</p>
        </div>
      </div>

      {/* Cursos en Progreso */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-yellow-200 mb-2 flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></span>
              Continuar Aprendiendo
            </h2>
            <p className="text-gray-400">Cursos que tienes en progreso</p>
          </div>
          <Button variant="outline" className="border-yellow-400/40 text-yellow-200 hover:bg-yellow-400/10">
            Ver Todos
          </Button>
        </div>
        
        {inProgressCourses.length > 0 ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-green-400/20 rounded-2xl p-6">
              <BookList 
                title=""
                courses={inProgressCourses}
                containerClassName=""
              />
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-12 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto border border-gray-500/20">
                <img 
                  src="/images/no-books.png" 
                  alt="No courses" 
                  className="w-12 h-12 opacity-50"
                />
              </div>
              <div className="absolute -inset-4 bg-gray-600/20 rounded-full blur-lg -z-10"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-3">No tienes cursos en progreso</h3>
            <p className="text-gray-500 mb-6">¡Comienza tu viaje musical explorando nuestros cursos disponibles!</p>
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
              Explorar Cursos
            </Button>
          </div>
        )}
      </section>

      {/* Cursos Disponibles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-yellow-200 mb-2 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-4"></span>
              Explora Nuevos Cursos
            </h2>
            <p className="text-gray-400">Amplía tus conocimientos musicales</p>
          </div>
          <Button variant="outline" className="border-blue-400/40 text-blue-200 hover:bg-blue-400/10">
            Ver Catálogo Completo
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6">
            <BookList 
              title=""
              courses={availableCourses}
              containerClassName=""
            />
          </div>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-200 mb-4">🎯 Recomendado para ti</h3>
          <p className="text-gray-300 mb-6">
            Basado en tu progreso, te recomendamos continuar con cursos de teoría musical avanzada
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-full border border-purple-400/30 text-sm">
              Armonía Musical
            </span>
            <span className="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-full border border-purple-400/30 text-sm">
              Composición
            </span>
            <span className="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-full border border-purple-400/30 text-sm">
              Análisis Musical
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
