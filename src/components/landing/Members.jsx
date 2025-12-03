import SectionTitle from "../common/SectionTitle";
import MemberCard from "../ui/MemberCard";

const members = [
  {
    name: "MATHEUS",
    instrument: "Vocal",
    img: null,
  },
  {
    name: "FLAVIO",
    instrument: "Guitarra",
    img: null,
  },
  {
    name: "ADDNY",
    instrument: "Baixo",
    img: null,
  },
  { name: "VICTOR", instrument: "Bateria", img: null },
  {
    name: "THAIS",
    instrument: "Teclado",
    img: null,
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
