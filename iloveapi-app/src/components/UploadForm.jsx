import { useContext, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";

export default function UploadForm() {
  const { state, dispatch } = useContext(AppContext);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file)
      return dispatch({ type: "ERROR", payload: "Selecione um arquivo PDF!" });

    try {
      dispatch({ type: "UPLOAD_START" });

      const auth = await axios.post("https://api.ilovepdf.com/v1/auth", {
        public_key: "project_public_df4355a0c4d5d269c169d5692c59b54a_UA2nVf9199e0668de3e2ecd6d258ac0c92a53"
      });
      const token = auth.data.token;

      // Aqui inicia a tarefa
      const start = await axios.get("https://api.ilovepdf.com/v1/start/compress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { server, task } = start.data;

      // Carregando o arquivo
      const formData = new FormData();
      formData.append("task", task);
      formData.append("file", file);

      await axios.post(`https://${server}/v1/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      const process = await axios.post(
        `https://${server}/v1/process`,
        { task, compress_level: 2 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({ type: "SUCCESS", payload: process.data.download_url });
    } catch (err) {
      console.error(err);
      dispatch({ type: "ERROR", payload: "Falha no processamento do arquivo." });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Selecione um arquivo PDF</Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>

      {state.status === "error" && <Alert variant="danger">{state.error}</Alert>}

      <Button type="submit" variant="primary" disabled={state.status === "uploading"}>
        {state.status === "uploading" ? <Spinner size="sm" /> : "Enviar"}
      </Button>
    </Form>
  );
}
