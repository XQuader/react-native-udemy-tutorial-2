const admin = require('firebase-admin');

module.exports = (req, res) => {
  const phone = String(req.body.phone).replace(/[^\d]/g,'');
  const code = parseInt(req.body.code);

  if (!phone || !code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref('users/' + phone);

      ref.on('value', snapshot => {
        ref.off();
        const user = snapshot.val();

        if (!user.codeValid || user.code !== code) {
          return res.status(422).send({ error: 'Phone number or code is invalid' });
        }

        ref.update({ codeValid: false });
        admin.auth().createCustomToken(phone)
          .then(token => res.send(token))
          .catch(error => res.status(422).send(error));
      });
    })
    .catch(error => res.status(422).send(error));
};