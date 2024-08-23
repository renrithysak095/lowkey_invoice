import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
const JsonEditor = ({ json }: {json:any}) => {
  
  const jsonString = JSON.stringify(json, null, 2);

  return (
    <div className="json-editor-container">
      <SyntaxHighlighter 
        language="json" 
        style={vscDarkPlus}
        customStyle={{
          maxHeight: '400px',
          overflow: 'auto',
          borderRadius: '0.75rem',
          padding: '1rem'
        }}
      >
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
};

export default JsonEditor;