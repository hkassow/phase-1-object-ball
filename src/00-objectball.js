function gameObject(){
    const z = {
        home: {
            teamName:'Brooklyn Nets',
            colors:['Black', 'White'],
            players:{
                AlanAnderson: {
                    number:0,
                    shoe:16,
                    points:22,
                    rebounds:12,
                    assists:12,
                    steals:3,
                    blocks:1,
                    slamdunks:1
                },
                ReggieEvans: {
                    number:30,
                    shoe:14,
                    points:12,
                    rebounds:12,
                    assists:12,
                    steals:12,
                    blocks:12,
                    slamdunks:7
                },
                BrookLopez: {
                    number:11,
                    shoe:17,
                    points:17,
                    rebounds:19,
                    assists:10,
                    steals:3,
                    blocks:1,
                    slamdunks:15
                },
                MasonPlumlee: {
                    number:1,
                    shoe:19,
                    points:26,
                    rebounds:12,
                    assists:6,
                    steals:3,
                    blocks:8,
                    slamdunks:5
                },
                JasonTerry:{
                    number:31,
                    shoe:15,
                    points:19,
                    rebounds:2,
                    assists:2,
                    steals:4,
                    blocks:11,
                    slamdunks:1
                }
                
            }
        },
        away: {
            teamName:'Charlotte Hornets',
            colors:['Turquoise', 'Purple'],
            players:{
                JeffAdrien: {
                    number:4,
                    shoe:18,
                    points:10,
                    rebounds:1,
                    assists:1,
                    steals:2,
                    blocks:7,
                    slamdunks:2
                },
                BismakBiyombo: {
                    number:0,
                    shoe:16,
                    points:12,
                    rebounds:4,
                    assists:7,
                    steals:7,
                    blocks:15,
                    slamdunks:10
                },
                DeSagnaDiop: {
                    number:2,
                    shoe:14,
                    points:24,
                    rebounds:12,
                    assists:12,
                    steals:4,
                    blocks:5,
                    slamdunks:5
                },
                BenGordon: {
                    number:8,
                    shoe:15,
                    points:33,
                    rebounds:3,
                    assists:2,
                    steals:1,
                    blocks:1,
                    slamdunks:0
                },
                BrendanHaywood: {
                    number:33,
                    shoe:15,
                    points:6,
                    rebounds:12,
                    assists:12,
                    steals:22,
                    blocks:5,
                    slamdunks:12
                }
            }
        }
    }
    return z;
}
//some of the helper functions for this assignment 
function getPlayerList(teamSide){
    let object = gameObject();
    let {players} = object[teamSide]
    return Object.keys(players)
}
function playerStats(name){
    let object = gameObject();
    //uses ternary to check if player exists on home team
    //if he does returns the player object 
    //because of the way player object is originally setup player object is all of our player stats 
    return (object.home.players[name])? object.home.players[name]: object.away.players[name];
}
function numPointsScored(player){
    //using helper function player stats
    return playerStats(player).points

    //without utilizing helper function
    let object = gameObject();
    // uses ternary operator to ask if player is on home team 
    let side = ((object.home.players[player])? 'home': 'away')
    //using bracket notation for variables player and side
    return object[side].players[player].points
}
function shoeSize(player){
    let object = gameObject();
    if (Object.keys(object['home']['players']).includes(player)){
        return object['home']['players'][player].shoe;
    } else if (Object.keys(object['away']['players']).includes(player)) {
        return object['away']['players'][player].shoe;
    } else {
        return 'no player matches this name try again';
    }
}
function teamColors(team){
    let object = gameObject();
    return (object['home'].teamName === team)? object['home'].colors: object['away'].colors;
}
function teamNames(){
    let object = gameObject();
    return [object.home.teamName, object.away.teamName];
}
function playerNumbers(name){
    let object = gameObject();
    const numbers = []
    const team = (object.home.teamName === name)? 'home': 'away';
    for(let player in object[team]['players']){
        numbers.push(object[team]['players'][player]['number']);
    }
    return numbers;
}
function bigShoeRebounds(){
    let object = gameObject();
    // uses helper function playerList to get an array of all players
    let playerList = getPlayerList('home').concat(getPlayerList('away'));
    //creates an object and populates it with pairs of form 
    //'player: player's rebounds'
    const playerShoes = {}
    playerList.forEach(player => playerShoes[player] = shoeSize(player))
    //finds the biggest sized foot and assigns it to a value
    //Math.max.apply is for applying max to an array 
    const bigFoot = Math.max.apply(Math, Object.values(playerShoes))
    //searches player list for the player who owns bigFoot
    const bigPlayer = playerList.find(player => shoeSize(player) === bigFoot)
    //finds rebounds of player with biggest foot and assigns it
    const bigRebounds = playerStats(bigPlayer).rebounds
    //returns rebounds
    return bigRebounds
}
function mostPointsScored(){
    let object = gameObject();
    //gets list of players with helper function
    let playerList = getPlayerList('home').concat(getPlayerList('away'));
    //uses the reduce function and a simple helper function to reduce the list to best scorer
    return  playerList.reduce((a,b) => betterScorer(a,b))

    //helper function to compare to players and get better scorer
    function betterScorer(michael, kobe){
        return (numPointsScored(michael)< numPointsScored(kobe))? kobe: michael
    }
    
}
function winningTeam(){
    let object = gameObject();
    //create list of players
    //use reduce function to add all points score
    //(instantly called) function to get total points scored 
    const homePoints = getPlayerList('home').reduce(function(accumulator, element){ return numPointsScored(element) + accumulator}, 0);
    //create list of players
    //reduce function to add all points scored
    //used arrow function
    const awayPoints = getPlayerList('away').reduce((accumulator,element) => numPointsScored(element) + accumulator,0);
    // use ternary operator to return team name with more points
    return (homePoints < awayPoints)? object.away.teamName: object.home.teamName;
}
function playerWithLongestName(){
    let object = gameObject();
    //first attempt
    let playerList = getPlayerList('home').concat(getPlayerList('away'));
    let longestName = playerList.filter(player => player.length === Math.max.apply(Math, playerList.map(name => name.length)))[0];
    //refractor attempt
    //get total player list
    let playerList2 = getPlayerList('home').concat(getPlayerList('away'));
    //reduce function w/ ternary operator as callback function
    //use ternary operator to compare length then return the longer name
    const longestName2 = playerList2.reduce((a,b) => (a.length < b.length)? b: a)

    return longestName2; 
}
function numSteals(player){
    //helper function playerStats
    const x = playerStats(player)
    return x.steals
}

