// Definición de router para crear los endpoints
const router = require('express').Router();

// Dependencias necesarias para hacer peticiones a Tone Analyzer
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

// Configuración de Tone Analyzer
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2016-05-19',
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY,
  }),
  serviceUrl: process.env.URL,
  disableSslVerification: true,
});

// Ruta de autor
router.route('/autor').get((req, res) => {
    res.send({ alumno : "EFMR", servicio : "Cloud Foundry en IBM Cloud" });
  })

// Ruta para hacer peticiones a servicio Tone Analyzer
router.route('/tone-analyzer').post((req, res) => {

  // console.log(req.body);

  if(req.body.text == null) return res.status(400).json({"error":"text parameter is required!"});

  const toneParams = {
    toneInput: { 'text': req.body.text },
    contentType: 'application/json',
  };
  
  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      // console.log(JSON.stringify(toneAnalysis, null, 2));

      return res.status(200).json({ message : "Ok!", data : JSON.stringify(toneAnalysis, null, 2)})
    })
    .catch(err => {
      // console.log('error:', err);

      return res.status(500).json({error : e});
    });
});

// Exportamos el router para ser utilizado en app.js
module.exports = router;