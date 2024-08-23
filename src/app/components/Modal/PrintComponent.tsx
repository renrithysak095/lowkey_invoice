// PrintComponent.tsx
import React from 'react';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RenderInvoice from '../others/RenderInvoice';

const PrintComponent = React.forwardRef(({ template }: any, ref: any) => (
    <div ref={ref} className="printable">
        <RenderInvoice id={"3f4c2127-aead-4c89-a40c-136fb519aaa5"} apiKey={"W0LpYtcHt8J2T66_z7WG_g6bI2A09sWQKSMguGwpxSY"} template={template} />
    </div>
));

PrintComponent.displayName = 'PrintComponent';

export default PrintComponent;
