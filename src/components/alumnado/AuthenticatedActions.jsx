function AuthenticatedActions({ data, loading, error }) {
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Panel de Administrador</h1>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
}

export default AuthenticatedActions;
