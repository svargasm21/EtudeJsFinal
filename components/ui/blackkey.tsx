import React from 'react';

interface KeyProps {
  note: string;
  pressed?: boolean;
  onPress?: () => void;
  onRelease?: () => void;
}

const BlackKey = ({ note, pressed = false, onPress, onRelease }: KeyProps) => {
  // Extraer solo la letra sin el número
  const displayNote = note.replace('1', '');
  
  return (
    <div className="flex items-center justify-center h-full relative z-10">
      <div
        className={`absolute -ml-[17px] -mr-[17px] h-[180px] w-[30px] z-20 flex flex-col justify-end items-center pb-2 transition-colors top-0 ${
          pressed ? 'bg-gray-600' : 'bg-black'
        }`}
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchStart={onPress}
        onTouchEnd={onRelease}
      >
        <span className="text-white font-bold text-xs">{displayNote}</span>
      </div>
    </div>
  );
};

export default BlackKey;