import SectionTitle from "../common/SectionTitle";
import "./Members.css";

import bandPicture from "../../assets/polaroid.png";

export default function Members() {
  return (
    <section id="members">
      <SectionTitle>A Banda</SectionTitle>

      <div className="band-container">
        <div className="band-info">
          <p className="band-text">
            Fundada no final de 2023 em Quixadá, a Ledo Engano é uma banda de
            rock autoral que une influências de post-punk, grunge e hardcore.
            Formado por Flávio, Adnny e Thais, o grupo foca no fortalecimento da
            presença feminina e em uma identidade visual e temática inspirada no
            cinema de terror e na moda punk. O objetivo central da banda é
            expandir seu alcance regional através de composições próprias que
            equilibram energia, melancolia e crítica social.
          </p>
        </div>

        <div className="band-image-wrapper">
          <img src={bandPicture} alt="Foto da Banda" className="band-photo" />
          <div className="band-image-border"></div>
        </div>
      </div>
    </section>
  );
}
