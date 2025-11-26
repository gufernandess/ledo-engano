import "./Cards.css";

export default function MemberCard({ name, instrument, img }) {
  return (
    <div className="member-card reveal">
      {img ? (
        <img src={img} alt={name} className="member-image" />
      ) : (
        <div className="member-placeholder">{name.charAt(0)}</div>
      )}

      <div className="member-info">
        <h3 className="member-name">{name}</h3>
        <p className="member-instrument">{instrument}</p>
      </div>
    </div>
  );
}
