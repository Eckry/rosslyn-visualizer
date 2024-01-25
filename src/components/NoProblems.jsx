export default function NoProblems({ day }) {
  return (
    <div key={day} className="day-container">
      <h4 className="day">{day}</h4>
      <div className="problem-container">
        <p className="not-found">No se encontraron problemas...</p>
      </div>
    </div>
  );
}
