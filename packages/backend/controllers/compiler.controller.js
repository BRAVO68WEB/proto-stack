const Compiler = require('../models/compiler.model');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const controller = new AbortController();
const { nanoid } = require('napi-nanoid')

async function CreateCompiler(req, res, next) {
    await fs.writeFileSync(nanoid(), req.body.code);

    if(req.body.language === 'js') {
        const ls = spawn('node', ["./" + req.body.filename , ">", "test"],{
            detached: true,
        });

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            process.kill(ls.pid)
        });

        ls.stderr.on('data', (data) => {
            controller.abort();
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
    });}
    else if(req.body.language === 'py') {
        const ls = spawn('python3', ["./" + req.body.filename],{
            detached: true,
        });
    
        ls.stdout.on('data', (data) => {
            process.kill(ls.pid)
            console.log(`stdout: ${data}`);
        });
    
        ls.stderr.on('data', (data) => {
            controller.abort();
        });
    
        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
    else if(req.body.language === 'java') {
        const ls = spawn('javac', [req.body.filename],{
            detached: true,
        });
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            process.kill(ls.pid)
        });
    
        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            controller.abort();
        });
    
        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        const lsC = spawn('java', [`${req.body.filename.split('.')[0]}`],{
            detached: true,
        })
        lsC.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            process.kill(lsC.pid)
        });
    
        lsC.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
            controller.abort();
        });
    
        lsC.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });    
    }
    res.send('ok');
}

module.exports = {
    CreateCompiler,
}