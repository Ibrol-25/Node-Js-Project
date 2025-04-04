
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())

const Article = require("./models/Article")




mongoose
.connect("mongodb+srv://ibroo:ibroo123@cluster0.rwllu0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected successfully")
}).catch((error)=>{
    console.log("error with connecting with the DB")
})



//mongodb+srv://ibroo:<db_password>@cluster0.rwllu0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.get("/numbers",(req,res)=>{

    let numbers =""
    for(let i=0; i <= 100;i++){
        numbers += i +"-";
    }

    res.send(`The Numbetrs are : ${numbers} `)
})

app.get("/test",(req,res)=>{
    res.send(
        "you viseted Oromiya"
    )
})
app.post("/addComment",(req,res)=>{
    res.send("you add Comment to my country Oromiya")
})

app.get("/websiteFile",(req,res)=>{

    let numbers =""
    for(let i=0; i <= 100;i++){
        numbers += i +"-";
    }

    // res.sendFile(__dirname + "/view/numbers.html")
    // res.send(__dirname + "/view/numbers.html")
    res.render("numbers.ejs",{
        name : "Ibroo",
        numbers:numbers
    });
})

app.get("/findSumation/:number1/:number2",(req,res)=>{

    let num1 = req.params.number1
    let num2 = req.params.number2

    total = Number(num1) + Number(num2)

    console.log(req.params)
    res.send(`${total}`)
})

app.get("/sayHello/",(req,res)=>{

    // console.log(req.body)
    // console.log(req.query)

    // res.send(`Hello ${req.body.name},age is ${req.query.age}`)

    res.json({
        name:req.body.name,
        age:req.query.age,
        language:"Oromifaa"
    })
})

app.delete("/testingDelete",(req,res)=>{
    res.send("visiting delete request")
})

//==================================== Articles ===============

app.post("/articles",async(req,res)=>{

    const newArticle = new Article()

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody
    
    newArticle.title = artTitle
    newArticle.body = artBody
    newArticle.nuberOfLikes = 0

    await newArticle.save()

    res.send(" the new articles has been stored ");
})

app.get("/articles", async(req,res)=>{

   const articles = await Article.find();
   console.log("the articles are",articles)
   res.json(articles);
});

app.get("/articles/:articleId", async(req,res)=>{
    const id = req.params.articleId

    try{

        const article = await Article.findById(id);
        return res.json(article);
        
    }catch(error) {

        console.log("error while reading article of id",id)
        return res.send("error");
    }
 });
 
 app.delete("/articles/:articleId", async(req,res)=>{
    const id = req.params.articleId;

    try{
        const article = await Article.findByIdAndDelete(id);
        return res.json(article);
        
    }catch(error) {

        console.log("error while reading article of id",id)
        return res.send("error");
    }
 });


app.listen(3000,()=>{
    console.log("am listening at port 3000")
})

//================== Back End Website Build ======

app.get("/showArticles",async(req,res)=>{
    const articles = await Article.find()

    res.render("articles.ejs",{
        allArticles:articles
    })
})