import SectionTitle from "../common/SectionTitle";
import ShowCard from "../ui/ShowCard";

export default function Shows({ showsData }) {
  return (
    <section id="shows">
      <SectionTitle>Próximos Shows</SectionTitle>
      <div className="shows-container">
        {showsData.map((show) => (
          <ShowCard
            key={show.id}
            date={show.date}
            venue={show.venue}
            time={show.time}
            isAdmin={false}
          />
        ))}
      </div>
    </section>
  );
}
