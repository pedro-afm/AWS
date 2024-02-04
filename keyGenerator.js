const crypto = require('crypto');

// Gere um par de chaves (chave pública e chave privada) no frontend
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

console.log(publicKey, privateKey);