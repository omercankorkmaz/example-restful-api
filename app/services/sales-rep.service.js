const fetch = require("node-fetch-commonjs");

const { capitalizeFirstLetter } = require('../utils/casing');
const BaseError = require('../utils/base-error');

const getAllRequirements = async () => {
    
    const countriesURL = 'http://127.0.0.1:3000/countries';

    const countriesRes = await fetch(countriesURL);
    if (countriesRes.status !== 200) {
        throw new BaseError({
            statusCode: countriesRes.status,
            statusText: countriesRes.statusText,
            message: countriesURL,
        })
    }

    const countries = await countriesRes.json();
    if (!countries || countries.length === 0) {
        throw new BaseError({
            statusCode: 404,
            statusText: 'Not Found',
            message: 'No countries found',
        })
    }

    let regionsAndReqs = {};
    countries.forEach(country => { // country: { name: string, region: string }
        const Newregionname = capitalizeFirstLetter(country.region)
        if (!regionsAndReqs[Newregionname]) {
            regionsAndReqs[Newregionname] = { 
                region: country.region, 
                count: 1, 
            }
        } else {
            regionsAndReqs[Newregionname] = {
                ...regionsAndReqs[Newregionname],
                count: regionsAndReqs[Newregionname].count + 1,
            }
        }
    });

    Object.values(regionsAndReqs).forEach((val) => {
        val.minSalesReq = Math.ceil(val.count / 7);
        val.maxSalesReq = Math.floor(val.count / 3);
        delete val.count;
    })

    return Object.values(regionsAndReqs).map((val) => val);

}

module.exports = {
    getAllRequirements,
}