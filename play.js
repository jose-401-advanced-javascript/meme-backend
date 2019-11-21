const { sign, verify } = require('jsonwebtoken');

const token = sign({ 'hi': 'there' }, 'SUPERS3Cre7', {
  expiresIn: '24h'
});

console.log(token);

const valid = verify(token, 'SUPERS3Cre7');
console.log(valid);
