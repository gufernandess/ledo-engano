import SectionTitle from "../common/SectionTitle";
import MemberCard from "../ui/MemberCard";
import matheusPic from "../../assets/images/matheus.jpeg";
import flavioPic from "../../assets/images/flavio.jpeg";
import addnyPic from "../../assets/images/addny.jpeg";
import thaisPic from "../../assets/images/thais.jpeg";

const members = [
  {
    name: "MATHEUS",
    instrument: "Vocal",
    img: matheusPic,
  },
  {
    name: "FLÁVIO",
    instrument: "Guitarra",
    img: flavioPic,
  },
  {
    name: "ADDNY",
    instrument: "Baixo",
    img: addnyPic,
  },
  { name: "VICTOR", instrument: "Bateria", img: null },
  {
    name: "THAÍS",
    instrument: "Teclado",
    img: thaisPic,
  },
];

export default function Members() {
  return (
    <section id="members">
      <SectionTitle>A Banda</SectionTitle>

      <div className="members-grid">
        {members.map((member, index) => (
          <MemberCard
            key={index}
            name={member.name}
            instrument={member.instrument}
            img={member.img}
          />
        ))}
      </div>
    </section>
  );
}
