
import { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import Layout from '@/components/layout/Layout';
import swaggerJson from '../../swagger.json';

const ApiDocs = () => {
  useEffect(() => {
    // Add custom styling for Swagger UI to match our theme
    const style = document.createElement('style');
    style.innerHTML = `
      .swagger-ui {
        color: #e5e7eb;
        font-family: ui-sans-serif, system-ui, sans-serif;
      }
      .swagger-ui .info .title {
        color: white;
      }
      .swagger-ui .opblock .opblock-summary-operation-id, 
      .swagger-ui .opblock .opblock-summary-path,
      .swagger-ui .opblock .opblock-summary-path__deprecated,
      .swagger-ui .opblock .opblock-summary-description {
        color: #e5e7eb;
      }
      .swagger-ui .opblock .opblock-section-header {
        background: #1f2937;
      }
      .swagger-ui .opblock .opblock-section-header h4 {
        color: white;
      }
      .swagger-ui .opblock .table-container {
        background: #111827;
      }
      .swagger-ui .opblock .parameter__name, 
      .swagger-ui .opblock .parameter__type {
        color: #e5e7eb;
      }
      .swagger-ui .opblock .responses-wrapper {
        background: #111827;
      }
      .swagger-ui .opblock .responses-inner h4, 
      .swagger-ui .opblock .responses-inner h5 {
        color: #e5e7eb;
      }
      .swagger-ui .info .title small {
        background: #3b82f6;
      }
      .swagger-ui .scheme-container {
        background: #1f2937;
      }
      .swagger-ui select {
        background: #111827;
        color: white;
      }
      .swagger-ui input {
        background: #111827;
        color: white;
      }
      .swagger-ui .btn {
        background: #3b82f6;
        color: white;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
        <div className="bg-gray-900 rounded-lg p-4">
          <SwaggerUI spec={swaggerJson} />
        </div>
      </div>
    </Layout>
  );
};

export default ApiDocs;
