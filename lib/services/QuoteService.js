const fetch = require('cross-fetch');

module.exports = class QuoteService {
  static async fetchQuotes() {
    // const quotes = [];
    // const programmingRes = await fetch(
    //   'https://programming-quotes-api.herokuapp.com/quotes/random'
    // );

    // const programmingData = await programmingRes.json();

    // const programmingQuote = {
    //   author: programmingData.author,
    //   content: programmingData.en,
    // };

    // const futuramaRes = await fetch(
    //   'https://futuramaapi.herokuapp.com/api/quotes/1'
    // );

    // const futuramaData = await futuramaRes.json();

    // const futuramaQuote = {
    //   author: futuramaData[0].character,
    //   content: futuramaData[0].quote,
    // };

    // const quotableRes = await fetch('https://api.quotable.io/random');

    // const quotableData = await quotableRes.json();

    // const quotableQuote = {
    //   author: quotableData.author,
    //   content: quotableData.content,
    // };

    // quotes.push(programmingQuote, futuramaQuote, quotableQuote);
    // console.log(quotes);
    // return quotes;

    const quoteLinks = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random',
    ];

    const quotesArr = Promise.all(quoteLinks.map((link) => fetch(link)))
      .then((quotes) => Promise.all(quotes.map((quote) => quote.json())))
      .then((jsonQuotes) => {
        return jsonQuotes.map((row) => {
          return {
            author: row.author ?? row[0].character,
            content: row.content ?? row.en ?? row[0].quote,
          };
        });
      });

    return quotesArr;
  }
};
