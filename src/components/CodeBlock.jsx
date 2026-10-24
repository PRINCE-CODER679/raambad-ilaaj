import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import { Copy, Download, FileCode, CheckCheck } from 'lucide-react';

export default function CodeBlock({ code, fileName }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-c;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'program.c';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl border border-slate-700/80 bg-[#080d19] shadow-2xl overflow-hidden my-4 studious-border">
      {/* Studious Code Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 bg-[#0f172a] border-b border-slate-800/90 font-mono">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 text-cyan-400 text-xs">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">{fileName}</span>
          </div>

          <span className="hidden sm:inline-flex text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {lines.length} lines
          </span>
          <span className="text-[11px] uppercase px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800/50">
            ISO C99
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-150 cursor-pointer border active:scale-95 ${
              copied
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
            }`}
            title="Copy entire C program"
          >
            {copied ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-150 cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm border border-cyan-500/50 active:scale-95"
            title="Download .c file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .c</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div className="relative flex overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed max-h-[650px] code-scroll bg-[#060a14]">
        {/* Line numbers gutter */}
        <div className="select-none py-4 px-3.5 text-right bg-[#080d19]/80 text-slate-600 border-r border-slate-800/80 font-mono text-xs leading-relaxed shrink-0">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="p-4 m-0 overflow-visible text-slate-200 font-mono flex-1 whitespace-pre leading-relaxed">
          <code ref={codeRef} className="language-c">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
