import { useState } from "react";
import sillonImage from "../assets/sillon.png";

const SHEETS_ENDPOINT =
  import.meta.env.VITE_SHEETS_URL ||
  "https://script.google.com/macros/s/AKfycbwW0ALGhCR2k3mvAlRXlWZ0rk67FGKd4xad542QWJ6eoPT3AzfOZcAK7ojVXpIRLl4-1w/exec";

function RSVPForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !surname.trim()) {
      setStatus({
        type: "error",
        message: "Por favor completa nombre y apellido.",
      });
      return;
    }

    if (plusOne && !plusOneName.trim()) {
      setStatus({
        type: "error",
        message: "Por favor completa el nombre del +1.",
      });
      return;
    }

    if (!SHEETS_ENDPOINT) {
      setStatus({
        type: "error",
        message: "No hay endpoint configurado para guardar en Google Sheets.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = {
      nombre: name.trim(),
      apellido: surname.trim(),
      pareja: plusOne ? "true" : "false",
      pareja_nombre: plusOne ? plusOneName.trim() : "",
    };

    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      setStatus({
        type: "success",
        message: "¡Confirmado! Tu respuesta se guardó en la hoja.",
      });
      setName("");
      setSurname("");
      setPlusOne(false);
      setPlusOneName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message: "Hubo un problema. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section">
      <div className="rsvp-panel">
        <div className="rsvp-image">
          <img src={sillonImage} alt="Sillón" />
        </div>

        <div>
          <div className="rsvp-copy">
            <p className="section-eyebrow">RSVP</p>
            <h2>Confirmá tu asistencia</h2>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit}>
            <label className="rsvp-field">
              <span>Nombre</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nombre"
                required
              />
            </label>

            <label className="rsvp-field">
              <span>Apellido</span>
              <input
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                placeholder="Apellido"
                required
              />
            </label>

            <label className="rsvp-toggle">
              <input
                type="checkbox"
                checked={plusOne}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setPlusOne(checked);
                  if (!checked) setPlusOneName("");
                }}
              />
              <span>Traigo pareja</span>
            </label>

            {plusOne ? (
              <label className="rsvp-field">
                <span>Nombre del +1</span>
                <input
                  type="text"
                  value={plusOneName}
                  onChange={(event) => setPlusOneName(event.target.value)}
                  placeholder="Nombre del +1"
                  required
                />
              </label>
            ) : null}

            <button type="submit" className="rsvp-button" disabled={loading}>
              {loading ? "Enviando..." : "+ Guardar RSVP"}
            </button>

            {status ? (
              <p
                className={`rsvp-status ${status.type === "error" ? "error" : "success"}`}
              >
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default RSVPForm;
