
// Defining a baseURL and key to as part of the request URL
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = '1ed26feafefb44c2b917c98e9d60c8b3';


// Grab references to all the DOM elements you'll need to manipulate
let searchTerm = document.getElementsByClassName('.search');
let startDate = document.getElementsByClassName('.start-date');
let endDate = document.getElementsByClassName('.end-date');
let searchForm = document.getElementsByClassName('form');
let submitBtn = document.getElementsByClassName('.submit');
let nextBtn = document.getElementsByClassName('.next');
let previousBtn = document.getElementsByClassName('.prev');
let section = document.getElementsByClassName('section');
let nav = document.getElementsByClassName('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
//nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
var pageNumber = 0;
var displayNav = false;

// Event listeners to control the functionality
searchForm.onclick = (event) => {
    e.preventDefault();
    //Assembling the full URL
    url = baseURL + '?apikey=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value;

    //Fetch the url value
    fetch(url).then(function (result) {
        return result.json();
    }).then(function (json) {
        displayResults(json);
    });

};

nextBtn.onclick = (event) => {
    pageNumber++;
    fetchResults(e);
};

previousBtn.onclick = (event) => {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
};


//Displaying the RESULTS
function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    var articles = json.response.docs;

    if (articles.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }

    if (articles.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'No results returned';
        section.appendChild(para);
    } else {
        for (var i = 0; i < articles.length; i++) {
            var article = document.createElement('article');
            var heading = document.createElement('h4');
            var link = document.createElement('a');
            var img = document.createElement('img');
            var para1 = document.createElement('p');
            //var para2 = document.createElement('p');
            var clearfix = document.createElement('div');

            var current = articles[i];
            console.log(current);

            link.href = current.web_url;
            link.textContent = current.headline.main;
            para1.textContent = current.lead_paragraph;
            //para2.textContent = 'Keywords: ';
            for (var j = 0; j < current.keywords.length; j++) {
                var span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' ';
                //para2.appendChild(span);
            }

            if (current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            clearfix.setAttribute('class', 'clearfix');

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(para1);
            article.appendChild(img);
            //article.appendChild(para2);
            article.appendChild(clearfix);
            section.appendChild(article);

        }
    }
};



//back to top

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



//Back To Up Pop-Up Function
//Automatically invoke scrollFunction() as soon as window is scrolled
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function displayNow() {

    //Assembling the full URL
    url = baseURL + '?apikey=' + key + '&page=' + pageNumber + '&q=' + 'tech';

    //Fetch the url value
    fetch(url).then(function (result) {
        return result.json();
    }).then(function (json) {
        displayResults(json);
    });

};

window.onload = function () {
    displayNow()
};