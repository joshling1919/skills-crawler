var express = require('express');
var fs = require('fs');
var rp = require('request-promise');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  var options = {
    uri: 'https://www.indeed.com/jobs?q=software+engineer&l=San+Francisco+Bay+Area%2C+CA&fromage=1',
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  var companyPostings = [];
  rp(options)
    .then(function($) {
      var linkObj = $('a.turnstileLink').not('.jobtitle').not('.slNoUnderline');
      Object.keys(linkObj).forEach(function(key) {
        var link = linkObj[key];
        if (link.attribs && link.attribs.href.startsWith('/rc')) {
          companyPostings.push(`https://www.indeed.com/${link.attribs.href}`);
        }
      });
      console.log(companyPostings);
    })
    .catch(function(err) {
      console.log('Error occured');
      console.log(err);
    });



 
});

app.listen('8081');

console.log('Server up on 8081');

exports = module.exports = app;