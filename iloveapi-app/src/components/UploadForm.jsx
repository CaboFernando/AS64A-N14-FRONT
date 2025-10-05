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
        // Log detalhado para o console em cada falha de retentativa
        if (i < maxRetries - 1) {
            console.warn(`Tentativa ${i + 1} falhou. Tentando novamente em ${delay * (2 ** i)}ms.`, error.response?.data || error.message);
        }
        if (i === maxRetries - 1) throw error;
        // Espera com backoff exponencial
        await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificação de preenchimento de campos obrigatórios (antes do envio)
    if (!file) {
      // Apresentação de mensagens de erro de validação (antes do envio)
      return dispatch({ type: "ERROR", payload: "Selecione um arquivo DOCX (Word)!" });
    }

    try {
      dispatch({ type: "UPLOAD_START" }); // Status: uploading

      // 1️⃣ Autenticar
      const authResponse = await withRetries(() => axios.post(`${API_BASE_URL}/auth`, { public_key: PUBLIC_KEY }));
      const token = authResponse.data.token;
      const authHeader = { Authorization: `Bearer ${token}` };

      // 2️⃣ Iniciar tarefa: Office to PDF
      const startResponse = await withRetries(() => axios.get(`${API_BASE_URL}/start/officepdf`, { headers: authHeader }));
      const { server, task } = startResponse.data;

      // 3️⃣ Upload do arquivo 
      const formData = new FormData();
      formData.append("task", task);
      formData.append("file", file);

      await withRetries(() => axios.post(`https://${server}/v1/upload`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          ...authHeader // Adiciona o header de autenticação
        },
      }));

      // 4️⃣ Processar (Busca com envio de parâmetros para a API JSON)
      dispatch({ type: "PROCESSING" }); // Status: processing
      const processResponse = await withRetries(() => axios.post(
        `https://${server}/v1/process`,
        // Parâmetros para conversão Office to PDF
        { task }, 
        { headers: authHeader }
      ));

      // 5️⃣ Sucesso
      dispatch({ type: "SUCCESS", payload: processResponse.data.download_url });
      
    } catch (err) {
      // Apresentação de mensagens de erro de validação (após o envio)
      const apiErrorData = err.response?.data;
      
      // Tenta extrair a mensagem de erro da API ou retorna uma mensagem genérica
      const errorMessage = apiErrorData?.error?.message || apiErrorData?.message || "Falha na conversão. Verifique a chave ou se o arquivo é válido.";

      console.error("ILoveAPI Error Detail:", apiErrorData || err.message);

      // Garante que apenas a string de erro seja enviada ao estado para evitar que o React quebre
      dispatch({ type: "ERROR", payload: errorMessage });
    }
  };

  const isProcessing = state.status === "uploading" || state.status === "processing";
  const statusMessage = state.status === "uploading" ? "1. Enviando arquivo Word..." : "2. Convertendo para PDF...";

  // Se o processamento já terminou, não mostra o formulário (ResultCard será mostrado)
  if (state.status === 'done') return null;

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
      
      <h2 className="text-center mb-4 text-primary">Selecione seu DOCX</h2>
      
      {/* Mensagem de Erro */}
      {state.status === "error" && <Alert variant="danger">{state.error}</Alert>}

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Arquivo DOCX (Word)</Form.Label>
        <Form.Control
          type="file"
          // MUDANÇA: aceita apenas arquivos DOCX/DOC
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          onChange={(e) => setFile(e.target.files[0])}
          disabled={isProcessing}
        />
        <Form.Text className="text-muted">
            {file ? `Selecionado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : 'Apenas arquivos Word (.docx, .doc) são aceitos.'}
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
            {state.status === 'uploading' ? 'Enviando...' : 'Convertendo...'}
          </>
        ) : (
          "Converter para PDF"
        )}
      </Button>
    </Form>
  );
}
