const admin = require('firebase-admin');

module.exports = (req, res) => {
  const phone = String(req.body.phone).replace(/[^\d]/g,'');

  if (!phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(error => res.status(422).send({ error }));
};
