//1. setting up dependancies
const express =require('express');
const app = express();
const mysql = require('mysql2')
const dotenv = require('dotenv')


// // 4.CONFIGURE ENVIRONMENTAL VARIABLES

dotenv.config();

//  //5. CREATING CONNECTION OBJECT(important part)
 const db = mysql.createConnection(
   {
      host:process.env.DB_HOST,
       user:process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME
  }
);


// // 6. Check if const db Connection works

 db.connect((err) =>{
  //  // doesnt connect
   if(err){ return console.log("Error connecting to mysql database")};
// // does connect
   console.log("connected to mysql successfully as id:",db.threadId)
 });


// 3.. to see if it works on browser- basic endpoint
 //app.get('/data' , (req, res)  =>{
 //  res.send("hello world, how are you feeling thank you")
 //});

// Question 1  Retrieve all patients


app.get('/get-patients', (req, res) => {
  const getPatients = "SELECT * FROM patients"
  db.query(getPatients, (err, results) => {
      // have an error
      if(err) {
          return res.status(500).send("Failed to fetch the patients")
      }
      // get back the data/results
      res.status(200).send(results)
  })
})


// Question 2 Retrieve all providers
app.get('/get-providers',(req,res)=>{
  const getProviders = ' SELECT first_name,last_name,provider_specialty FROM Providers'
  db.query( getProviders,(err,data)=>{
    if(err){
      return res.status(400).send('Failed to retrieve results',err)
    }
    res.status(200).send(data)
  });
});


//Question  3 Filter patients by First Name
app.get('/get-patients', (req,res)=>{
const getPatients = 'SELECT first_name FROM Patients'
db.query(getPatients, (err,data)=>{
  if(err){
    return res.status(400).send('Failed to get data',err)
  }
  res.status(200).send(data)
});
});


// Question 4 Retrieve all providers by their specialty

app.get('/get-providers', (req, res) => {
  const getProviders = 'SELECT provider_specialty,first_name  FROM providers ORDER BY provider_specialty '
    

  db.query(getProviders, (err, data) => {
    if (err) {
      return res.status(400).send('Failed to retrieve providers' , err);
    }
    res.status(200).send(data); 
  });
});

  
  


// 2.listen to the server
//const PORT = 3500
app.listen(3500, () => {
  console.log(`server is running on port 3500...`)
});
 
 
