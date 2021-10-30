const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteBtn = document.querySelector("#new-quote");
const RandomQuoteBtn = document.querySelector("#random-quote");
let data = [];


//eventListeners
twitterBtn.addEventListener('click',tweetQuote)
RandomQuoteBtn.addEventListener("click",random);




// get quote from api
async function getQuote(){
    try{
      fetch('data.json').then((response)=>{
          response.json().then(json=>{
              data = json;
              random();
          })
      })
    }
    catch(err){
        alert(err)
    }       
}


function randomNumber(){
    let randomNumber = Math.floor(Math.random()*data.length);
    return randomNumber
}

//get random quote
function random(){
    const number = randomNumber();
    quoteText.innerText = data[number].text;
    if(data[number].author===null){
        quoteAuthor.innerText = 'unknown'
    }else{
        quoteAuthor.innerText = data[number].author;
    }


    //reduce the font size
    if(data[number].text.length>100){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote');
    }
}



//tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}



getQuote();