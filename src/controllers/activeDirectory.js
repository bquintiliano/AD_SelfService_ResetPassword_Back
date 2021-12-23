const activeDirectory = require ('@davistran86/ad')
const configAd = require ('../config/ad.json')

const ad = new activeDirectory ({
        url: configAd.url,
        user: configAd.user,
        pass: configAd.pass
});

module.exports = ad