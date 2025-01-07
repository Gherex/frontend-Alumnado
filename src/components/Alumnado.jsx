export default function Alumnado({ role }) {
  const handleRestrictedAction = () => {
    if (role === "admin") {
      alert("Acción permitida");
    } else {
      alert("Acción no permitida para invitados");
    }
  };

  return (
    <div>
      <h1>App Alumnado</h1>
      <button onClick={handleRestrictedAction}>Hacer PUT/DELETE</button>
      <p>Rol actual: {role}</p>
    </div>
  );
}
