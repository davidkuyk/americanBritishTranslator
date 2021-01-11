'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let answer = translator.translate(req.body);
      console.log('answer error: ' + answer.error)
      console.log('answer: ' + answer.translation)
      return res.json(answer)
    });
};
