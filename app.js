const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

console.log(date);

const app = express();
//let items =["uno","dos","tres"];
let workItems = [];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true });

//------------------------------------------- MONGO SCHEMA/MODEL

const itemSchema = new mongoose.Schema ({
    dataItem:{
        type: String
        //required: [true, "Necesary an String"]
    } 
});
const Item = mongoose.model("Item", itemSchema);


// const item1 = new Item({
//      dataItem: "1"
// });
// const item2 = new Item({
//     dataItem: "2"
// });
// const item3 = new Item({
//     dataItem : "3"
// });
let defaultItems = [];


// Item.insertMany(defaultItems, (err)=>{
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully inserted = " + defaultItems);
//     }
// })
// ------------------------------------------ HOME


app.get("/", function(req,res){

//---------------------------------------------------Find items DB
Item.find({}, (err, foundItems)=>{
    if (err){
        console.log(err);
    } else {
        defaultItems = foundItems;
    //    console.log(defaultItems);

    }
});

let day = date.getDate();
   res.render("list", {listTitle: day,newListItems: defaultItems});
   console.log(day);
});


//-------------------------------------------------POST
app.post("/", (req,res)=>{
    // console.log(req.body);
    // let item = req.body.newItem
    // if (req.body.list === "Work"){
    //     workItems.push(item);
    //     res.redirect("/Work");
    // }else{
    //     defaultItems.push(item);
    //     res.redirect("/");
    // }

    let itemName = req.body.newItem;
    console.log(itemName);
    const item1 = new Item ({
        dataItem: itemName
    });
    console.log(item1);
    item1.save();
    res.redirect("/");
});

// ---------------------------------------------- WORK

app.get("/work", (req,res)=>{
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});
app.post("/work",(req,res)=> {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/Work");
});

//-------------------------------------------------- ABOUT

app.get('/about', (req,res)=>{
    res.render('about');
});
app.post('/delete', (req, res)=>{
   if (res.body.checkbox !== (undefined)){
        let checkedItemId = (req.body.checkbox).replace(/\s/g, '');
        console.log(checkedItemId + ".");
        Item.findByIdAndRemove(checkedItemId, (err)=>{
            if (err){
                console.log(checkedItemId);
                console.log(err);
            } else {
                console.log("Succesfully Removed id: " + checkedItemId);
            }
   });
}});


//---------------------------------------------------- 404

/*app.use((req,res, next) => {
    res.status(404).render('error404');
    console.log(res.statusCode);
})
*/
app.get('*', function(req, res){
  res.render('error404');
});




//-----------------------------------------------------Server UP
app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});


