var request = require('request');
var secret = require("./secrets");
var fs = require("fs");
var argv = process.argv[2];
var argv1 = process.argv[3];
console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
	var options = {
		url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
		headers: {
			'User-Agent': 'request',
			'Authorization': secret.GITHUB_TOKEN
		}
	};

	request(options, function(err, res, body) {
		if (!err) {
			var data = JSON.parse(body);
		}
		cb(err, data);
	});
}

getRepoContributors(argv, argv1, function(err, result) {
	if (typeof(argv) == 'undefined' || typeof(argv1) == 'undefined') {
		console.log("please enter both repoOwner and repoName:");
	} else {
		for (i = 0; i < result.length; i++) {
			downloadImageByURL(result[i].avatar_url, "avatars/" + result[i].login + ".png");
		}
	}
	//	console.log("Errors:", err);
	//	console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
	request(url).pipe(fs.createWriteStream(filePath));
}
//url: 'https://avatars2.githubusercontent.com/u/2741?v=3&s=466',
//	filepath: 'avatars/kvirani.jpg'
//	.pipe(fs.createWriteStream(filePath)); // Note 4
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg")