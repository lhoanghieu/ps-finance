const request = require('request');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const model = require('./service/firebase/model');

module.exports = {
    vcbf: function(req, res, next){
        const vcbf_tbf_url = 'https://www.vcbf.com/quy-mo/gia-tri-tai-san-rong-nav-cua-cac-quy-mo/quy-dau-tu-can-bang-chien-luoc-vcbf-1/';
        const vcbf_bcf_url   = 'https://www.vcbf.com/quy-mo/gia-tri-tai-san-rong-nav-cua-cac-quy-mo/quy-dau-tu-co-phieu-hang-dau-vcbf-1/';

        // Co phieu hang dau
        let bcf = 0;
        // Can bang chien luoc
        let tbf = 0;
        _getValueTBF(vcbf_tbf_url, function(temp){
            tbf = temp;
            _getValueBCF(vcbf_bcf_url, function(temp2){
                bcf = temp2;
                model.add(bcf,tbf);
            });

        });

        res.send({errors: false, message: 'successful'});
        next();

        function _getValueTBF(url, cb) {
            request(url, function (error, response, body) {
                let dom = new JSDOM(body);
                let value = dom.window.document.querySelector(".valign-middle tr:last-child").childNodes;
                let i = 1;

                Array.from(value).forEach(function (item) {
                    if (item.outerHTML) {
                        let temp = new JSDOM(item.outerHTML).window.document.querySelector('p');
                        if (temp && i === 4) {
                            let str = temp.outerHTML.replace('<p>', '').replace('</p>', '').replace(',', '');
                            cb(parseFloat(str));
                        }
                    }
                    i++;
                })
            });
        }

        function _getValueBCF(url, cb) {
            request(url, function (error, response, body) {
                let dom = new JSDOM(body);
                let value = dom.window.document.querySelector(".valign-middle tr:last-child").childNodes;
                let i = 1;
                Array.from(value).forEach(function (item) {
                    if (item.outerHTML && i === 4) {
                        let temp = item.outerHTML.replace('<td style="border-color: #bcbcbc; border-style: solid; border-width: 1px; text-align: center;">','').replace('</td>','').replace(',', '');
                        if (temp) {
                            cb(parseFloat(temp));
                        }
                    }
                    i++;
                })
            });
        }
    }
};