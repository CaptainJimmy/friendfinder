var express = require('express');
var router = express.Router();

//data
var celebs = [{
    name: "Wil Weaton",
    url: "https://twitter.com/wilw",
    scores: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1],
    id: "wil"
}, {
    name: "Shia LeBeouf",
    url: "https://twitter.com/thecampaignbook",
    scores: [1, 2, 5, 1, 3, 2, 2, 1, 3, 2],
    id: "shia"
}, {
    name: "Kim Kardashian",
    url: "https://twitter.com/KimKardashian",
    scores: [2, 2, 2, 2, 4, 1, 3, 2, 5, 5],
    id: "kim"
}, {
    name: "Taylor Swift",
    url: "https://twitter.com/taylorswift13",
    scores: [3, 3, 4, 2, 2, 1, 3, 2, 2, 3],
    id: "taylor"
}, {
    name: "Barack Obama",
    url: "https://twitter.com/barackobama",
    scores: [4, 3, 4, 1, 5, 2, 5, 3, 1, 4],
    id: "obama"
}, {
    name: "Bronson Pinchot",
    url: "https://twitter.com/bronsonap",
    scores: [4, 4, 2, 3, 2, 2, 3, 2, 4, 5],
    id: "bronson"
}]

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'FriendFinder'
    });
});

//restful api route for results
router.get('/results/:id/:diff', (req, res, next) => {
    var requestedID = req.params.id;
    var difference = req.params.diff;
    for (var i = 0; i < celebs.length; i++) {
        if (celebs[i].id === requestedID) {
            console.log(celebs[i].name + " " + celebs[i].url);
            res.render('results', {
                title: 'FriendFinder Results:' + celebs[i].name,
                matchName: celebs[i].name,
                matchURL: celebs[i].url,
                diff: difference
            });
        }
    }
})

//form post processing
router.post('/submit', function(req, res, next) {
    var MATCH;
    console.log(JSON.stringify(req.body));
    var matchCalc = [];
    var userScore = [];
    for (var i = 0; i < req.body.name.length; i++) {
        userScore.push(parseInt(req.body.name[i]));
    }

    for (var j = 0; j < celebs.length; j++) {
        var diffTotal = 0;
        for (var k = 0; k < 10; k++) {
            var diffScore = Math.abs(celebs[j].scores[k] - userScore[k]);
            diffTotal += diffScore;
            //console.log(differenceTotal)
        }
        matchCalc.push({
            name: celebs[j].id,
            diff: diffTotal
        });

    }
    var maxDiff = 40;
    console.log(JSON.stringify(matchCalc));
    matchCalc.map(function(data){
    	if (data.diff < maxDiff) {
    		maxDiff=data.diff
    	}
    });
    MATCH=matchCalc.filter(function(res){ return res.diff == maxDiff});
    console.log(MATCH);
	console.log(MATCH[0].name);
	console.log(MATCH[0].diff);
   
    return res.redirect(encodeURI('/results/'+MATCH[0].name+'/'+MATCH[0].diff));
});
module.exports = router;