function playerWithMostSteal(){
    let object = gameObject();
    //get home team players
    //use reduce to return single element
    //use helper function betterStealer to compare 2 players steals 
    let homeSteals = getPlayerList('home').reduce((a,b) => betterStealer(a,b))
    let awaySteals = getPlayerList('away').reduce((a,b) => betterStealer(a,b))

    return (numSteals(homeSteals) < numSteals(awaySteals))? awaySteals: homeSteals;

    //betterScorer function restyled
    function betterStealer(michael, kobe){
        //takes two players and returns whoever got more steals
        return (numSteals(michael)< numSteals(kobe))? kobe: michael
    }
}
function doesLongNameStealATon(){
    let longestName = playerWithLongestName();
    let mostSteals = playerWithMostSteal();
    return !!(longestName === mostSteals)
}

console.log("numbPointsScored('BrookLopez'):", numPointsScored('BrookLopez'))
console.log("shoeSize('BrookLopez'):", shoeSize('BrookLopez'))
console.log("teamColors('Brooklyn Nets'):", teamColors('Brooklyn Nets'))
console.log("teamNames(gameObject()):", teamNames(gameObject()))
console.log("playerNumbers('Charlotte Hornets'):", playerNumbers('Charlotte Hornets'))
console.log("playerNumbers('Brooklyn Nets'):", playerNumbers('Brooklyn Nets'))
console.log("playerStats('BrookLopez'):", playerStats('BrookLopez'))
console.log("bigShoeRebounds():", bigShoeRebounds())
console.log("mostPointsScored():", mostPointsScored())
console.log("winningTeam():", winningTeam())
console.log("playerWithLongestName():", playerWithLongestName())
console.log("doesLongNameStealATon():", doesLongNameStealATon())
