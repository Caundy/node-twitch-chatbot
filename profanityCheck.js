// :D (will be kept in a separate file and required here)
var bannedWords = ["fuck", "shit"];

//most basic test for profanity
function checkForProfanity(msg){
    for (word of bannedWords) {
        //check whether a substring exists in a message 
        if (msg.toLowerCase().indexOf(word) !== -1) {
            return true;
        }
    }
    return false;
}

module.exports = checkForProfanity;