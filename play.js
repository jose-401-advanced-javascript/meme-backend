const { sign, verify } = require('jsonwebtoken');

const token = sign({ 'hi': 'there' }, 'RANDOMWoRD', {
  expiresIn: '24h'
});

console.log(token);

const valid = verify(token, 'RANDOMWoRD');
console.log(valid);
