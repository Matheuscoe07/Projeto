export default class Usuario {
   constructor(id, nome, email, fotoPerfil, nac, totalFollowers, tipoDeConta, urlUsuarioPublica, urlUsuarioAPI) {
     this._id = id;
     this._nome = nome;
     this._email = email;
     this._fotoPerfil = fotoPerfil;
     this._nac = nac;
     this._totalFollowers = totalFollowers;
     this._tipoDeConta = tipoDeConta;
     this._urlUsuarioPublica = urlUsuarioPublica;
     this._urlUsuarioAPI = urlUsuarioAPI;
   }

   checkUser() {
    if (!this._id || !this._nome || !this._email || !this._fotoPerfil || !this._nac || !this._totalFollowers || !this._tipoDeConta || !this._urlUsuarioPublica || !this._urlUsuarioAPI) {
      return false;
    }
    return true;
   }

 
   get id() {
     return this._id;
   }
 
   get nome() {
     return this._nome;
   }
 
   get email() {
     return this._email;
   }
 
   get fotoPerfil() {
     return this._fotoPerfil;
   }
 
   get nac() {
     return this._nac;
   }
 
   get totalFollowers() {
     return this._totalFollowers;
   }
 }
 

