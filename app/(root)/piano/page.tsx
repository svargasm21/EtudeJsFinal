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
        className="font-bebas-neue text-4xl text-light-100 text-center"
        style={{ color: '#e7dfcf', fontFamily: 'var(--bebas-neue)' }}
      >
        Etude Pianoforte
      </h2>
      
      <div className="flex flex-row justify-center">
        {notes.map((note) =>
          note.length > 1 ? (
            <BlackKey
              key={note}
              note={note}
              pressed={pressed.includes(note)}
              onPress={() => handlePress(note)}
              onRelease={() => handleRelease(note)}
            />
          ) : ( 
            <Key
              key={note}
              note={note}
              pressed={pressed.includes(note)}
              onPress={() => handlePress(note)}
              onRelease={() => handleRelease(note)}
            />
          )
        )}
      </div>
      <div className="hidden">
        {audioFiles}
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