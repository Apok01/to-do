module.exports.getDate = getDate;


function getDate() {

    let today = new Date();
        

        // ..getDay() = del 0 al 6 el dia en el que estás
        // .getDate() = numero del dia
    let options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };
    
        let day = today.toLocaleDateString(!"en-US", options);

    return day;
}



// mismo codigo, distinta declaracion 


exports.getDay = function() {

    let today = new Date();
        

        // ..getDay() = del 0 al 6 el dia en el que estás
        // .getDate() = numero del dia
    let options = {
            weekday: "long"
        };
    
return today.toLocaleDateString(!"en-US", options);
}