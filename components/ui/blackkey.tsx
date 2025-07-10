import React from 'react';

interface KeyProps {
  note: string;
  pressed?: boolean;
  onPress?: () => void;
  onRelease?: () => void;
}

const BlackKey = ({ note, pressed = false, onPress, onRelease }: KeyProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`relative -ml-[17px] -mr-[17px] h-[200px] w-[30px] z-[2] flex flex-col justify-end items-center pb-2 transition-colors ${
          pressed ? 'bg-gray-600' : 'bg-black'
        }`}
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchStart={onPress}
        onTouchEnd={onRelease}
      >
        <span className="text-white font-bold">{note}</span>
      </div>
    </div>
  );
};

export default BlackKey;