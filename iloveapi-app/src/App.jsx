import React from 'react';
import { ApiProvider } from './contexts/ApiContext';
import ApiViewer from './components/ApiViewer';

function App() {
  return (
    <ApiProvider>
      <ApiViewer />
    </ApiProvider>
  );
}

export default App;
