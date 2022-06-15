const mongoose = require('mongoose');
const validator = require('validador');

const MoradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, defalt:'' },
  email: { type: String, required: false, defalt:'' },
  telefone: { type: String, required: false, defalt:'' },
  criadoEm: { type: Date, defalt: Date.now },
  
});

const MoradorModel = mongoose.model('Morador', MoradorSchema);


function Morador(body){
  this.body = body;
  this.errors = [];
  this.morador = null;
}
Morador.prototype.register = async function(){
  this.valida();
  if(this.erros.length > 0) return;
  this.Morador = await MoradorModel.create(this.body)
}
Morador.prototype.valida = function() {
  this.cleanUp();

  //validação
  //o e-mail precisa ser valido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.nome) this.errors.push('Nome de um campo obrigatório');
  if(!this.body.nome && !this.body.telefone) {
     this.errors.push('pelo menos um Morador precisa ser enviado: email ou teleone');
  }
 };

 Morador.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.nome,
    email: this.body.nome,
    telefone: this.body.nome,
  };
 };


module.exports = Morador;
