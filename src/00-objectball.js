function gameObject(){
    const stat = {
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
    return stat;
}
function numPointsScored(player){
    let object = gameObject();
    if (Object.keys(object['home']['players']).includes(player)){
        return object['home']['players'][player].points;
    } else {
        return object['away']['players'][player].points;
    }
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
function playerStats(name){
    let object = gameObject();
    return (object.home.players[name])? object.home.players[name]: object.away.players[name];
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
    const bigFoot = Math.max.apply(Math, Object.values(playerShoes))
    //finds the player who owns bigFoot
    const bigPlayer = playerList.find(player => shoeSize(player) === bigFoot)
    //finds rebounds of player with biggest foot and assigns it
    const bigRebounds = playerStats(bigPlayer).rebounds
    return bigRebounds
}
function mostPointsScored(){
    let object = gameObject();

    let playerList = getPlayerList('home').concat(getPlayerList('away'));

    let playerPointsPair = {};
    playerList.map(player => playerPointsPair[player] = numPointsScored(player));
    
    const maxPoints = Math.max.apply(Math, Object.values(playerPointsPair))
    
    return playerList.filter(player => numPointsScored(player) === maxPoints)[0];
}
function getPlayerList(teamSide){
    let object = gameObject();
    let playerList = Object.keys(object[teamSide].players);
    return playerList
}
function winningTeam(){
    let object = gameObject();
    //access create list of players then use reduce + (instantly called) function to get total points scored 
    const homePoints = getPlayerList('home').reduce(function(accumulator, element){ return numPointsScored(element) + accumulator}, 0);
    //get away points then use reduce + arrorw function to get total points scored
    const awayPoints = getPlayerList('away').reduce((accumulator,element) => numPointsScored(element) + accumulator,0);
    // use ternary operator to return team name with more points
    return (homePoints < awayPoints)? object.away.teamName: object.home.teamName;
}
function playerWithLongestName(){
    let object = gameObject();
    let playerList = getPlayerList('home').concat(getPlayerList('away'));
    let longestName = playerList.filter(player => player.length === Math.max.apply(Math, playerList.map(name => name.length)))[0];
    return longestName; 
}
function numSteals(player){
    let object = gameObject();
    if (Object.keys(object['home']['players']).includes(player)){
        return object['home']['players'][player].steals;
    } else {
        return object['away']['players'][player].steals;
    }
}
function playerWithMostSteal(){
    let object = gameObject();
    let homeSteals = getPlayerList('home').reduce(function(maxElement, element) { return (numSteals(maxElement) < numSteals(element))? element: maxElement;})
    let awaySteals = getPlayerList('away').reduce(function(maxElement, element) { return (numSteals(maxElement) < numSteals(element))? element: maxElement;})

    return (numSteals(homeSteals) < numSteals(awaySteals))? awaySteals: homeSteals;
}
function doesLongNameStealATon(){
    let longestName = playerWithLongestName();
    let mostSteals = playerWithMostSteal();
    return !!(longestName === mostSteals)
}


console.log(numPointsScored('BrookLopez'))
console.log(shoeSize('BrookLopez'))
console.log(teamColors('Brooklyn Nets'))
console.log(teamNames(gameObject()))
console.log(playerNumbers('Brooklyn Nets'))
console.log(playerStats('BrookLopez'))
console.log(bigShoeRebounds())
console.log(mostPointsScored())
console.log(winningTeam())
console.log(playerWithLongestName())
console.log(doesLongNameStealATon())
