const modelUser=require('../models/models');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
  
  exports.afficherAllUser=function(req, res) {
    
    modelUser.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  };

  exports.getUser=function(req, res) {
    
    modelUser.findOne({ email: req.params.email })
    .then(user => res.json(user))
    .catch(console.log('erreur'));
  };



  exports.updateUser = (req, res) => {
    modelUser.updateOne({ email: req.params.email }, {
        nom: req.body.nom,
        tel: req.body.tel
    })
    .then(() => res.json({ message: 'user updated !' }))
    .catch(error => res.json({ error }));
};



  exports.createUser=function(req, res) {

    bcrypt.hash(req.body.mot_de_passe,10)
     .then(hash =>{
       const usermo=new modelUser({
        nom: req.body.nom,
      tel: req.body.tel,
      type: req.body.type,
      email:req.body.email,
      mot_de_passe:hash
        });
      usermo.save()
      .then(() => console.log('Objet enregistré and save !'))
        .catch(error => res.status(400).json({ error }));

     })
     .catch(error => res.status(500).json({ error }));

    
  

  };



  exports.login=function(req,res){
    modelUser.findOne({ email: req.body.email })
    .then(user => {
        
      if (!user) {
      res.status(401).json({ message: 'Not Autho588858888rized' });
     } 
     else{
      bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe)
       .then(valid =>{
          if(!valid){
            res.status(401).json({ message: 'mot de pass not valid' });
          }

          var token = jwt.sign({ id: user._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h' // 24 hours
          });
          res.status(200).send({
            
            id: user._id,
            nom:user.nom,
          email: user.email,
          tel: user.tel,
          type: user.type,
          accessToken: token
            
        });
    
       })
       .catch(error => res.status(500).json({ error }));
              
         
     }   
      
    })
    .catch(error => res.status(500).json({ error }));
  };





  exports.modifyUser=function(req, res) {
    res.send('user modify');
  };



  

  exports.deleteUser=function(req, res) {
    res.send('hello world');
  };


