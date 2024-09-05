function getQuoteFromAPI(funcName){
    var url = 'https://api.quotable.io/random';
    $.get(url, function(data){
        data.date = moment().format('yyyy-MM-DD');
        saveQuote(data);

        if(funcName){
            funcName();
        }
    });
}

function loadQuote(){
    var quote = getQuote();
    if(quote.length > 0){
        //cek apakah quote diambil hari ini...
        if(quote.date == moment().format('yyyy-MM-DD')){
            //jika diambil hari ini, maka tidak perlu perbarui quote..
            $("#quotes").html(quote.content);
            $("#author").html(quote.author);
            
        }
        else{
            //jika diambil kemarin, perbarui quote hari ini...
            getQuoteFromAPI(loadQuote);
        }
    }
    else{
        getQuoteFromAPI(loadQuote);
    }
}
loadQuote();

function getQuote() {
    const quote = localStorage.getItem('quote');
    return quote ? JSON.parse(quote) : [];
}

// Save clocks to localStorage
function saveQuote(quote) {
    localStorage.setItem('quote', JSON.stringify(quote));
}