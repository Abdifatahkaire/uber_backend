const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user= new Schema(
    {
      nom: {type: String, required: true},
      tel: {type: Number,required: true},
      type: {type: String},
      email:{type: String,required: true, unique: true},
      mot_de_passe:{type: String,required: true}
    }
  );



  const modeluser= mongoose.model('SomeModel', user );



  module.exports=modeluser;









