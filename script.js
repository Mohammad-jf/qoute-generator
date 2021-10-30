const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteBtn = document.querySelector("#new-quote");
const RandomQuoteBtn = document.querySelector("#random-quote");




//hello
// get quote from api
async function getQuote(){
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        //fetching the data
        const response = await fetch(apiUrl);
        const data = await response.json();
        random();
        
        //itorate throw data
        function quoteItoretor(data){
            let nextIndex = 0;
            return{
                next:function(){
                    return nextIndex < data.length ?
                    {value:data[nextIndex++],done:false}:
                    {done:true}
                }
            }
        }
        const quotes = quoteItoretor(data);
        
        


        RandomQuoteBtn.addEventListener("click",random);
        //get random quote
        function random(){
            let randomNumber = Math.floor(Math.random()*data.length);
            quoteText.innerText = data[randomNumber].text;
            if(data[randomNumber].author===null){
                quoteAuthor.innerText = 'unknown'
            }else{
                quoteAuthor.innerText = data[randomNumber].author;
            }

            //reduce the font size
            if(data[randomNumber].text.length>100){
                quoteText.classList.add('long-quote')
            }else{
                quoteText.classList.remove('long-quote');
            }
        }
        
        
        //adding new quotes to ui by click on the button
        quoteBtn.addEventListener('click',next);

        function next(){
            //getting next quote
            myQoute = quotes.next().value;
            quoteText.innerText = myQoute.text;
            if(myQoute.author===null){
                quoteAuthor.innerText ='unknown';
            }else{
                quoteAuthor.innerText = myQoute.author;
            }
           
            //r font size
            if(myQoute.text.length>100){
                quoteText.classList.add('long-quote')
            }else{
                quoteText.classList.remove('long-quote');
            }
        }
    }
    catch(err){
        alert(err)
    }       
}


//tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//twitter Btn eventlistener
twitterBtn.addEventListener('click',tweetQuote)

//on load
getQuote();