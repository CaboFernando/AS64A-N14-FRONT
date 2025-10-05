export const initialState = {
  status: 'idle', 
  file: null,
  resultUrl: '',
  error: ''
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload };
    case 'UPLOAD_START':
      // Limpa erros e URL anterior, define o status para 'uploading'
      return { ...state, status: 'uploading', error: '', resultUrl: '' };
    case 'PROCESSING':
      return { ...state, status: 'processing' };
    case 'SUCCESS':
      return { ...state, status: 'done', resultUrl: action.payload };
    case 'ERROR':
      // Corrige a redefinição de status: define como 'error'
      return { ...state, status: 'error', error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
