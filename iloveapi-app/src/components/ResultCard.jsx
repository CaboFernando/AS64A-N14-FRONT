import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Card, Button } from "react-bootstrap";
// Import Lucide icons if desired, but sticking to Bootstrap for this version
// import { Download } from 'lucide-react'; 

export default function ResultCard() {
  const { state, dispatch } = useContext(AppContext);

  if (state.status !== "done") return null;

  return (
    <Card className="mt-4 shadow-sm text-center border-success">
      <Card.Body>
        <Card.Title className="text-success">✅ Arquivo processado com sucesso!</Card.Title>
        <div className="d-grid gap-2">
          <Button variant="success" href={state.resultUrl} target="_blank">
            Baixar PDF Comprimido
          </Button>
          <Button variant="outline-primary" onClick={() => dispatch({ type: "RESET" })}>
            Processar Outro Arquivo
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
