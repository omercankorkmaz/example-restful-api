const fetch = require("node-fetch-commonjs");

const getAllRequirements = async () => {
    
    const countriesRes = await fetch('http://127.0.0.1:3000/countries');
    const countries = await countriesRes.json();

    let regionsAndReqs = {};
    countries.forEach(country => { // country: { name: string, region: string }
        if (!regionsAndReqs[country.region]) {
            regionsAndReqs[country.region] = { 
                region: country.region, 
                count: 1, 
            }
        } else {
            regionsAndReqs[country.region] = {
                ...regionsAndReqs[country.region],
                count: regionsAndReqs[country.region].count + 1,
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