import React from 'react';
import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import './index.css';
import MosaicComponent from './components/Mosaic/Mosaic';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen p-2 bg-slate-400 flex">
      <MosaicComponent />
    </div>
  );
};

export default App;
