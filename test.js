const BotTester = require('messenger-bot-tester');

describe('bot test', function() {
  // webHookURL points to where yout bot is currently listening
  // choose a port for the test framework to listen on
  const testingPort = 3100;
  const webHookURL = 'https://33b101f3.ngrok.io/webhook/';
  //const webHookURL = 'http://localhost:' + 3000 + '/webhook';
  //const webHookURL = 'https://7d834a46.ngrok.io';
  const tester = new BotTester.default(testingPort, webHookURL);

  before(function(){
    // start your own bot here or having it running already in the background
    console.log("tester.startListening()");
    // redirect all Facebook Requests to http://localhost:3100/v2.6 and not https://graph.facebook.com/v2.6
    return tester.startListening();
  });

  it('#1 - Greetings', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    tester.startListening();
    theScript.sendTextMessage('hi');  //mock user sending Greetings
    
    theScript.expectTextResponses("Hi"); 
    tester.runScript(theScript);
    theScript.checkResponse;
    //tester.stopListening();
  });
  it('#2 - Greetings', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    tester.startListening();
    theScript.sendTextMessage('Yo');  //mock user sending Greetings
    
    theScript.expectTextResponses("Hi"); 
    tester.runScript(theScript);
    theScript.checkResponse;
    //tester.stopListening();
  });
  it('#3 - Goodbye', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Bye');  //mock user sending Goodbye
    
    theScript.expectTextResponses("Bye"); 
    tester.runScript(theScript);
  });
  it('#4 - Goodbye', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Byebye');  //mock user sending Goodbye
    
    theScript.expectTextResponses("Bye"); 
    tester.runScript(theScript);
  });
  it('#5 - Help', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Help');  //mock user sending Help
    
    theScript.expectTextResponses("Aidera helps use two services : Yelp, Airbnb. Please access discussion forum for detailed instructions."); 
    tester.runScript(theScript);
  });
  it('#6 - Feedback', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Add a feature');  //mock user sending Feedback
    
    theScript.expectTextResponses("Thank you for your feedback! Team Aidera will look into your suggestion."); 
    tester.runScript(theScript);
  });
  it('#7 - Search Nearby Restaurants', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Get restaurants near Boston');  //mock user sending Search Nearby Restaurants
    
    theScript.expectTextResponses("Aidera helps use two services : Yelp, Airbnb. Please access discussion forum for detailed instructions."); 
    tester.runScript(theScript);
  });
  it('#8 - Error', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('fqwfcqew');  //mock user sending Error
    
    theScript.expectTextResponses("Didn't really get that. Could you try something else?"); 
    tester.runScript(theScript);
  });

  // Added testaces for Sprint 2

  it('#9 - Greetings', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    tester.startListening();
    theScript.sendTextMessage('Hola');  //mock user sending Greetings
    
    theScript.expectTextResponses("Hi"); 
    tester.runScript(theScript);
    theScript.checkResponse;
    //tester.stopListening();
  });

  it('#10 - Greetings', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    tester.startListening();
    theScript.sendTextMessage('Hello You!');  //mock user sending Greetings
    
    theScript.expectTextResponses("Hi"); 
    tester.runScript(theScript);
    theScript.checkResponse;
    //tester.stopListening();
  });
  it('#11 - Goodbye', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Ciao');  //mock user sending Goodbye
    
    theScript.expectTextResponses("Bye"); 
    tester.runScript(theScript);
  });
  it('#12 - Goodbye', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('See ya.');  //mock user sending Goodbye
    
    theScript.expectTextResponses("Bye"); 
    tester.runScript(theScript);
  });
  it('#13 - Help', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('I need some assistance');  //mock user sending Help
    
    theScript.expectTextResponses("Aidera helps use two services : Yelp, Airbnb. Please access discussion forum for detailed instructions."); 
    tester.runScript(theScript);
  });
  it('#14 - Feedback', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('I want to provide feedback');  //mock user sending Feedback
    
    theScript.expectTextResponses("Thank you for your feedback! Team Aidera will look into your suggestion."); 
    tester.runScript(theScript);
  });
  it('#15 - Search Nearby Restaurants', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Where can I eat today?');  //mock user sending Search Nearby Restaurants
    
    theScript.expectTextResponses("Please send your location using facebooks location sending service"); 
    tester.runScript(theScript);
  });
  it('#16 - Error', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('fqwfcqew');  //mock user sending Error
    
    theScript.expectTextResponses("Didn't really get that. Could you try something else?"); 
    tester.runScript(theScript);
  });

  it('#17 - Recommend Cuisine', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    tester.startListening();
    theScript.sendTextMessage('recommend cuisine?');  //mock user sending Recommend Cuisine
    
    theScript.expectTextResponses("Return a random cuisine"); 
    tester.runScript(theScript);
    theScript.checkResponse;
    //tester.stopListening();
  });
  
  it('#18 - Review Restaurants', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    tester.startListening();
    theScript.sendTextMessage('reviews for subway');  //mock user sending Review Restaurants
    
    theScript.expectTextResponses("Please send your location using facebooks location sending service"); 
    tester.runScript(theScript);
    theScript.checkResponse;
    //tester.stopListening();
  });
  it('#19 - Price Restaurants', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('cheap restuarants near Kirkland');  //mock user sending Price Restaurants
    
    theScript.expectTextResponses("Quick reply buttons showed"); 
    tester.runScript(theScript);
  });
  it('#20 - Cuisine Restaurants', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('Thai food near me');  //mock user sending Cuisine Restaurants
    
    theScript.expectTextResponses("Please send your location using facebooks location sending service"); 
    tester.runScript(theScript);
  });
  it('#21 - Listing Search', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('airbnb accomadations near Boston');  //mock user sending Listing Search
    
    theScript.expectTextResponses("Please send your location using facebooks location sending service"); 
    tester.runScript(theScript);
  });
  it('#22 - Date Search', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('listing 04/23/2017 - 04/17/2017');  //mock user sending Date Search
    
    theScript.expectTextResponses("Please send your location using facebooks location sending service"); 
    tester.runScript(theScript);
  });
  it('#23 - Date Location Search', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('listing for Greece fron 02/12/2017 to 02/16/2017');  //mock user sending Date Location Search
    
    theScript.expectTextResponses("Airbnb date and location intent found, cards showed to the user"); 
    tester.runScript(theScript);
  });
  it('#24 - Host Search', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('listings of 57297136');  //mock user sending Host Search
    
    theScript.expectTextResponses("Airbnb host intent found, cards shown to the user"); 
    tester.runScript(theScript);
  });
  it('#25 - Rating Search', function(){
    const theScript = new BotTester.Script('1292072057495566', '1797971113796868');
    theScript.sendTextMessage('listing with 5 stars');  //mock user sending Rating Search
    
    theScript.expectTextResponses("Airbnb host intent found, cards shown to the user"); 
    tester.runScript(theScript);
  });

  
})
