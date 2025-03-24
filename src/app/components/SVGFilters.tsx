
//creates 5 different filters to html like this:
{/* <defs>
    <filter id="squiggle-0">...seed=0...</filter>
    <filter id="squiggle-1">...seed=1...</filter>
    <filter id="squiggle-2">...seed=2...</filter>
    <filter id="squiggle-3">...seed=3...</filter>
    <filter id="squiggle-4">...seed=4...</filter>
</defs> */}
//the "seed" is what gives differnet amounts of "squiggle"

export function SVGFilters() {
  return (
    <svg className="h-0 w-0">
      <defs>
        {Array.from({ length: 5 }).map((_, index) => (
          <filter id={`squiggle-${index}`} key={index}>
            <feTurbulence
              baseFrequency="0.05"
              id="turbulence"
              numOctaves="2"
              result="noise"
              seed={index}
            ></feTurbulence>
            <feDisplacementMap
              id="displacement"
              in2="noise"
              in="SourceGraphic"
              scale="4"
            ></feDisplacementMap>
          </filter>
        ))}
      </defs>
    </svg>
  );
}