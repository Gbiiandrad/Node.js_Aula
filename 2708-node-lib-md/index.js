import fs from 'fs';
import chalk, { chalkStderr } from 'chalk';

// para teste de espressão regulares


function extraiLinks (texto) {
    const regex = / \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\) /gm;

    const capturas = [...texto.matchAll(regex)];

    
    const resultados = capturas.map (capturas => ( { [capturas[1]]: [capturas[2]] }) );

    return resultados;
}

// Caso o arquivo não for encontrado "Mensagem de erro"
function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red (erro.code, 'Não há arquivo no diretório') );  //lançar algo

}

// asysnc / await: 
async function pegaArquivo(caminhoDoArquivo) {

    try {
        
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    
      console.log (extraiLinks(texto));
    } 

    catch (erro) {
        trataErro(erro);
    }
}


 pegaArquivo('./arquivos/texto.md'); // certo
