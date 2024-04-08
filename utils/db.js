import mysql from "mysql";

 export const con=mysql .createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbms"
    
})

con.connect(function(err){
    if(err) {
    console.log("error")
    }
    else{
    console.log("connected")
    }
})

export default con