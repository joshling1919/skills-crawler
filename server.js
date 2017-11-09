var express = require('express');
var fs = require('fs');
var rp = require('request-promise');
var cheerio = require('cheerio');
var request = require('request');
var app = express();


app.get('/', function(req, res){
  // Smaller test case:
  // https://www.indeed.com/jobs?q=software+engineer&l=San+Francisco+Bay+Area%2C+CA&fromage=1&start=610
  var options = {
    uri: 'https://www.indeed.com/jobs?q=software+engineer&l=San+Francisco+Bay+Area%2C+CA&fromage=1',
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  var companyPostings = [];
  var doneGatheringLinks = false;

  function grabLinks() {
    return rp(options).then(function ($) {
      if (!doneGatheringLinks) {
        var currentPage = $('.pagination').find('b');
        console.log(`On page: ${currentPage['0'].firstChild.data}`);
        var linkObj = $('a.turnstileLink').not('.jobtitle').not('.slNoUnderline');
        Object.keys(linkObj).forEach(function (key) {
          var link = linkObj[key];
          if (link.attribs && link.attribs.href.startsWith('/rc')) {
            companyPostings.push(`https://www.indeed.com/${link.attribs.href}`);
          }
        });

        var nav = $('.np');
        var nextLink = nav['0'];
        if (nav['1']) {
          nextLink = nav['1'];
        } 
        
        if (nextLink.firstChild.data.slice(2, 10) === "Previous") {
          doneGatheringLinks = true;
        } else {
          options.uri = `https://www.indeed.com${nextLink.parent.parent.attribs.href}`;
        }
        return grabLinks();
      } else {
        return companyPostings;
      }
    })
  }

  grabLinks().then(function(links) {
    links.forEach(function(link, i) {
      console.log(`iteration: ${i}`);
      request(link, function(err, response, html) {
        console.log(`Error: ${err}`);
        console.log((`Response: ${html}`));

      });
    });
  }).catch(function(err) {
    console.log(err);
  })
});

app.listen('8081');

console.log('Server up on 8081');

exports = module.exports = app;