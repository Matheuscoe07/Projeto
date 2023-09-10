const originalJson = 
 
 // Crie uma cópia do objeto JSON excluindo a propriedade 'tokens'
 const { tokens, ...novoJson } = originalJson;
 
 console.log(novoJson);