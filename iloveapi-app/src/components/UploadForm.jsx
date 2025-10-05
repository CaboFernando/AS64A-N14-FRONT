import { useContext, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import Loader from "./Loader";
import axios from "axios";

export default function UploadForm() {
  const { state, dispatch } = useContext(AppContext);
  const [file, setFile] = useState(null);

  // CHAVE PÚBLICA INSERIDA
  const PUBLIC_KEY = "project_public_d17861a95e2968654c82a48778beca07_twh7e0bcb252957e55d73645e62b63d40c5c5";
  const API_BASE_URL = "https://api.ilovepdf.com/v1";

  // Função com lógica de retentativas e Backoff Exponencial para robustez
  const withRetries = async (apiCall, maxRetries = 3, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await apiCall();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        // Espera com backoff exponencial
        await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificação 1: Chave obrigatória (REMOVIDA/AJUSTADA, POIS A CHAVE JÁ ESTÁ INSERIDA)
    // Se a chave estivesse como "SUA_PUBLIC_KEY_AQUI", esta verificação seria útil.
    // Agora que a chave está no lugar, podemos seguir diretamente.

    // Verificação 2: Arquivo obrigatório (Preenchimento de campo obrigatório na busca)
    if (!file) {
      return dispatch({ type: "ERROR", payload: "Selecione um arquivo PDF!" });
    }

    try {
      dispatch({ type: "UPLOAD_START" }); // Status: uploading

      // 1️⃣ Autenticar
      const authResponse = await withRetries(() => axios.post(`${API_BASE_URL}/auth`, { public_key: PUBLIC_KEY }));
      const token = authResponse.data.token;
      const authHeader = { Authorization: `Bearer ${token}` };

      // 2️⃣ Iniciar tarefa
      const startResponse = await withRetries(() => axios.get(`${API_BASE_URL}/start/compress`, { headers: authHeader }));
      const { server, task } = startResponse.data;

      // 3️⃣ Upload do arquivo
      const formData = new FormData();
      formData.append("task", task);
      formData.append("file", file);

      await withRetries(() => axios.post(`https://${server}/v1/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }));

      // 4️⃣ Processar (Busca com envio de parâmetros para a API JSON)
      dispatch({ type: "PROCESSING" }); // Status: processing
      const processResponse = await withRetries(() => axios.post(
        `https://${server}/v1/process`,
        // Parâmetros enviados para a API JSON
        { task, compress_level: 'extreme' }, 
        { headers: authHeader }
      ));

      // 5️⃣ Sucesso
      dispatch({ type: "SUCCESS", payload: processResponse.data.download_url });
    } catch (err) {
      console.error("ILoveAPI Error:", err.response?.data || err.message);
      // Apresentação de mensagens de erro de validação (ou de API)
      const errorMessage = err.response?.data?.error || "Falha no processamento ou na conexão com o servidor.";
      dispatch({ type: "ERROR", payload: errorMessage });
    }
  };

  const isProcessing = state.status === "uploading" || state.status === "processing";
  const statusMessage = state.status === "uploading" ? "1. Enviando arquivo..." : "2. Comprimindo...";

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
      
      <h2 className="text-center mb-4 text-primary">Selecione seu PDF</h2>
      
      {/* Mensagem de Erro */}
      {state.status === "error" && <Alert variant="danger">{state.error}</Alert>}

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Arquivo PDF</Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={isProcessing}
        />
        <Form.Text className="text-muted">
            {file ? `Selecionado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : 'Apenas arquivos PDF são aceitos.'}
        </Form.Text>
      </Form.Group>

      {isProcessing && <Loader message={statusMessage} />}

      <Button 
        type="submit" 
        variant="primary" 
        disabled={!file || isProcessing}
        className="w-100 mt-3"
      >
        {isProcessing ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            {state.status === 'uploading' ? 'Enviando...' : 'Processando...'}
          </>
        ) : (
          "Comprimir PDF"
        )}
      </Button>
    </Form>
  );
}
