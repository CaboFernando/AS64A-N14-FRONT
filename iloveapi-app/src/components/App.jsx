import UploadForm from "./UploadForm";
import ResultCard from "./ResultCard";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <Container className="my-5">
      {/* Título do Projeto Atualizado */}
      <h1 className="text-center mb-4 text-primary">Conversor DOCX para PDF - iLoveAPI</h1>
      <UploadForm />
      <ResultCard />
    </Container>
  );
}
