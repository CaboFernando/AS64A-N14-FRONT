import Spinner from "react-bootstrap/Spinner";

export default function Loader({ message = "Aguarde..." }) {
  return (
    <div className="text-center my-3 d-flex flex-column align-items-center">
      <Spinner animation="border" role="status" className="mb-2" />
      <span className="text-muted small">{message}</span>
    </div>
  );
}
