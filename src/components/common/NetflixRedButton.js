import React from "react";

const NetflixRedButton = ({ label, customWidth , onClickFn, customTailwindCss = '' }) => {
  return (
    <button
      className={`py-2 w-[${customWidth || "300px"}] mt-8 hover:bg-red-800 bg-red-600 rounded-sm text-white font-semibold ${customTailwindCss}`}
      onClick={onClickFn}
      style={{width: customWidth || "300px"}}
    >
      {label}
    </button>         
  );
};

export default NetflixRedButton;
