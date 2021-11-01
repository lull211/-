const getMovies=require ('./getMovies.js')
const fs=require ('fs');


//书写JSON对象
function writeJson(obj) {
 const jsonObj=JSON.stringify(obj);
 fs.writeFile("movies.json", jsonObj,function () {
  console.log("success!");
 });
}



getMovies().then(movies=>{
 writeJson(movies);
})

getMovies();
console.log(require("./movies.json"));
