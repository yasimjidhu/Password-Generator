import React, { useState, useEffect } from 'react';
import { Lock, Copy, RefreshCw } from 'lucide-react';
import { useAxios } from '../hooks/useAxios';
import { Checkbox } from '../components/checkBox';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      length,
      options: {
        lowercase: includeLowercase,
        uppercase: includeUppercase,
        numbers: includeNumbers,
        special: includeSpecial,
      },
    },
  };

  const { data, error, loading } = useAxios(apiUrl, requestOptions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) {
      alert('Please select at least one character type.');
      return;
    }
    setApiUrl('http://localhost:3000/passwords');
  };

  useEffect(() => {
    if (data) {
      setGeneratedPassword(data.password);
      setApiUrl('');
    }
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-800 ">Password Generator</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>6</span>
              <span>32</span>
            </div>
          </div>

          <div className="space-y-4">
            <Checkbox
              id="lowercase"
              label="Include Lowercase Letters (a-z)"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            <Checkbox
              id="uppercase"
              label="Include Uppercase Letters (A-Z)"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <Checkbox
              id="numbers"
              label="Include Numbers (0-9)"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <Checkbox
              id="special"
              label="Include Special Characters (!@#$%^&*)"
              checked={includeSpecial}
              onChange={(e) => setIncludeSpecial(e.target.checked)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg 
              transition-colors duration-200 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Generate Password
              </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              Error generating password: {error.message}
            </div>
          )}

          {generatedPassword && (
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-lg break-all">
                {generatedPassword}
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2
                  ${copySuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <Copy className="w-5 h-5" />
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordGenerator;