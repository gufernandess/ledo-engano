import "./BandVideo.css";
import videoBand from "../../assets/videos/band.mp4";

export default function BandVideo() {
  return (
    <section id="band-video">
      <div className="video-container">
        <div className="video-wrapper">
          <div className="video-aspect-ratio">
            <video
              className="video-player"
              controls
              preload="metadata"
              poster="../../assets/polaroid.png"
            >
              <source src={videoBand} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
          <div className="video-image-border"></div>
        </div>

        <div className="video-info">
          <p className="band-text">
            O objetivo central da banda é expandir seu alcance regional através
            de composições próprias que equilibram energia, melancolia e crítica
            social.
          </p>
        </div>
      </div>
    </section>
  );
}
