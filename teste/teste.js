// Funções assíncronas
async function asyncFunction1() {
   console.log("Início da asyncFunction1");
   await new Promise(resolve => setTimeout(resolve, 1000));
   console.log("Fim da asyncFunction1");
   await asyncFunction2();
   asyncFunction3();
}

async function asyncFunction2() {
   console.log("Início da asyncFunction2");
   await new Promise(resolve => setTimeout(resolve, 1000));
   console.log("Fim da asyncFunction2");
}

async function asyncFunction3() {
   console.log("Início da asyncFunction3");
   await new Promise(resolve => setTimeout(resolve, 1000));
   console.log("Fim da asyncFunction3");
}

// Funções síncronas
function syncFunction1() {
   return new Promise(resolve => {
       console.log("syncFunction1");
       resolve();
   });
}

function syncFunction2() {
   return new Promise(resolve => {
       console.log("syncFunction2");
       resolve();
   });
}

function syncFunction3() {
   return new Promise(resolve => {
       console.log("syncFunction3");
       resolve();
   });
}

// Chamada das funções
console.log("Começo do código");

asyncFunction1(); // Execução assíncrona, continua sem esperar
// syncFunction1(); // Execução síncrona, espera essa função concluir
// asyncFunction2(); // Execução assíncrona, continua sem esperar
// syncFunction2(); // Execução síncrona, espera essa função concluir
// asyncFunction3(); // Execução assíncrona, continua sem esperar
// syncFunction3(); // Execução síncrona, espera essa função concluir

console.log("Fim do código");
