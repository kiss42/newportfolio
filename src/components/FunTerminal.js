import React, { useEffect, useRef, useState } from 'react';
import Reveal from './ui/Reveal';

const PROMPT = 'steven@portfolio:~$';

// Each command returns lines of output. Strings are printed as-is; { k, v } pairs render as aligned key/value rows.
const commands = {
  help: () => [
    'Available commands:',
    { k: 'whoami', v: 'who is this guy?' },
    { k: 'neofetch', v: 'system info, Steven edition' },
    { k: 'ls skills', v: 'what I work with' },
    { k: 'cat haiti.txt', v: 'roots' },
    { k: 'bella', v: 'check on the princess' },
    { k: 'sudo hire steven', v: 'you know you want to' },
    { k: 'clear', v: 'wipe the screen' },
  ],
  whoami: () => [
    'Steven Pierre.',
    'Full-stack developer (front end + back end), Linux operator, independent contractor,',
    'proud Haitian, and full-time head-scratcher for Princess Bella.',
  ],
  neofetch: () => [
    { k: 'user', v: 'steven@portfolio' },
    { k: 'os', v: 'Haitian 1.0 (extra seasoned)' },
    { k: 'kernel', v: 'Linux' },
    { k: 'shell', v: 'bash, with a little Kreyòl' },
    { k: 'uptime', v: '10+ years in IT' },
    { k: 'frontend', v: 'React · Next.js · TypeScript · Tailwind' },
    { k: 'backend', v: 'Node.js' },
    { k: 'fuel', v: 'café + pikliz' },
    { k: 'pet', v: 'Princess Bella (has root)' },
  ],
  'ls skills': () => ['front-end/   back-end/   linux/   design/   it-support/   making-bella-happy/'],
  'ls': () => ['about.txt   haiti.txt   projects/   skills/   bella.jpg   resume.pdf'],
  'cat haiti.txt': () => [
    'Sak pase? N ap boule!',
    'Haiti became the first free Black republic in 1804.',
    'Independence runs in the family. That is why I am an independent contractor.',
  ],
  'cat about.txt': () => ['I fix what is broken and build what is next. Run `whoami` for the long version.'],
  bella: () => [
    'Princess Bella: online. Mood: royal.',
    'Requests for head scratches: always approved. Scroll up and hold the button.',
  ],
  'sudo hire steven': () => ['[sudo] password for recruiter: ********', 'Access granted. Scroll down to Contact and say hi.'],
  'hire steven': () => ['Permission denied. Try: sudo hire steven'],
  'sudo rm -rf /': () => ['Nice try. Bella has root on this machine, and she said no.'],
  'sudo make me a sandwich': () => ['Okay. One griot sandwich, coming up.'],
  exit: () => ['There is no exit. Only more scrolling.'],
};

const quick = ['help', 'whoami', 'neofetch', 'cat haiti.txt', 'bella', 'sudo hire steven'];

const intro = [{ cmd: null, out: ['Welcome. Type a command, or tap one below. Try `neofetch`.'] }];

// A small, playable terminal: a nod to the Linux side of the job.
const FunTerminal = () => {
  const [history, setHistory] = useState(intro);
  const [value, setValue] = useState('');
  const [past, setPast] = useState([]);
  const [pastIndex, setPastIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().replace(/\s+/g, ' ');
    if (!cmd) return;
    setPast((p) => [cmd, ...p].slice(0, 30));
    setPastIndex(-1);
    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }
    const fn = commands[cmd.toLowerCase()];
    const out = fn ? fn() : [`command not found: ${cmd}`, 'Even Linux can not run that one. Try `help`.'];
    setHistory((h) => [...h, { cmd, out }].slice(-12));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp' && past.length) {
      e.preventDefault();
      const i = Math.min(pastIndex + 1, past.length - 1);
      setPastIndex(i);
      setValue(past[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = pastIndex - 1;
      setPastIndex(i);
      setValue(i >= 0 ? past[i] : '');
    }
  };

  return (
    <Reveal className="mt-28">
      <p className="eyebrow mb-4">Off the clock (still in the terminal)</p>
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)', background: '#0a0a0c', boxShadow: '0 40px 80px -40px var(--glow)' }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#121216' }}>
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-[#a1a1aa] truncate">steven@portfolio: ~ (bash)</span>
        </div>
        <div
          ref={scrollRef}
          className="font-mono text-[0.8rem] sm:text-sm leading-relaxed px-4 sm:px-5 py-4 h-72 overflow-y-auto text-[#e4e4e7]"
          onClick={() => inputRef.current?.focus()}
          aria-live="polite"
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              {entry.cmd !== null && (
                <div>
                  <span className="text-[#4ade80]">{PROMPT}</span> <span>{entry.cmd}</span>
                </div>
              )}
              {entry.out.map((line, j) =>
                typeof line === 'string' ? (
                  <div key={j} className="whitespace-pre-wrap break-words text-[#d4d4d8]">{line}</div>
                ) : (
                  <div key={j} className="flex gap-3">
                    <span className="w-24 sm:w-28 shrink-0 text-[#c4b5fd]">{line.k}</span>
                    <span className="text-[#d4d4d8] min-w-0 break-words">{line.v}</span>
                  </div>
                )
              )}
            </div>
          ))}
          <label className="flex items-center gap-2">
            <span className="text-[#4ade80] shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              id="fun-terminal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 min-w-0 bg-transparent outline-none text-[#fafafa] caret-[#4ade80]"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal command"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2 px-4 sm:px-5 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0f0f12' }}>
          {quick.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="font-mono text-xs rounded-md px-2.5 py-1.5 border text-[#e4e4e7] border-white/10 hover:border-[#4ade80] hover:text-[#4ade80] transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default FunTerminal;
