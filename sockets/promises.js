const userLeft = false;
const userWatchingCatMeme = false;
const CatMeme = true;

function watcTutorialCallback() {
    return new Promise((resolve, reject)=>{
        if(userLeft){
            reject({
                name : "User Left",
                message : ":("
            })
            
        }else if(userWatchingCatMeme){
            reject({
                name : "User Watching Cat Meme",
                message : 'WebDeevSomplified < Cat'
            })
        }else if(CatMeme) {
            setTimeout(() =>{
                resolve('i am good')

            } , 2000)

        }
        else{
            resolve('Thumbs up and Subscribe')

        }
        
    })
}


watcTutorialCallback().then((res) =>{
console.log(res)
}).catch((err) =>{
console.log(err.name)
console.log(err.message)
}).finally(() =>{
    console.log("welldone, you just completed the above task")
})

// the new Promise returns a promise object
// it accepts a callback function as a parameter
//this callback parameter acccepts two optional args namely the resolve and the reject function 
// the reject function triggers if the promise fails while the resolve function triggers if the promise is a success

// it is worthy to note that inside the new promise function it contains the producing code.

// how do we consume this promises
// this is where the then and the catch method comes in 
// they are both methods derived from the promise
//we can chain the .then and the .catch nethod
// we also have the .finally method that runs by default and it independent of the other methods

const myFunction = () =>{
    return new Promise((resolve, reject)=>{

        if(userLeft){
            reject({
                name : "wisdom",
                age : 34
            })

        }else if(userWatchingCatMeme){
            reject({
                name : "znella",
                age : 56
            })

        }else{
            resolve("All Good you can Proceed");
        }

    })
}

myFunction().then((res) =>{
console.log("Affrimative information : " , res)
}).catch((res) =>{
console.log("My information: ", res)
})

const loaderFunction = () =>{


    return new Promise((resolve,reject) =>{
        resolve();
        reject();


    })
}

loaderFunction((res) => {
    console.log(res)

}).then((res) =>{
    console.log(res)

}).catch((res)=> {
    console.log(res)
})