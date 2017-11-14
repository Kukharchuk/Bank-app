//require("./style.css");
//document.write(require("./content.js"));

import Chart from 'chart.js';
import React from 'react';
import ReactDOM from 'react-dom';
//var ReactDOM = require('react-dom')

// if (typeof window !== 'undefined') {
//     window.React = React;
// }



var table = document.getElementById("table");
var graph = document.getElementById("graph");

table.addEventListener("click", function(){
	table.classList.toggle("active");
	grapf.classList.toggle("active");
	createTable();
	document.getElementById("grapfroot").style.display = "none";
	document.getElementById("tableroot").style.display = "block";
});

grapf.addEventListener("click", function(){
	table.classList.toggle("active");
	grapf.classList.toggle("active");
		document.getElementById("grapfroot").style.display = "block";
	document.getElementById("tableroot").style.display = "none";
});


var btnShowResult = document.getElementById("showResult");
btnShowResult.addEventListener("click", showOnGrapf);


function showOnGrapf(){
	var currency = 298;
	var startDate = document.getElementById("startID").value;
	var endDate = document.getElementById("endID").value;
    var currencyNow = document.getElementById("currencyNow").value;
	if("RUB" != currencyNow  &&  currencyNow == "USD"){currency = 145}
		else {currency = 292}
	var date = [];
	var rate = [];
	var xhr = new XMLHttpRequest();

		xhr.open('GET', 'http://www.nbrb.by/API/ExRates/Rates/Dynamics/'+currency+'?startDate=' + startDate + '&endDate=' + endDate, true);
		xhr.onload = function(){
			var data = JSON.parse(xhr.responseText);
			console.log(data);
			for(var i in data){
				date.push(data[i].Date.substr(0, data[i].Date.length - 9));
				rate.push(data[i].Cur_OfficialRate.toFixed(3))
			}

		var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(
			document.getElementById("myChart"),{
			"type":"line",
			"data":{"labels":date,
					"datasets":[{
								"label":"Rate",
								"data":rate,
								"fill":false,
								"borderColor":"rgb(75, 192, 192)",
								"lineTension":0.1
							    }]
					},
		    "options":{}
		});
			};
			xhr.send();



};



function createTable(){
	var table = document.getElementById("currTable");
	var startDate = document.getElementById("startID").value;
	var endDate = document.getElementById("endID").value;

	

//	table.innerHTML = "<tr><td>usd</td></tr>"


	var addColumn = document.getElementById("addColumn");
	addColumn.addEventListener("click", function(){
			var startDate = document.getElementById("startID").value;
	var endDate = document.getElementById("endID").value;
		var selectCurr = document.getElementById("currencyNowTable").value;

		var currency = 298;
		if("RUB" != selectCurr  &&  selectCurr == "USD"){currency = 145}
		else {currency = 292}
		var date = [];
		var rate = [];
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://www.nbrb.by/API/ExRates/Rates/Dynamics/'+currency+'?startDate=' + startDate + '&endDate=' + endDate, true);
		xhr.onload = function(){
			var data = JSON.parse(xhr.responseText);
			console.log(data);
			for(var i in data){
				date.push(data[i].Date.substr(0, data[i].Date.length - 9));
				rate.push(data[i].Cur_OfficialRate.toFixed(3))
			}

			table.innerHTML += '<tbody><tr><th>' + selectCurr+'</th>';
			for (var d in date) {
				console.log(date[d])
			    table.innerHTML += '<td>'+date[d]+'</td><td>'+ rate[d]+'</td>';
			}
			table.innerHTML += '</tr></body>';

					
		}
		xhr.send();

	})
};




document.getElementById("saveGrapf").addEventListener("click", function(){
   var url = document.getElementById("myChart").toDataURL("image/jpg");
   window.location.href=url; 
})



var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(
	document.getElementById("myChart"),{
	"type":"line",
	"data":{"labels":["January","February","March","April","May","June","July"],
			"datasets":[{
						"label":"My First Dataset",
						"data":[1,1.5,2],
						"fill":false,
						"borderColor":"rgb(75, 192, 192)",
						"lineTension":0.1
					    }]
			},
    "options":{}
});

