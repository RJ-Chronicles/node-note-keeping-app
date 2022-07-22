const note = require('./notes')
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const { demandOption } = require('yargs');
const notes = require('./notes');
//import chalk from 'chalk';

//const operation = process.argv[2];
yargs.version('1.1.0');

//adding custom command to yargs
yargs.command({
    command:'add',
    description:'Add new note',
    builder:{
        title:{
            description:'Add Note',
            demandOption: true,
            type:'string' // provides empty string
        },
        body:{
            description:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler:function(argv){
        note.addNote(argv.title, argv.body);
    }
})

//create remove command ->node app.js remove
yargs.command({
    command:'remove',
    description:'Remove a note',
    builder:{
        title:{
            description:'Note title',
            demandOption: true
        }  
    },
    handler:function(argv){
        notes.removeNote(argv.title)
    }
})

//create list command ->node app.js list
yargs.command({
    command:'list',
    description:'list a notes',
    handler(){
        notes.listMyNotes();
    }
})

//create read command
yargs.command({
    command:'read',
    description:'Read a note',
    builder:{
        title:{
            describe : 'read a note',
            demandOption : true
        }
    },
    handler(argv){
        notes.findNote(argv.title);
    }
})

yargs.parse();

//console.log(yargs.argv);
