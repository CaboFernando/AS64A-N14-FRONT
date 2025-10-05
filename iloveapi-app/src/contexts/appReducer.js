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
      return { ...state, status: 'uploading', error: '' };
    case 'PROCESSING':
      return { ...state, status: 'processing' };
    case 'SUCCESS':
      return { ...state, status: 'done', resultUrl: action.payload };
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}
