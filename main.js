let submitBtn = document.getElementById("calculate-btn");
let emptyFieldMsg = document.getElementsByClassName("empty-field");
let invalidValMsg = document.getElementsByClassName("invalid-date");

submitBtn.addEventListener("click", ()=>{
    let isvalid = true;
    let items = [];
    items.push(document.getElementById("day"));
    items.push(document.getElementById("month"));
    items.push(document.getElementById("year"));

    let day_v = items[0].value;
    let month_v = items[1].value;
    let year_v = items[2].value;
    clearDisplay(items);
    for (let index = 0; index < items.length; index++) {
        let val = items[index].value;
        if (!val){
            display_error(items[index], 1, index)
            isvalid = false;
        }
        else if (val <= 0){
            display_error(items[index], 2, index)
            isvalid = false;
        }
    }
    isValid = validateDate(items[0], items[1], items[2]);
    if (isvalid){
        display_date(day_v, month_v, year_v)
    }
});

function display_date(day, month, year){
    let date = new Date();
    let year_v = date.getFullYear() - parseInt(year);
    let month_v = date.getMonth() - (parseInt(month) - 1);
    let day_v = date.getDate() - parseInt(day);
    
    if (day_v < 0) {
        month_v--;
        let previousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        day_v += previousMonth;
        }
        
        if (month_v < 0) {
            year_v--;
            month_v += 12;
            }
        document.getElementById("years").innerText = year_v;
        document.getElementById("months").innerText = month_v;
        document.getElementById("days").innerText = day_v;
}

function validateDate(day, month, year) {

    let day_v = parseInt(day.value);
    let month_v = parseInt(month.value);
    let year_v = parseInt(year.value);

    let date = new Date(year_v,month_v - 1,day_v);

    console.log(date);

    if (date.getFullYear() !== year_v){
        console.error("YEAR");
        display_error(year, 2, 0);
        return false;
    }
    if (date.getMonth() !== month_v -1){
        console.error("MONTH");
        display_error(month, 2, 0);
        return false;
    }
    if (date.getDate()!== day_v){
        console.error("DAY");
        display_error(day, 2, 0);
        return false;
    }
    return true;
}

function display_error(item, type, index){
    item.style.border = '1px solid var(--Light-red)';
    if (type == 1){
        emptyFieldMsg[index].style.display = 'block';
    }
    if(type == 2){
        invalidValMsg[index].style.display = 'block';

    }
}   


function clearDisplay(items){
    for (let index = 0; index < items.length; index++) {
        items[index].style.border = '1px solid var(--Light-grey)';
         emptyFieldMsg[index].style.display = 'none';
        invalidValMsg[index].style.display = 'none';
    }
}