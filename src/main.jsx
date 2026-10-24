import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center p-6 font-mono">
          <div className="max-w-xl w-full p-6 bg-red-950/40 border border-red-800 rounded-xl">
            <h2 className="text-lg font-bold text-red-400 mb-2">Application Error Detected</h2>
            <p className="text-sm text-slate-300 mb-4">{this.state.error?.message || 'Unknown error'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded text-xs font-semibold cursor-pointer"
            >
              Reload Workbench
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

// Register Service Worker for 100% offline access
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('DSA Workbench: ServiceWorker registered successfully with scope:', registration.scope);
      })
      .catch((error) => {
        console.warn('DSA Workbench: ServiceWorker registration failed:', error);
      });
  });
}
