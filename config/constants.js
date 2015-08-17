/* Constants for the site
*
* Avialibale sails.config.constants.author
*/

module.exports.constants = {
    name: 'weather',
    author: 'mbenedetto',

    // default context for the app
    defaultCtx : {lang: 'en', unit: 'c', abs: {}, events: { sh: [] } },

    // cookie name where we'll store the session information
	cookieName : 'w_ctx',

	// possible languages
	languages : ['es', 'en', 'pt'],


	/*
	* Questions allowed that can be sitemaped
	*/
	questions: { 
		/////////////Nieve
		"N": {
		   example: "Nieva en %s",
		   allowsMonth: true,
		   neededInfo: ['ASN', 'DWS']
		},
		"CN": {
		   example: "Cuanto nieva en %s",
		   allowsMonth: true,
		   neededInfo: ['ASN', 'DWS']
		},
		"CDN": {
		   example: "Cuantos días nieva en %s",
		   allowsMonth: true,
		   neededInfo: ['DWS']
		},
		"CCN": {
		   example: "Cada cuanto nieva en %s",
		   allowsMonth: true,
		   neededInfo: ['DWS']
		},
		//////////////////////Lluvia
		"L": {
		   example: "Llueve en %s",
		   allowsMonth: true,
		   neededInfo: ['APR', 'DWR', 'DWP', 'LRM', 'HRM']
		},
		"CL": {
		   example: "Cuanto llueve en %s",
		   allowsMonth: true,
		   neededInfo: ['APR', 'DWR', 'DWP']
		},
		"CDL": {
		   example: "Cuantos días llueve en %s",
		   allowsMonth: true,
		   neededInfo: ['DWR', 'DWP']
		},
		"CCL": {
		   example: "Cada cuanto llueve en %s",
		   allowsMonth: true,
		   neededInfo: ['DWR', 'DWP']
		},
		"SC": {
		   example: "Es seco el climo %s",
		   allowsMonth: true,
		   neededInfo: ['APR', 'DWR', 'DWP', 'LRM', 'HRM', 'AHU', 'MHU', 'EHU']
		},
		////////////////////////Temperatura
		"T": {
		   example: "Qué temperatura hace en %s",
		   allowsMonth: true,
		   neededInfo: ['ATE', 'AHT', 'ALT']
		},
		"TP": {
		   example: "Cual es la temperatura promedio en %s",
		   allowsMonth: true,
		   neededInfo: ['ATE', 'AHT', 'ALT']
		},
		"CFMIT": {
		   example: "Cual fue la minima temperatura en %s (o cual fue el record) (o el dia mas caluroso)",
		   allowsMonth: true,
		   neededInfo: ['LRT']
		},
		"CFMAT": {
		   example: "Cual fue la máxima temperatura en %s (o cual fue el record de temperatura) (o el dia mas frio)",
		   allowsMonth: true,
		   neededInfo: ['HRT']
		},

		//////////////////// Frio
		"HF": {
		   example: "Hace frio en %s",
		   allowsMonth: true,
		   neededInfo: ['ATE', 'AHT', 'ALT', 'LRT']
		},
		"QTF": {
		   example: "Que tanto frío puede hacer en %s",
		   allowsMonth: true,
		   neededInfo: ['ATE', 'AHT', 'ALT', 'LRT']
		},

		//////////////////////// Calor
		"HC": {
		   example: "Hace calor en %s",
		   allowsMonth: true,
		   neededInfo: ['ATE', 'AHT', 'ALT', 'HRT']
		},
		"QTC": {
		   example: "Que tanto calor puede hacer en %s",
		   allowsMonth: true,
		   neededInfo: ['AHT', 'HRT', 'ATE']
		},

		///////////////////////// Humeda
		"H": {
		   example: "(cuanta) Hay humedad en %s",
		   allowsMonth: true,
		   neededInfo: ['AHU', 'MHU', 'EHU']
		},
		"CLH": {
		   example: "El clima es humedo en %s",
		   allowsMonth: true,
		   neededInfo: ['AHU', 'MHU', 'EHU', 'APR']
		},

		///////////////////////// Horas de sol
		"CLS": {
		   example: "Cuanta luz de sol hay en %s",
		   allowsMonth: true,
		   neededInfo: ['SUN']
		},
		"CHL": {
		   example: "Cuantas horas de luz hay en %s",
		   allowsMonth: true,
		   neededInfo: ['SUN']
		},

		///////////////////////////// Viento
		"V": {
		   example: "Cuanto viento hay en en %s (o hay viento en, o es ventoso el clima en)",
		   allowsMonth: true,
		   neededInfo: ['AWS']
		},
		//////////////////////////////El mes mas ... del año
		"MV": {
		   example: "Cual es el mas ventoso del año en %s",
		   allowsMonth: false,
		   neededInfo: ['AWS']
		},
		"MC": {
		   example: "Cual es el mas caluros del año en %s",
		   allowsMonth: false,
		   neededInfo: ['AHT', 'HRT', 'ATE']
		},		
		"MF": {
		   example: "Cual es el mas frio del año en %s",
		   allowsMonth: false,
		   neededInfo: ['AHT', 'HRT', 'ATE']
		},
		"MH": {
		   example: "Cual es el mas humedo del año en %s",
		   allowsMonth: false,
		   neededInfo: ['AHU', 'MHU', 'EHU', 'APR']
		},
		"ML": {
		   example: "Cual es el mas lluvioso del año en %s",
		   allowsMonth: false,
		   neededInfo: ['APR', 'DWR', 'DWP']
		},
		"MN": {
		   example: "Cual es el mes que mas nieva en %s",
		   allowsMonth: false,
		   neededInfo: ['ASN', 'DWS']
		}

	},

	/* 
	* i18n texts exposed to the client by default on layout
	* this var is passed by the template to helpers.exportsTranslationsToClient
	* This can be overriden in each controller, passing the clientTexts to the view
	*/
	clientTranslations: ["Welcome", "logOut"]
						.concat(expandNumberedTranslations('Month_Long_'))
						.concat(expandNumberedTranslations('Month_Short_')),

	/*
	* Groups weather data types
	*/
	weatherGroups : {
		sun: ["SUN"],
		temperature: ["ATE", "AHT", "ALT", "HRT", "LRT", "VHD", "VCD"],
		humidity: ["EHU", "MHU", "AHU"],
		precipitations: ["APR", "DWR", "DWP", "LRM", "HRM"],
		snow: ["ASN", "DWS"],
		wind: ["AWS"]
	}
}


/* 
* Generates an array of keys with prefix and numbers to pass to translations.
* Like month_0, month_1
* @param prefix: like month_
* @param start: number, by default 0
* @param end: number, by default 11, because of months
*/

function expandNumberedTranslations(prefix, start, end) {
	var i, arr = [];
	start = start || 0;
	end = end || 11;

	for (i = start; i <= end; i++) {
		arr.push(prefix + i);
	}

	return arr;
}