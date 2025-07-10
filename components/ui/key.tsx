import React from 'react';

interface KeyProps {
  note: string;
  pressed?: boolean;
  onPress?: () => void;
  onRelease?: () => void;
}

const Key = ({ note, pressed = false, onPress, onRelease }: KeyProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`h-[300px] w-[60px] border-2 border-black flex flex-col justify-end items-center pb-4 transition-colors ${
          pressed ? 'bg-gray-400' : 'bg-white'
        }`}
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchStart={onPress}
        onTouchEnd={onRelease}
      >
        <span className="text-black font-bold">{note}</span>
      </div>
    </div>
  );
};

export default Key;