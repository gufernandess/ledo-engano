import SectionTitle from "../common/SectionTitle";
import ShowCard from "../ui/ShowCard";

export default function Shows({ showsData }) {
  if (!showsData || showsData.length === 0) {
    return (
      <section id="shows">
        <SectionTitle>Próximos Shows</SectionTitle>
        <p
          style={{
            textAlign: "center",
            color: "var(--light)",
            fontFamily: "var(--font-hand)",
          }}
        >
          Nenhuma data marcada... por enquanto.
        </p>
      </section>
    );
  }

  return (
    <section id="shows">
      <SectionTitle>Próximos Shows</SectionTitle>
      <div className="shows-carousel">
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
