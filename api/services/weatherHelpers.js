require("../utils/utils");



//default amount of decimals for conversions
var defaultFixed = 1;


/* ---------------------------------- Fucntions to  convert data units --------- */

function multiplyRatio(ratio, value, fixed) {
	fixed = fixed || defaultFixed;
	return (value*ratio).toFixed(fixed);
}

exports.MmtoInch = multiplyRatio.curry(0.0393700787);
exports.CmtoInch = multiplyRatio.curry(0.393700787);
exports.KphtoMph = multiplyRatio.curry(0.621371192);


/**
* Celsius to Farentheit 
*/
exports.CtoF = function(value, fixed) {
	fixed = fixed || defaultFixed;
	return (value * 1.8 + 32).toFixed(fixed);
}

/**
* Farentheit to Celsius 
*/
exports.FtoC = function(value, fixed) {
	fixed = fixed || defaultFixed;
	return (value - 32 * 5 / 9).toFixed(fixed);
}




/* ------------------------------------ Constnts to manipulate weather data ---------------*/
/* If used in other modules, should be on sails.config.constants */


// COnvert functions according to unit
var convertFunctions = {
	'c' : exports.CtoF,
	'mm': exports.MmtoInch,
	'cm': exports.CmtoInch,
	'kph': exports.KphtoMph
}


// COnvert functions according to unit
var unitConverted = {
	'c' : 'f',
	'mm': 'inch', 
	'mm': 'inch',
	'kph': 'mph'
}

//groups of weather type
var weatherGroups = {
	temperature: {"ATE":1, "AHT":1, "ALT":1, "HRT":1, "LRT":1, "VHD":1, "VCD":1},
	rain: {"APR":1, "DWR":1, "HRM":1, "DWP":1, "LRM":1},
	snow: {"ASN":1, "DWS":1},
	wind: {"AWS":1},
	sun: {"SUN":1},
	humidity: {"AHU":1, "MHU":1, "EHU":1}
}


 







/* ---------------------------------- Fucntions to format weather data to render and logic --------- */


/**
* Expands weather data and converts to the right unit
*/
exports.formatWeatherData = function(data, unit, month) {
	var convertUnits = unit && unit.toLowerCase() != 'c',
		sorted,
		thisMonthRanking,
		dataToShow,
		i,
		average,
		sum,
		convertFunction,
		convertUnit,
		object_data = {};
		// console.log(convertFunctions);

	_.each(data, function(item) {
		item.data = _.map(item.data.split(','), function(val) { return parseInt(val, 10) });
		sorted = [];
		dataToShow = [];
		sum = 0;
		convertFunction = convertFunctions[item.unit];
		//if we need to convert
		if (convertUnits && convertFunction) dataToShow = exports.convertAllUnitsToF(item, item.unit);

		//create the sorted array
		_.each(item.data, function(it, index) {
			sorted.push({month: index, value: it});
			sum += it;
		});

		//sort by value
		sorted.sort(function(a, b) { return a.value < b.value ? -1 : 1 });
		
		//if month we look for its ranking
		//TODO ver si se requiere hacerlo en todas o se puede hacer mas adelante n los casos q lo requieran
		if (month) {
			for (var i = 0; i < 12; i++) {
				if (sorted[i].month == month) {
					thisMonthRanking = i+1;
					break;
				}
			} 
		}


		//get minMonths and MaxMonths
		var initmonth = 0,
			minMonths = [sorted[0].month];
		while (sorted[initmonth].value == sorted[initmonth+1].value) {
			initmonth++;
			minMonths.push(sorted[initmonth].month);
		}

			initmonth = 11;
		var maxMonths = [sorted[11].month];
		while (sorted[initmonth].value == sorted[initmonth-1].value) {
			initmonth--;
			maxMonths.push(sorted[initmonth].month);
		}


		item = _.extend(item, {
			min: sorted[0].value,
			max: sorted[11].value,
			minMonth: minMonths,
			maxMonth: maxMonths,
			thisMonthRanking: thisMonthRanking,
			sortedData: sorted,
			average: sum / 12,
		});
		item.variation = item.max - item.min;
		item.variationPercent = item.min > 0 ? Math.round((item.max / item.min -1) * 100) : null;

		// console.log(convertFunction);
		if (convertUnits && convertFunction) {
			item.converted = {
				min: convertFunction(item.min),
				max: convertFunction(item.max),
				data: dataToShow.length ? dataToShow : item.data,
				variation: convertFunction(item.variation),
				average: convertFunction(item.average),
				unit: unitConverted[item.unit]
			}
		}

		object_data[item.type_code] = item;
	});
	
	//devuelve la imagen procesada
	return object_data;
}



