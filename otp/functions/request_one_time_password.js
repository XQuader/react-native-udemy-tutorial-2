const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
  const phone = String(req.body.phone).replace(/[^\d]/g,'');

  if (!phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  admin.auth().getUser(phone)
    .then(user => {
      const code = Math.floor(Math.random()*8999 + 1000);

      twilio.messages.create({
        body: 'Your code is ' + code,
        to: '+' + phone,
        from: '+14808000219'
      }, (error) => {
          if (error) { return res.status(422).send(error); }

          return admin.database().ref('users/' + phone)
            .update({ code, codeValid: true }, () => res.send({ success: true }))
      })
    })
    .catch(error => res.status(422).send(error));
};