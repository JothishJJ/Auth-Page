export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-success"
        style={{ width: "4rem", height: "4rem", marginTop: "26rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
