const crypto = require('crypto');

const dotenv = require('dotenv');
dotenv.config();

const publicKey = process.env.publicKeyFrontend;
const privateKey = process.env.privateKeyBackend;

// Dados a serem criptografados
const dataToEncrypt = input.password;

// Criptografe os dados com a chave pública
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(dataToEncrypt));

// Envie os dados criptografados para o backend
console.log(encryptedData.toString('base64'));

const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      format: 'pem',
    },
    encryptedData
  );
  
  console.log(decryptedData.toString('utf8')); // Deve exibir "Mensagem secreta"