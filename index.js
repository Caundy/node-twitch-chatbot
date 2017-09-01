var tmi = require('tmi.js');
var checkForProfanity = require('./bannedWords');

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    //log in using environmental variables
    //in windows cmd: set USER_ID=MyUsername1&&set USER_KEY=MyPassword12345&&node index
    identity: {
        username: `${process.env.USER_ID}`,
        password: `${process.env.USER_KEY}` 
    }, 
    //setting channels which bot should join
    //can be changed to environmental variable to let others use the bot
    channels: ["Con_Dee"]
}

//pass options to the client and connect
var client = new tmi.client(options);
client.connect();

//can be changed to environmental variable to let others use the bot
let me = "con_dee"

client.on("connected", function (address, port) {
    console.log(`Bot connected at port/address ${port} / ${address}`)
    //set chat color for bot
    client.color("DodgerBlue");
    //notify everyone that the bot connected to the channel
    client.action(me, "Hi there, CaundyBOT just connected :)");
    //send a message showing all of the commands
    client.say(me, "Welcome to Caundy's channel! Available commands include: !cv, !github, !schedule, !timeMeOut (just a 10s timeout for fun)")
});

client.on('join', function (channel, username, self){
    client.say(me, `Welcome to Caundy's channel, @${username}! Available commands include: !cv, !github, !schedule, !timeMeOut (just a 10s timeout for fun)`)
})

client.on("chat", function (me, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    if (checkForProfanity(message)) {
        //1second timeout if someone swears on the chat to clear their messages
        client.timeout(me, userstate["display-name"], 1, "Profanity used");
        client.say(me, `Timing out ${userstate["display-name"]} for a second due to harsh language`);
    }
    //check whether given message is a set command
    let positionOfCommand = commands.indexOf(message);
    //if it is
    if(positionOfCommand !== -1){
        //return an appropriate response
        client.say(me, responses[positionOfCommand]);
    //else if it's a request to get timed out - handle that    
    } else if (message === "!timeMeOut"){
        client.timeout(me, userstate["display-name"], 10, "cause reasons :)").then( function(data) {
            // data returns [channel, username, seconds, reason]
            client.say(me, `Timed out ${userstate["display-name"]} for ${arguments[2]} seconds`);
        //catch errors (due to user being broadcaster, insufficient bot permissions etc.)    
        }).catch(function(err) {
            client.say(me, "encountered error: " + err);
        });    
    }
});

//setting commands - will get hoisted up :)
let commands = [
    "!author",
    "!schedule",
    "!pizzaZHabciem",
    "!cv",
    "!github"
],
//setting corresponding responses
    responses = [
    "Author: github.com/Caundy",
    "Caundy is an aspiring full-stack dev and streams never",
    "Don't do it, I beg you ;_;",
    "https://github.com/konradbartlewicz/motivational-letter",
    "https://github.com/Caundy"
    ];