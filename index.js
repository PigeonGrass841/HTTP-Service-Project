/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
/*
(1) Programs use: 
HTTP GET requests to get or display the requested item in the array.
HTTP POST requests to push new items into the array.
HTTP PUT requests to put or replace items in the array.
HTTP DELETE requests to delete items in the array.
(2) I learned about how to use HTTP GET, POST, PUT, and DELETE requests to manipulate arrays.
(3) The project can be further extended by creating additional arrays or adding more functions.
*/
const express = require("express");
const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    res.send("Started localhost 3000 ...");
});

const genres = [
    {id:1, genre: "alternative"}, 
    {id:2, genre: "blues"}, 
    {id:3, genre: "classical"}, 
    {id:4, genre: "country"}, 
    {id:5, genre: "dance"}, 
    {id:6, genre: "electronic"}, 
    {id:7, genre: "folk"}, 
    {id:8, genre: "hip hop"}, 
    {id:9, genre: "industrial"}, 
    {id:10, genre: "jazz"}, 
    {id:11, genre: "karaoke"}, 
    {id:12, genre: "latin"}, 
    {id:13, genre: "new age"}, 
    {id:14, genre: "opera"}, 
    {id:15, genre: "pop"}, 
    {id:16, genre: "reggae"}, 
];

const songs = [
    {genre: "alternative", id: 1, name:"steampunk"}, 
    {genre: "blues", id: 2, name:"acoustic blues"}, 
    {genre: "classical", id: 3, name:"baroque"}, 
    {genre: "country", id: 4, name:"bluegrass"}, 
    {genre: "dance", id: 5, name:"dubstep"}, 
    {genre: "electronic", id: 6, name:"chiptune"}, 
    {genre: "folk", id: 7, name:"filk"}, 
    {genre: "hip hop", id: 8, name:"bounce"}, 
    {genre: "industrial", id: 9, name:"noise"}, 
    {genre: "jazz", id: 10, name:"ragtime"}, 
    {genre: "karaoke", id: 11, name:"duet"}, 
    {genre: "latin", id: 12, name:"bossa nova"}, 
    {genre: "new age", id: 13, name:"healing"}, 
    {genre: "opera", id: 14, name:"verismo"}, 
    {genre: "pop", id: 15, name:"brit"}, 
    {genre: "reggae", id: 16, name:"raggamuffin"}, 
];

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/api/home', (req, res)=> {
    res.send("These are the available musical genres.");
});

app.get('/api/home/genres', (req, res)=> {
    res.send(genres);
});

app.get('/api/home/genres/:genre', (req, res)=> {
    const gExist = genres.find(g=> g.genre === req.params.genre);

    if (!gExist) {
        res.send("Genre does no exist.");
    }
    else {
        if (!found(genres.find(g=> g.genre).id)) {
            res.send("There are no songs in this genre. Use POST to enter more songs");
        }
        else {
            res.send(gSongs(gExist.genre));
        }
    }
});

app.get('/api/home/songs', (req, res)=> {
    res.send(songs);
});



//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post("/api/home/genres/:genre/:sName", (req, res)=> {
    const gExist = genres.find(g=> g.genre === req.params.genre);
    if (!gExist){
        res.send(req.params.genre + " does not exist");
    }
    else {
        const sExist = songs.find(s=> s.name === req.params.sName && s.genre === gExist.genre);
        if (sExist){
            res.send(req.params.sName + " already exists for the given genre");
        }
        else {
            const song = {
                genre: gExist.genre,
                id: numSongs(gExist.genre) + 1,
                name: req.params.sName,
            }
            songs.push(song);
            res.send(song);
        }
    }
});

app.post("/api/home/genres/:nGenre", (req, res)=> {
    const gExist = genres.find(g=> g.genre === req.params.nGenre);
    if(!gExist){
        var gCount = genres.length;
        const addGenre = {
            id: gCount + 1,
            genre: req.params.nGenre,
        };
        genres.push(addGenre);
        res.send(addGenre);
    }
    else{
        res.send(req.params.nGenre + " already exists");
    }
});

//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put("/api/home/genres", (req, res)=> {
    const gExist = genres.find(g=> g.id === parseInt(req.body.rId));
    if(!gExist){
        res.send(req.body.rId + " genre does not exist.");
    }
    else{
        var temp = genres[req.body.rId - 1].genre;
        genres[req.body.rId - 1].genre = req.body.nGenre;
        for(song of songs){
            if(song.genre == temp){
                song.genre = req.body.nGenre;
            }
        }
        res.send(genres);
    }
});

//=========== ROUTES FOR HTTP DELETE REQUESTS ==========

app.delete('/api/courses/:id', (req, res)=> {
    const cExist = courses.find(c=> c.id === parseInt(req.params.id));
    if (!cExist) {
        res.status(404).send("The course with the given ID does not exist.");
    }
    else {
        if (req.body.id != req.params.id) {
            res.send("The request ID is not the same as the JSON ID!")
        }
        else {
            var rCourse = courses.find(c => c.id == req.params.id)
            courses.splice(courses.indexOf(rCourse), 1);
            res.send(courses);
        }
    }  
});


app.listen(3000, () => {
    console.log('Listening on port 3000 ...')
})

function found(id){
    const sExist = songs.find(s=> s.id === parseInt(id));
    if(!sExist){
        return false;
    }
    else{
        return true;
    }
}

function gSongs(name){
    var songList = [];
    for(song of songs){
        if(song.genre == name){
            songList.push(song);
        }
    }
    return songList;
}

function sortSongs() {
    songs.sort(function(song0, song1) {
        const genre0 = song0.genre.toLowerCase();
        const genre1 = song1.genre.toLowerCase();

        if (genre0 > genre1) {
            return 1;
        }
        if (genre0 < genre1) {
            return -1;
        }
        return 0;
    });
}

function numSongs(gName) {
    var count = 0;
    for (song of songs) {
        if (song.genre == gName) {
            count++;
        }
    }
    return count;
}
