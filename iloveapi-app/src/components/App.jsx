import UploadForm from "./UploadForm";
import ResultCard from "./ResultCard";
import { Container } from "react-bootstrap";


export default function App() {
  return (
    <Container className="my-5">
      <header className="text-center mb-4">
        <h1 className="text-primary fw-bold">PDF Compressor - Projeto Fullstack</h1>
        <p className="text-muted">Utilizando React, Context API, useReducer e Bootstrap</p>
      </header>
      
      <UploadForm />
      
      <ResultCard />
    </Container>
  );
}
