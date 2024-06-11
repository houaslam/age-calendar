let submitBtn = document.getElementById( "calculate-btn" );
let emptyFieldMsg = document.getElementsByClassName( "empty-field" );
let invalidValMsg = document.getElementsByClassName( "invalid-date" );

submitBtn.addEventListener( "click", (  )=>{
	let isvalid = true;


	let day = ( document.getElementById( "day" ) );
	let month = ( document.getElementById( "month" ) );
	let year = ( document.getElementById( "year" ) );


	clearDisplay( [day, month, year]);
	isvalid = check_empty(  day, month, year );
	if (isvalid)
		isvalid = check_value(  day, month, year );
	if (isvalid)
		isvalid = check_date(  day, month, year );
	if ( isvalid == true ){
	    display_date( day.value, month.value, year.value )
	}
} );

function check_empty(day, month, year){
	if (!day.value)
		return display_error(day, 1, 0);
	if (!month.value)
		return display_error(month, 1,1);
	if (!year.value)
		return display_error(year, 1, 2);
	return true;
}

function check_value(day, month, year){
	let nowYear = new Date().getFullYear();
	if (day.value <= 0 || day.value > 32)
		return display_error(day, 2, 0);
	if (month.value <= 0 || month.value > 13)
		return display_error(month, 2,1);
	if (year.value <= 0 || year.value > nowYear)
		return display_error(year, 2, 2);
	return true;
}

function check_date(day, month, year){
	let date = new Date(`${month.value}/${day.value}/${year.value}`);

	let res = date.getFullYear() === parseInt(year.value) && date.getMonth() + 1 === parseInt(month.value) && date.getDate() === parseInt(day.value);
	if (!res){
		display_error(day, 2, 0);
		display_error(month, 0, 1);
		return display_error(year, 0, 2);
	}
	return true;
}


function display_date( day, month, year ){
	let date = new Date(  );
	let year_v = date.getFullYear(  ) - parseInt( year );
	let month_v = date.getMonth(  ) - ( parseInt( month ) - 1 );
	let day_v = date.getDate(  ) - parseInt( day );
	
	if ( day_v < 0 ) {
		month_v--;
		let previousMonth = new Date( date.getFullYear(  ), date.getMonth(  ), 0 ).getDate(  );
		day_v += previousMonth;
		}
		
	if ( month_v < 0 ) {
			year_v--;
			month_v += 12;
		}
		document.getElementById( "years" ).innerText = year_v;
		document.getElementById( "months" ).innerText = month_v;
		document.getElementById( "days" ).innerText = day_v;
}


function display_error( item, type, index ){
	item.style.border = '1px solid var( --Light-red )';
	if ( type == 1 ){
		emptyFieldMsg[index].style.display = 'block';
	}
	if( type == 2 ){
		invalidValMsg[index].style.display = 'block';
	}
	return false;
}   

function clearDisplay( items ){
	for ( let index = 0; index < items.length; index++ ) {
		items[index].style.border = '1px solid var( --Light-grey )';
		 emptyFieldMsg[index].style.display = 'none';
		invalidValMsg[index].style.display = 'none';
	}
}