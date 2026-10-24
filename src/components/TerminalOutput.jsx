import React, { useState } from 'react';
import { Terminal, Copy, CheckCheck } from 'lucide-react';

export default function TerminalOutput({ output }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700/80 bg-[#060a14] shadow-2xl overflow-hidden my-4 studious-border font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b1222] border-b border-slate-800">
        <div className="flex items-center space-x-2">
          {/* Traffic lights */}
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block"></span>
          </div>
          <div className="flex items-center space-x-2 ml-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-300">
              STDOUT // Program Execution &amp; Verification Log
            </span>
            <span className="hidden sm:inline-flex text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              BASH / GCC
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer border ${
            copied
              ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
          }`}
          title="Copy output text"
        >
          {copied ? (
            <>
              <CheckCheck className="w-3 h-3 text-emerald-400" />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 overflow-x-auto code-scroll max-h-[500px] text-xs sm:text-[13px] leading-relaxed bg-[#040711] text-slate-200 select-text">
        <pre className="font-mono whitespace-pre m-0">
          {output.split('\n').map((line, idx) => {
            if (line.startsWith('$')) {
              return (
                <div key={idx} className="text-emerald-400 font-semibold my-0.5">
                  <span className="text-cyan-400 mr-1.5">$</span>
                  <span>{line.substring(2)}</span>
                </div>
              );
            }
            if (line.includes('>> SUCCESS:')) {
              return (
                <div key={idx} className="text-emerald-400 font-medium my-0.5">
                  {line}
                </div>
              );
            }
            if (line.includes('>> NOT FOUND:') || line.includes('>> ACCESS DENIED:') || line.includes('>> ERROR:') || line.includes('>> SORRY:') || line.includes('OVERFLOW') || line.includes('UNDERFLOW')) {
              return (
                <div key={idx} className="text-amber-400 font-medium my-0.5">
                  {line}
                </div>
              );
            }
            if (line.startsWith('===') || line.startsWith('---') || line.startsWith('++++') || line.startsWith('+---')) {
              return (
                <div key={idx} className="text-slate-600 my-0.5 select-none">
                  {line}
                </div>
              );
            }
            if (line.includes('MENU') || line.match(/^\d+\./)) {
              return (
                <div key={idx} className="text-cyan-300/90 my-0.5 font-medium">
                  {line}
                </div>
              );
            }
            return (
              <div key={idx} className="text-slate-300 my-0.5">
                {line}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
