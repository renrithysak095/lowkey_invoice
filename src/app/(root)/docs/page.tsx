import { Card, CardBody, CardHeader, Divider, Snippet } from '@nextui-org/react';
import { DocumentCode2 } from 'iconsax-react';
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const page = () => {

    const steps = [
        {
          title: "Install the package",
          code: "npm install sovita-rady@latest"
        },
        {
          title: "Import and use",
          code: `import { RenderInvoice } from 'sovita-rady';\n\nfunction App() {\n  return <RenderInvoice id={} apiKey={} json={}  />;\n}`
        }
      ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col space-y-8">
        {/* Row 1 - Block 1 aligned to start */}
        <div className="flex justify-start w-full">
          <div className="flex flex-col justify-center items-start gap-1">
            <h1 className="text-2xl font-bold">
              Invoice Template Documentation
            </h1>
            <h3 className="text-sm">
              This section provides detailed instructions on customizing and
              viewing your invoice templates dynamically. Learn how to choose a
              template type and preview it with your specific data.
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-6 py-6">
        {steps.map((step, index) => (
          <Card key={index} className="bg-gray-50 dark:bg-gray-800">
            <CardHeader className="flex gap-3">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{step.title}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col relative">
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  {step.code}
                </SyntaxHighlighter>
                {/* Snippet button */}
                <div className="absolute right-0 bottom-0">
                  <Snippet
                    tooltipProps={{
                      color: "default",
                      content: "Copy",
                      disableAnimation: true,
                      placement: "top",
                      closeDelay: 0,
                    }}
                    copyIcon={<DocumentCode2 size="18" color="#FFFFFF" />}
                    symbol=""
                    className="p-0 text-white text-sm bg-transparent mb-3 mr-3"
                  >
                    <span style={{ display: "none" }}>
                      {step.code || "No parameters available"}
                    </span>
                  </Snippet>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page