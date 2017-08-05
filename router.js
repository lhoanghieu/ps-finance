const request = require('request');

const jsdom = require('jsdom');
const jsdomo = require('jsdom/lib/old-api');
const { JSDOM } = jsdom;

const model = require('./service/firebase/model');

module.exports = {
    vcbf_tbf: function(req, res, next){
        const vcbf_balance = 'https://www.vcbf.com/quy-mo/gia-tri-tai-san-rong-nav-cua-cac-quy-mo/quy-dau-tu-can-bang-chien-luoc-vcbf-1/';

        request(vcbf_balance, function (error, response, body) {
            const dom = new JSDOM(body);
            const value = dom.window.document.querySelector(".valign-middle tr:last-child").childNodes;
            Array.from(value).forEach(function (item) {
                if (item.outerHTML) {
                    var temp = new JSDOM(item.outerHTML).window.document.querySelector('p');
                    if (temp) {
                        console.log(temp.outerHTML);
                    }
                }
            })
        });
        res.send({errors: false, message: 'successful'});
        next();
    },

    vcbf_bcf: function(req, res, next){
        const vcbf_stock   = 'https://www.vcbf.com/quy-mo/gia-tri-tai-san-rong-nav-cua-cac-quy-mo/quy-dau-tu-co-phieu-hang-dau-vcbf-1/';

        request(vcbf_stock, function (error, response, body) {
            const dom = new JSDOM(body);
            const value = dom.window.document.querySelector(".valign-middle tr:last-child").childNodes;
            Array.from(value).forEach(function (item) {
                if (item.outerHTML) {
                    var temp = new JSDOM(item.outerHTML).window.document.querySelector('p');
                    if (temp) {
                        console.log(temp.outerHTML);
                    }
                }
            })
        });
        res.send({errors: false, message: 'successful'});
        next();
    },

    test_firebase: function(req, res, next){
        // bcf, tbf
        model.add('18,341.30', '30,122.64');
        res.send({errors: false, message: 'successful'});
        next();
    }
};