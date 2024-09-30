import React from 'react';

const VoiceLogo = () => {
  return (
    <div className="flex justify-center">
      <video
        src="https://cdn.dribbble.com/userupload/15597962/file/original-9da1b5dd017bce01323bba3dfeb1d085.mp4"
        alt="Voice animation"
        className="w-[20rem] h-auto rounded-lg"
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default VoiceLogo;
