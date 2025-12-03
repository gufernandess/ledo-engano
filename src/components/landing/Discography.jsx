import SectionTitle from "../common/SectionTitle";
import AlbumCard from "../ui/AlbumCard";

export default function Discography({ albumsData }) {
  return (
    <section id="discography">
      <SectionTitle>Discografia</SectionTitle>

      {albumsData && albumsData.length > 0 ? (
        <div className="albums-grid">
          {albumsData.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              year={album.year}
              tracks={album.tracks}
              isAdmin={false}
            />
          ))}
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "var(--light)",
            fontFamily: "var(--font-hand)",
          }}
        >
          Nenhum álbum lançado... por enquanto.
        </p>
      )}
    </section>
  );
}