/**
* Converts all units to the F unit dataset
* @param item: array of data of some weather type
*/
exports.convertAllUnitsToF = function(item, unit) {
	var length = item.data.length, 
		converted =[],
		convertFunction = convertFunctions[unit.toLowerCase()],
		i;

		//if an array or object walk every item and retunr
		if (typeof item == 'object') {
			for (i = 0; i < length; i++) {
				converted.push(convertFunction(item.data[i]));
			}
			return converted;
		} else {
			//convert just value
			return convertFunction(item);
		}

}


/**
* Converts a list of cities containing average data for taht city to F units if needed
*/
exports.convertCities = function(data, unit) {
	var thisdata, 
		i, 
		len;
		
	if (unit != 'c') {
			len = data.length;
			for ( i = 0; i < data.length; i++) {
					thisdata = data[i];
					thisdata.converted = {
						temp_avg: weatherHelpers.CtoF(thisdata.temp_avg),
						temp_min_avg: weatherHelpers.CtoF(thisdata.temp_min_avg),
						precipitation_avg: weatherHelpers.MmtoInch(thisdata.precipitation_avg)
					};
			}
	}
	return data;
}



/**
* Generates groups of data to be rendered in graphs
*/
exports.formatGraphData = function(show, formattedData, unit) {
	var data = _.extend({}, formattedData),
		byGroups = getDataGroups(data),
		groups = [],
		tempGroup = {},
		count,
		method = show == 'weather' ? generateGraphWeather : generateGraphMonth;

		// console.log(byGroups);
		method();

	return groups;


	/* Generates group graph for "month" show action */
	function generateGraphMonth() {

		addItemIfExits("ATE", "temperature");
		if (data.ALT || data.ART) {
			addItemIfExits("ALT", "temperature");
			addItemIfExits("AHT", "temperature");
		} else if (data.LRT || data.HRT) {
			addItemIfExits("LRT", "temperature");
			addItemIfExits("HRT", "temperature");
		}
		addAndResetTempGroup();
		
		addItemIfExits("SUN", "sun");
		addAndResetTempGroup();

		addItemIfExits("APR", "rain");
		addItemIfExits("HRM", "rain");
		addItemIfExits("LRM", "rain");
		addAndResetTempGroup();

		addItemIfExits("VHD", "temperature");
		addItemIfExits("VCD", "temperature");
		addAndResetTempGroup();

		addItemIfExits("LRT", "temperature");
		addItemIfExits("HRT", "temperature");
		addAndResetTempGroup();

		addItemIfExits("DWR", "rain");
		addItemIfExits("DWP", "rain");
		addAndResetTempGroup();

		addItemIfExits("ASN", "snow");
		addItemIfExits("DWS", "snow");
		addAndResetTempGroup();

		addItemIfExits("AHU", "humidity");
		addItemIfExits("MHU", "humidity");
		addItemIfExits("EHU", "humidity");
		addAndResetTempGroup();

		addItemIfExits("AWS", "wind");
		addAndResetTempGroup();
	}

	

	/* Generates group graph for "weather" show action */
	function generateGraphWeather() {

		//Temperature graph and anexes	
		if (byGroups.temperature.count > 1) {
			groups.push(addAllGroup('temperature'));
		} else if (byGroups.temperature.count == 1) {
			
			var tempKey = byGroups.temperature.items[0];
			tempGroup[tempKey] = addItem(tempKey, 'temperature'); 

			if (byGroups.sun.count == 1) {
				tempGroup.SUN = addItem("SUN", 'sun');
			} else if (byGroups.rain.count == 1 && byGroups.humidity.count != 1) {
				tempKey = byGroups.rain.items[0];
				tempGroup[tempKey] = addItem(tempKey, 'rain'); 
			} else if (byGroups.humidity.count == 1) {
				tempKey = byGroups.rain.items[0];
				tempGroup[tempKey] = addItem(tempKey, 'humidity'); 
			} else if (byGroups.wind.count == 1) {
				tempGroup.AWS = addItem("AWS", 'wind');
			}
		}

		addAndResetTempGroup();

		count = byGroups.rain.count;
		if (count > 1) {
			groups.push(addAllGroup('rain'));
		} else if (count == 1) {
			tempKey = byGroups.rain.items[0];
			tempGroup[tempKey] = addItem(tempKey, 'rain'); 

			if (byGroups.humidity.count == 1) {
				tempKey = byGroups.rain.items[0];
				tempGroup[tempKey] = addItem(tempKey, 'humidity');
			} else if (byGroups.wind.count == 1) {
				tempGroup.AWS = addItem("AWS", 'wind');
			}
		}

		addAndResetTempGroup();

		//TODO: validar si snow es 0
		if (byGroups.snow.count) {
			groups.push(addAllGroup('snow'));
		}

		count = byGroups.humidity.count;
		if (count > 1) {
			groups.push(addAllGroup('humidity'));
		} else if (count == 1) {
			tempKey = byGroups.humidity.items[0];
			tempGroup[tempKey] = addItem(tempKey, 'humidity');

			if (byGroups.sun.count == 1) {
				tempGroup.SUN = addItem("SUN", 'sun');
			} else if (byGroups.wind.count == 1) {
				tempGroup.AWS = addItem("AWS", 'wind');
			}
		}

		addAndResetTempGroup();

		if (byGroups.wind.count) {
			tempGroup['AWS'] = addItem('AWS', 'wind');
			if (byGroups.sun.count) {
				tempGroup['SUN'] = addItem('SUN', 'sun');
			}
		}
		
		addAndResetTempGroup();

		if (byGroups.sun.count) {
			groups.push(addAllGroup('sun'));
		}
	}


	/* Agrega un item al tempgroup si existe */
	function addItemIfExits(key, type) {
		var item = addItem(key, type);
		if (item) tempGroup[key] = item;
	}

	/* Agrega el tempGroup al objeto que se va a decolver finalmente si no esta vacio.
	* Resetea el tempGroup */
	function addAndResetTempGroup() {
		if (Object.keys(tempGroup).length) {
			groups.push(tempGroup);
		}
		tempGroup = {};
	}

	/** Genera y devuelve un objeto con todos los items que existan de un tipo de clima. Ej: temperature */
	function addAllGroup(type) {
		var response = {};
		for (var i in weatherGroups[type]) {
			if (data[i]) {
				response[i] = addItem(i, type);
			}
		}
		return response;
	}

	/* Genera un item en caso de que exista la key requerida. 
	* Para que no se pueda ejecutar dos veces, deletea la key en la copia del data con el que trabajamos.
	* Y resta en el count de cada tipo de clima si ya se utilizo esta key */
	function addItem(key, type) {
		if (!data[key]) return null;
		var item = (unit != 'c' && data[key].converted) ? data[key].converted : data[key];
		// When an item is added, we delete the item from data, and rest from the group type count
		delete data[key];
		if (type) {
			byGroups[type].count--;
		} 
		return {unit: item.unit, data: item.data};
	}

}




