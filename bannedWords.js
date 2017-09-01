var bannedWords = ["fuck"];

//most basic test for profanity
function checkForProfanity(msg){
    let words = msg.split(" ");
    for(word of words){
        if (bannedWords.indexOf(word.toLowerCase()) !== -1){
            return true;
        }
    }
    return false;
}

module.exports = checkForProfanity;