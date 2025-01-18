import CircularProgress from "@mui/material/CircularProgress";

function CirculoDeCarga() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      }}
    >
      <CircularProgress />
    </div>
  );
}
export default CirculoDeCarga;
