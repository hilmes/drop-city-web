'use client';

import { useState, FormEvent } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'exists';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [position, setPosition] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setState('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState('error');
        return;
      }

      if (data.alreadyExists) {
        setState('exists');
      } else {
        setState('success');
        setPosition(data.position);
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'success' || state === 'exists') {
    return (
      <div className="max-w-md mx-auto text-center space-y-4">
        <div className="w-16 h-16 mx-auto border-2 border-swiss-black dark:border-white flex items-center justify-center">
          <span className="text-heading">✓</span>
        </div>
        <h3 className="text-subheading font-light">
          {state === 'exists' ? 'You\'re already in' : 'You\'re in'}
        </h3>
        <p className="text-body text-gray-500 dark:text-gray-400">
          {state === 'exists' 
            ? 'We already have your email. Sit tight — invites coming soon.'
            : position && position <= 100
              ? `You're #${position} on the list. Early birds get first access.`
              : 'We\'ll send your invite when we\'re ready for you.'
          }
        </p>
        <p className="text-small text-gray-400 dark:text-gray-500">
          Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={state === 'loading'}
          className="flex-1 px-4 py-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-body focus:border-swiss-black dark:focus:border-white outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary whitespace-nowrap disabled:opacity-50"
        >
          {state === 'loading' ? 'Joining...' : 'Request Access'}
        </button>
      </div>
      
      {state === 'error' && (
        <p className="text-small text-red-500">
          Something went wrong. Try again.
        </p>
      )}
      
      <p className="text-tiny text-gray-400 dark:text-gray-500 text-center">
        We'll only email you about Drop City. No spam, no sharing. 
        <a href="/privacy" className="underline ml-1 hover:text-gray-600 dark:hover:text-gray-300">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
