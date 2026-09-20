// Small, consistent SVG icon set (Lucide-style, 1.75 stroke) used for all UI chrome —
// so the interface doesn't rely on emoji for controls. Food emoji stay as content.
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-3.6-3.6" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  sparkle: (
    <path d="M12 3l1.6 5.2a2 2 0 0 0 1.3 1.3L20 11l-5.1 1.5a2 2 0 0 0-1.3 1.3L12 19l-1.6-5.2a2 2 0 0 0-1.3-1.3L4 11l5.1-1.5a2 2 0 0 0 1.3-1.3z" />
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </>
  ),
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  chef: (
    <>
      <path d="M6 13.9A4 4 0 0 1 7.4 6 5.1 5.1 0 0 1 8.5 4.5a5 5 0 0 1 7 0A5.1 5.1 0 0 1 16.6 6 4 4 0 0 1 18 13.9V21H6z" />
      <path d="M6 17h12" />
    </>
  ),
  basket: (
    <>
      <path d="M5.5 11 8 4.5" />
      <path d="M18.5 11 16 4.5" />
      <path d="M3 11h18" />
      <path d="m4.6 11 1.4 7.3a2 2 0 0 0 2 1.7h8a2 2 0 0 0 2-1.7L19.4 11" />
      <path d="M10 14.5v3" />
      <path d="M14 14.5v3" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
}

export default function Icon({ name, size = 22, stroke = 1.75, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
