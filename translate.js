'use strict';
var dictmap
//import 'regenerator-runtime/runtime';
console.log("test");
fetch('https://nushuscript.org/nsbzzzd/table.json')
.then((response) => response.json())
.then((res) => {
    dictmap = buildIndex(res);
    console.log("finish build");
    var exp = dictmap["爸"];
    console.log(exp[0][1]);
}).catch((err) => {
    console.log(err);
});


function buildIndex(dictarr) {
	return dictarr.reduce(function(obj, x) {
		var id = x[0], romanization = x[1], chars = x[2];
		for (var i = 0, n = chars.length; i < n; i++) {
			var oldVal = obj[chars[i]];
			if (!oldVal)
				obj[chars[i]] = [[id, romanization]];
			else
				obj[chars[i]].push([id, romanization]);
		}
		return obj;
	}, {});
}

const apiKey = "1038ccab-2dec-1077-374a-18efa7755745:fx"; //Your Deepl api key;
async function translate(text) {
    const res = await fetch(
      `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
        text
      )}&target_lang=zh`
    );
    const json = await res.json();
    //return json.translations[0].text.split(" ");
    return json.translations[0].text;
 }
 function createImg(input) {
	var id = input[0], romanization = input[1];
	var img = document.createElement('img');
	img.src = 'https://nushuscript.org/nsbzzzd/img/' + id + '.png';
    console.log(id, romanization);
	return img;
	//return 'https://nushuscript.org/nsbzzzd/img/' + id + '.png';
}
/*
var text="desk";
fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
      text
    )}&target_lang=zh`)
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        return res.translations[0].text;
    }).then((trans) => {
        console.log(trans);
        trans.split('').map(function(ch) {
            var chars = dictmap[ch];
            if (chars) {
                console.log(chars[0]);
                console.log(createImg(chars[0]));
            }
        });
    }).catch((err) => {
        console.log(err);
    });
*/
     

function handleConvert() {
        console.log("in");
        document.getElementById('outputArea').innerHTML = '';
        const text = document.getElementById('inputArea').value;
        console.log(text);
        translate(text).then((trans) => {
            console.log(trans);
            trans.split('').map(function(ch) {
                document.getElementById('outputArea').appendChild(document.createTextNode(ch));
                var chars = dictmap[ch];
                if (chars) {
                    console.log(chars[0]);
                    console.log(createImg(chars[0]));
                    document.getElementById('outputArea').appendChild(createImg(chars[0]));
                }
            });
            document.getElementById('outputArea').focus();
        }).catch((err) => {
            console.log(err);
        });
}
