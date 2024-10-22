const crypto = require('crypto');

// Function to generate a secure random password
const generatePassword = (req, res) => {
    console.log('reqeust reached in badkend',req.body)
  const { length, options } = req.body;

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+[]{}|;:,.<>?';

  let charset = '';
  if (options.lowercase) charset += lowercase;
  if (options.uppercase) charset += uppercase;
  if (options.numbers) charset += numbers;
  if (options.special) charset += special;

  if (charset.length === 0) {
    return res.status(400).json({ error: 'At least one character type must be selected' });
  }

  // Generate password
  const password = Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => charset.charAt(x % charset.length))
    .join('');

  res.json({ password });
};

module.exports = { generatePassword };
