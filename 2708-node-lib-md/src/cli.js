#!/usr/bin/env node

//biblioteca de colorir texto no terminal

import chalk from "chalk";

import fs from 'fs';

import pegaArquivo from "./index.js";

import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, indentificador = '') {

    if(valida){
        console.log(
            chalk.yellow('Lista Validada'),
            chalk.black.bgGreen(indentificador), 

            await listaValidada(resultado));

    } else {
        console.log(
            chalk.yellow('Lista de links:'),
            chalk.black.bgGreen(indentificador),    
            resultado);
    }

}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida'; // para trazer o "--valida"



    try {
        fs.lstatSync(caminho);

    } catch (erro) {

        if (erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
        }
    }


    if( fs.lstatSync(caminho).isFile() ) {
        
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
    }

    else if (  fs.lstatSync(caminho).isDirectory() ) {
        const arquivos = await fs.promises.readdir(caminho);

        arquivos.forEach( async (nomeDeArquivo) => {
            const lista = await pegaArquivo( `${caminho}/${nomeDeArquivo}` );

            imprimeLista(valida, lista, nomeDeArquivo);
        });
    }

}
processaTexto(caminho);



