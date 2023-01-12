import fs from 'fs';
import chalk, { chalkStderr } from 'chalk';

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
    
        console.log(chalk.green (texto)); // lembrando q o chalk é para colocar a cor 
    } 

    catch (erro) {
        trataErro(erro);
    }
}


pegaArquivo('./arquivos/texto.md'); // certo
pegaArquivo('./arquivos/'); // para a mensagem de erro
