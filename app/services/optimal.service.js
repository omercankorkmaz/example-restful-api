const fetch = require("node-fetch-commonjs");

const getRoster = async () => {

    const countriesRes = await fetch('http://127.0.0.1:3000/countries/?region=MEA');
    const countries = await countriesRes.json();

    console.log(countries);

    let regionsAndReqs = {};
    countries.forEach(country => { // country: { name: string, region: string }
        if (!regionsAndReqs[country.region]) {
            regionsAndReqs[country.region] = { 
                countries: [country.name] 
            }
        } else {
            let countries = [...regionsAndReqs[country.region].countries, country.name];
            regionsAndReqs[country.region] = {
                ...regionsAndReqs[country.region],
                countries,
            }
        }
    }); 

    Object.values(regionsAndReqs).forEach((val) => { // val: { countries: [] }
        let countOfCountries = val.countries.length; 
        val.minSalesReq = Math.ceil(countOfCountries / 7);
    })

    // if there is a better solution i'd like to see
    // cuz the following code has (O ^ 3) complexity
    Object.values(regionsAndReqs).forEach((val) => { // val: { countries: [], mingSalesReq: number }
        val.countOfCountriesEachRep = new Array(val.minSalesReq).fill(0);
        let countOfCountries = val.countries.length; 
        while(countOfCountries !== 0) {
            for (let index = 0; index < val.countOfCountriesEachRep.length; index++) {
                val.countOfCountriesEachRep[index] += 1;
                countOfCountries -= 1;
                if (countOfCountries === 0) break;
            }
        }
    })

    let repsList = [];
    Object.entries(regionsAndReqs).forEach(([key, val]) => { // val: { countries: [], mingSalesReq: number, countOfCountriesEachRep: [] }
        val.countOfCountriesEachRep.forEach(countOfCountryEachRep => {
            let repObj = {}
            repObj.region = key;
            repObj.countryList = val.countries.splice(0, countOfCountryEachRep);
            repObj.countryCount = countOfCountryEachRep;
            repsList.push(repObj)
        })
    })

    return repsList;
}

module.exports = {
    getRoster,
}