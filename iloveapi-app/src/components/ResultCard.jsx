import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Card, Button } from "react-bootstrap";

export default function ResultCard() {
  const { state, dispatch } = useContext(AppContext);

  if (state.status !== "done") return null;

  return (
    <Card className="mt-5 shadow-lg text-center border-success">
      <Card.Body>
        <Card.Title className="text-success">✅ Conversao Concluida!</Card.Title>
        <Card.Text>Seu arquivo foi convertido com sucesso. Clique para baixar.</Card.Text>
        
        <Button variant="success" href={state.resultUrl} target="_blank" className="mt-3">
          Baixar PDF Final
        </Button>

        <Button 
            variant="outline-secondary" 
            onClick={() => dispatch({ type: 'RESET' })} 
            className="mt-3 ms-2"
        >
          Converter Outro
        </Button>
      </Card.Body>
    </Card>
  );
}
