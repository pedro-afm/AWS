const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);

let password = 'sua_senha_secreta'; // Substitua 'sua_senha_secreta' pela senha real do usuário
let encryptedPassword = cipher.update(password, 'utf8', 'hex');
encryptedPassword += cipher.final('hex');

// Envie a senha criptografada (encryptedPassword) para o backend, juntamente com a chave (key) e o IV (iv)
console.log('Senha criptografada: ', encryptedPassword);
console.log('Chave: ', key.toString('hex'));
console.log('IV: ', iv.toString('hex'));


const decipher = crypto.createDecipheriv(algorithm, key, iv);

let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
decryptedPassword += decipher.final('utf8');

console.log('Senha descriptografada: ', decryptedPassword);
