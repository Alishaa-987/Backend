import express from 'express';
// 1st method
const app = express();
// ap koi bhe name rakh sakte hoo app ke jaga



// fronted and backend is running on same server but on diffrerent port
app.listen('4000' , ()=>{         // we use 4000 not 3000 bcz fronted use 3000 you can use whatever you want
    console.log("Server is running on port 4000")
})


app.get('/user' , (req , res)=>{
   console.log("hello users")
   res.json("hello")
})


// 2nd mehtod
// function express(){
//     console.log("Express is running")
// }
console.log("Hello world")