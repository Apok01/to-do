const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

console.log(date);

const app = express();
let workItems = [];
let defaultItems = [];
let day = date.getDate();


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



//---------------------------------------------------Find items DB
function foundItems(){
Item.find({}, (err, foundItems)=>{
    if (err){
        console.log(err);
    } else {
        defaultItems = foundItems;
        console.log(defaultItems);
        }
})};
foundItems();
// ------------------------------------------ HOME

app.get("/", function(req,res){

//---------------------------------------------------Find items DB
    foundItems();
    res.render("list", {listTitle: "Today",newListItems: defaultItems});

});


//-------------------------------------------------POST
app.post("/", (req,res)=>{
    
    const itemName = req.body.newItem;

    
    console.log("Item Name: "+ itemName);
    const item = new Item ({
        dataItem: itemName
        });
    item.save();
    console.log("Item 1: "+item);
    foundItems();
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

//=--------------------------------------------------DELETE
app.post('/delete', (req, res)=>{
   if (req.body.checkbox !== (undefined)){
        let checkedItemId = (req.body.checkbox).replace(/\s/g, '');
        Item.findByIdAndRemove(checkedItemId, (err)=>{
            if (err){
                console.log(checkedItemId);
                console.log(err);
            } else {
                console.log("Succesfully Removed id: " + checkedItemId);
                foundItems();

                res.redirect("/");
            }
   });
}});


//---------------------------------------------------- 404

app.get('*', function(req, res){
  res.render('error404');
});




//-----------------------------------------------------Server UP
app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});


// Item.insertMany(defaultItems, (err)=>{
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully inserted = " + defaultItems);
//     }
// })





// console.log(req.body);
    // let item = req.body.newItem
    // if (req.body.list === "Work"){
    //     workItems.push(item);
    //     res.redirect("/Work");
    // }else{
    //     defaultItems.push(item);
    //     res.redirect("/");
    // }





    // const item1 = new Item({
//      dataItem: "1"
// });
// const item2 = new Item({
//     dataItem: "2"
// });
// const item3 = new Item({
//     dataItem : "3"
// });