function InviteLocation() {
  return (
    <section className="w-full max-w-xl text-center">
      <a
        href="https://maps.app.goo.gl/8JEs6nLSn18amRGW9"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-3 leading-none"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" aria-hidden="true">
          <path fill="#EA4335" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
          <circle cx="12" cy="9" r="3.2" fill="#4285F4" />
        </svg>
        <span className="block text-3xl font-bold text-center leading-none">SUM HARAS DEL PILAR LA PRADERA</span>
      </a>
    </section>
  );
}

export default InviteLocation;