/* Counts by weather groups how many items we have for each type 
* @param data: data as its sent to the template, after formatting by weatherhelpers.formatWeatherData
*/
function getDataGroups(data) {
	var groups = {
		temperature: {count: 0, items: []},
		rain: {count: 0, items: []},
		snow: {count: 0, items: []},
		wind: {count: 0, items: []},
		sun: {count: 0, items: []},
		humidity: {count: 0, items: []}
	}

	for (var i in data) {
		for (var ii in weatherGroups) {
			if (weatherGroups[ii][i]) {
				groups[ii].count++;
				groups[ii].items.push(i);
				break;
			}
		}
	}
	return groups;
}



exports.getClimateType = function(data) {
	var climate = {
		tempItem : data.ATE || data.AHT || data.ALT || null,
		tempModifier : 1,
		
	},
		avg;

	//select temperature item
	if (!data.ATE) {
		if (data.AHT) {
			climate.tempModifier -= 0.2;
		} else if (data.ALT) {
			climate.tempModifier += 0.2
		}	
	} 

	if (climate.tempItem) {
		//distinguish climate type by temperature
		avg = climate.tempItem.average * climate.tempModifier;
		if (avg > 20) {
			climate.type = "warm";
		} else {
			climate.type = avg >= 10 ? "temperate" : "cold";
		}

		//if have seasons by temperature
		climate.seasons_temperature = climate.tempItem.variation > 9;
	}

	//select precipitations item
	if (data.APR) {
		avg = data.APR.average;
		climate.precItem = data.APR;
		if (avg > 200) {
			climate.precipitation_type = "tropical";
		} else if (avg > 100) {
			climate.precipitation_type = "rainy";
		} else if (avg > 40) {
			climate.precipitation_type = "medium";
		} else if (avg <= 40) {
			climate.precipitation_type = "desert";
		}
		climate.seasons_precipitation = data.APR.variationPercent >= 150 || (data.APR.min < 20 && data.APR.max > 60);
	} else {
		if (data.DWR || data.DWP) {
			climate.precItem = data.DWR || data.DWP;
			climate.seasons_precipitation = climate.precItem.variationPercent >= 150 || (climate.precItem.min == 0 && data.APR.max > 4);
		}
	}

	// determine wheter the rainy seasons are cold or warm
	if (climate.seasons_precipitation && climate.tempItem && climate.seasons_temperature) {
		var monthTempRanking = getMonthRanking(climate.tempItem, climate.precItem.minMonth, climate.precItem.maxMonth);
		climate.minMaxMonths = [climate.precItem.minMonth, climate.precItem.maxMonth];
		climate.monthTempRanking = monthTempRanking;
		if (monthTempRanking.min < 3) {
			climate.season_min_precipitation = "cold";
		} else if (monthTempRanking.min > 8) {
			climate.season_min_precipitation = "warm";
		}

		if (monthTempRanking.max < 3) {
			climate.season_max_precipitation = "cold";
		} else if (monthTempRanking.max > 8) {
			climate.season_max_precipitation = "warm";
		}

	}

	return climate; 

}


/** Gets the ranking of this month inside a weather item **/
function getMonthRanking(dataItem, minMonth, maxMonth) {
	if (typeof minMonth !== 'object') minMonth = [minMonth];
	if (typeof maxMonth !== 'object') maxMonth = [maxMonth];
	console.log(minMonth);
	console.log(maxMonth);
	var obj = {min: NaN, max: NaN},
		month;
	for (var i = 0; i < 12; i++) {
		month = dataItem.sortedData[i].month;
		if (minMonth.inArray(month)) {
			obj.min = isNaN(obj.min) ? i : Math.min(i, obj.min);
		} else if (maxMonth.inArray(month)) {
			obj.max = isNaN(obj.max) ? i : Math.max(i, obj.max);
		}
	} 
	return obj;
}

/** Gets the ranking of this month inside a weather item **/
function getSingleMonthRanking(dataItem, minMonth, maxMonth) {
	for (var i = 0; i < 12; i++) {
		if (dataItem.sortedData[i].month == month) {
			return i;
		}
	} 
}