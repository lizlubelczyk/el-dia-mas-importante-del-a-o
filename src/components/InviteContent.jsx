import { useEffect, useState } from "react";
import InviteDate from "./InviteDate";
import InviteLocation from "./InviteLocation";
import ScrollSection from "./ScrollSection";
import RSVPForm from "./RSVPForm";
import titleImage from "../assets/title.png";
import pingu from "../assets/pingu3.png";
import feliz from "../assets/feliz4.png";
import mic from "../assets/mic.png";
import antiparras from "../assets/antiparras.png";
import mojito from "../assets/mojito.png";

function InviteContent() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const bottom = document.documentElement.scrollHeight - 20;
      setShowArrow(scrolled < bottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="invite-page">
      <section className="hero-section">
        <div className="hero-panel hero-panel-centered">
          <img src={titleImage} alt="Birthday Invite" className="hero-title" />
        </div>
      </section>

      <ScrollSection
        side="left"
        eyebrow="Save the date"
        title="06/06/2026 - 22:30hs"
        image={pingu}
        imageAlt="Birthday celebration image"
      />

      <ScrollSection
        side="right"
        eyebrow="Location"
        title="SUM Haras del Pilar La Pradera"
        image={feliz}
        imageAlt="Event location image"
        linkLabel="Ubicación en Google Maps"
        linkHref="https://maps.app.goo.gl/8JEs6nLSn18amRGW9"
      />

      <RSVPForm />

      <ScrollSection
        side="left"
        eyebrow="Karaoke"
        title="Preparen esas gargantas"
        image={mic}
        imageAlt="Karaoke image"
        linkLabel="Queue de temas para el karaoke"
        linkHref="https://rekwest.app/session/fa257727-ab4a-41ba-9c4d-5f0589955091"
      />
      <ScrollSection
        side="right"
        eyebrow="Fotos"
        title="Suban las fotos a este drive compartido"
        image={antiparras}
        imageAlt="Dress code image"
        linkLabel="Drive compartido para las fotos"
        linkHref="https://drive.google.com/drive/folders/12kkNbzqkZp--QNrnPwUQxqYmPCew6GrU?usp=drive_link"
      />

      <ScrollSection
        side="left"
        eyebrow="Playlist"
        title="Los temas cantados durante la noche"
        image={mojito}
        imageAlt="Dress code image"
        linkLabel="Playlist del repertorio de la noche"
        linkHref="https://open.spotify.com/playlist/3tNV2CrrQmxrxKC7cTsui4?si=71ivsoPuQDmCYBoPKN_Xmw&pi=1lKtGRoKRMm4h"
        footerText="Para dudas o consultas, contacte a su Lizard de confianza"
      />
      {showArrow ? (
        <div className="global-scroll-arrow" aria-hidden="true">
          <span />
        </div>
      ) : null}
    </div>
  );
}

export default InviteContent;
