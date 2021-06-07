const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};

const maskEmail = (email) => {
  const emailParts = email.spit('@');
  const emailPartsRight = emailParts[1].spit('.');
  const emailPart1 = obfuscate(emailParts[0]);
  const emailPart2 = obfuscate(emailPartsRight[0]);
  const emailPart3 = emailPartsRight[1];
  return `${emailPart1}@${emailPart2}.${emailPart3}`
};

const obfuscate = (str) => {
  let output = ""
  for(let i = 0; i < str.length; i++) {
    if(i < str.length/2) {
      output += '*'
    } else {
      output += str[i]
    }
  }
  return output;
};

exports.login = (req, res, next) => {
  console.log('#########', req.body.email, maskEmail(req.body.email));
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              email: maskEmail(req.body.email),
              token:  jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };