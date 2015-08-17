
CITY

W.request : {
	action: 'city',
	show: 'month',
	month: 8, // or undefined
	id: //name_id
}

W.location: {
	type: 'city',
	name: 'cityname',
	name_id: 'city_name_id',		
	parent: 'region_name',
	parent_name_id: 'region_name_id',
	parent_type: '',
	grandparent: 'country_name',
	grandparent_name_id: 'country_name_id'
	grandparent_type: '',
	(item)_id: 'city_id', //or region or country
}



PARA PLACE-LINK


// e habla de este objeto
obj 
// me habal de los parents
base
//request me habla del request
request