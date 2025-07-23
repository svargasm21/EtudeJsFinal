"use client";
import React, { useState, useEffect } from 'react';
import Key from '@/components/ui/key';
import BlackKey from '@/components/ui/blackkey';
import notes from '../../constants/notes';
import Key_to_notes from '../../constants/KeyToNotes';
import _ from 'lodash';
import BookList from '@/components/ui/CourseList';
import { sampleBooks } from '@/app/constants';

const Piano = () => {
  const [pressed, setPressed] = useState<string[]>([]);

  // Función para detectar si una nota es negra (sostenido/bemol)
  const isBlackKey = (note: string) => {
    const baseNote = note.replace('1', ''); // Remover el '1' para la segunda octava
    return baseNote.includes('b') || baseNote.includes('#'); // Detectar bemoles y sostenidos
  };

  const handlePress = (note: string) =>
    setPressed((prev) => [...new Set([...prev, note])]);
  
  const handleRelease = (note: string) =>
    setPressed((prev) => prev.filter((n) => n !== note));

  const audioFiles = _.map(notes, (note) => {
    return (<audio
      key={note}
      id={note}
      src={`/audios/${note}.mp3`}
    />)
  });

  const playNote = (note: string) => {
    const audio = document.getElementById(note) as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error(`Error playing note ${note}:`, error);
      });
    }
  }
  

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as keyof typeof Key_to_notes;
      const note = Key_to_notes[key];
      if (note) {
        setPressed((prev) => [...new Set([...prev, note])]);
        playNote(note);
        console.log(`Key pressed: ${key}, Note: ${note}`);
      }
    };
  
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() as keyof typeof Key_to_notes;
      const note = Key_to_notes[key];
      if (note) {
        setPressed((prev) => prev.filter((n) => n !== note));
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <h2
        className="font-bebas-neue text-4xl text-light-100 text-center mb-6"
        style={{ color: '#e7dfcf', fontFamily: 'var(--bebas-neue)' }}
      >
        Etude Pianoforte - Dos Octavas
      </h2>
      
      <div className="flex justify-center overflow-x-auto">
        <div className="flex flex-row min-w-max relative">
          {notes.map((note) => (
            isBlackKey(note) ? (
              <BlackKey
                key={note}
                note={note}
                pressed={pressed.includes(note)}
                onPress={() => {
                  handlePress(note);
                  playNote(note);
                }}
                onRelease={() => handleRelease(note)}
              />
            ) : ( 
              <Key
                key={note}
                note={note}
                pressed={pressed.includes(note)}
                onPress={() => {
                  handlePress(note);
                  playNote(note);
                }}
                onRelease={() => handleRelease(note)}
              />
            )
          ))}
        </div>
      </div>
      <div className="hidden">
        {audioFiles}
      </div>

      {/* Guía de controles de teclado */}
      <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold text-yellow-300 mb-4 text-center">
          Controles de Teclado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Primera Octava (Grave)</h4>
            <div className="grid grid-cols-6 gap-2 text-sm">
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">A</kbd> → C</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">W</kbd> → C#</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">S</kbd> → D</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">E</kbd> → D#</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">D</kbd> → E</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">F</kbd> → F</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">T</kbd> → F#</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">G</kbd> → G</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">Y</kbd> → G#</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">H</kbd> → A</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">U</kbd> → A#</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">J</kbd> → B</div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Segunda Octava (Aguda)</h4>
            <div className="grid grid-cols-6 gap-2 text-sm">
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">K</kbd> → C1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">O</kbd> → C#1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">L</kbd> → D1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">P</kbd> → D#1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">;</kbd> → E1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">'</kbd> → F1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">]</kbd> → F#1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">↵</kbd> → G1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">1</kbd> → G#1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">2</kbd> → A1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">3</kbd> → A#1</div>
              <div className="text-gray-300"><kbd className="bg-gray-700 px-2 py-1 rounded">4</kbd> → B1</div>
            </div>
          </div>
        </div>
      </div>

      <BookList 

        title="Popular Courses"
        courses = {sampleBooks}
        containerClassName="mt-28"

    />
    </>
  );
};

export default Piano;