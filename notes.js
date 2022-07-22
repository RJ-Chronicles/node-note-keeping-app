// const  getNotes = function(){
//     return 'Your notes..';
// }

// function getNotes(){
//     return 'Your notes..';
// }
const { default: chalk } = require('chalk');
const fs = require('fs');


const addNote = (title, body)=>{
    const notes = loadNotes();
    const duplicateTitle = notes.filter((note)=>{
        return note.title === title;
    });
    //duplicateTitle.length === 0
    const duplicateNote = notes.find((note) => note.title === title);
    debugger
    if(! duplicateNote){
        console.log("Adding your note to json file")
        const note ={
            title: title,
            body: body
        };
        
        notes.push(note);
        console.log(notes);
        saveNotes(notes);
    }else{
        console.log(chalk.red.bgBlueBright("Note title taken"));
    }

}

const removeNote = (title) =>{
    console.log("inside removing  : "+ title)
    const notes = loadNotes();
    const newNotes = notes.filter((note)=>{
        return note.title !== title;
    })
    if(newNotes.length < notes.length){
         console.log(chalk.red('Note Removed...!'))
         saveNotes(newNotes);
    }else{
        console.log(chalk.red.inverse(`note with title ${title} not found`));
    }
    // const isExistTitle = notes.filter((note)=>{
    //     return note.title === title;
    // })
    // console.log(isExistTitle);
    // if(isExistTitle.length > 0){
    //     console.log('title found : will remove soon');
    //     const newNotes = notes.filter((note)=>{
    //         return note.title !== title;
    //     })
    //     console.log(chalk.red('Note Removed...!'))
    //     saveNotes(newNotes);
    // }else{
    //     console.log('title not found ')
    // }
}

const listMyNotes = ()=>{
    const notes = loadNotes();
    if(notes.length <= 0){
        console.log(chalk.red.bold('List is Empty'));
    }else{
        console.log(chalk.green(`Your notes`))
        notes.forEach( note => {
            console.log(chalk.bgBlue.bold(`title ${note.title} : body ${note.body}`));
        });
    }
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data;
    }catch(err){
        return [];
    }
    
}
const findNote = (title)=>{
    const notes = loadNotes();
    const myNote = notes.find((note)=> note.title=== title);
    if(myNote){
        console.log(`your note ${myNote.body}`);
    }else{
        console.log(chalk.red.inverse('no note found'));
    }
}
const saveNotes =(notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}



module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listMyNotes : listMyNotes,
    findNote : findNote
}