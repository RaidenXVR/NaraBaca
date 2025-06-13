export default function SVGButton({ onClick, src, text, svgClassName, buttonClassName }) {
  return (
    <button
      onClick={onClick}
      className={`relative border-none bg-transparent cursor-pointer ${buttonClassName}`}
    >
      <div className="relative w-44 sm:w-48 md:w-56 lg:w-64 xl:w-72 aspect-[7/2]">
        <img
          src={src}
          alt="icon"
          className={`w-full h-full object-contain ${svgClassName}`}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-md sm:text-lg md:text-xl lg:text-2xl text-center pointer-events-none px-2">
          {text}
        </span>
      </div>
    </button>
  );
}
