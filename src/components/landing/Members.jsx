import SectionTitle from "../common/SectionTitle";
import MemberCard from "../ui/MemberCard";
import { members } from "../../data/mockData";

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
