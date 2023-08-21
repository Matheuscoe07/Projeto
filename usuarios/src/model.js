class Usuario {
   constructor(id, nome, email, fotoPerfil, nac, totalFollowers) {
     this._id = id;
     this._nome = nome;
     this._email = email;
     this._fotoPerfil = fotoPerfil;
     this._nac = nac;
     this._totalFollowers = totalFollowers;
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
 
module.exports = Usuario; // Exportar a classe