var gameData = {
    "numbers": 0,
    "increment": 1,
    "incrementCost": 10,
    "firstDerivative": 0,
    "firstDerivativeCost": 50,
    "firstBought": false,
    "secondDerivative": 0,
    "secondDerivativeCost": 500,
    "secondBought": false,
    "thirdDerivative": 0,
    "thirdDerivativeCost": 5000,
    "thirdBought": false
}



function increment(number)
{
    gameData["numbers"] += gameData["increment"] * number
}

function buyIncrementUpgrade()
{
    if (gameData["numbers"] >= gameData["incrementCost"])
    {
        gameData["numbers"] -= gameData["incrementCost"]
        gameData["incrementCost"] *= 2
        gameData["increment"] += 1
    }
}


function buyFirstDerivative()
{
    if (gameData["numbers"] >= gameData["firstDerivativeCost"])
    {
        gameData["numbers"] -= gameData["firstDerivativeCost"]
        if (!gameData["firstBought"])
        {
            gameData["firstBought"] = true
            document.getElementById("buyFirstDerivative").innerHTML = "Increase first derivative <br> Cost: <span id = 'firstDerivativeCost'>150</span>"
        }
        gameData["firstDerivativeCost"] *= 3
        gameData["firstDerivative"] += 1
    }
}

function buySecondDerivative()
{
    if (gameData["numbers"] >= gameData["secondDerivativeCost"])
    {
        gameData["numbers"] -= gameData["secondDerivativeCost"]
        if (!gameData["secondBought"])
        {
            gameData["secondBought"] = true
            document.getElementById("buySecondDerivative").innerHTML = "Increase second derivative <br> Cost: <span id = 'secondDerivativeCost'>2000</span>"
        }
        gameData["secondDerivativeCost"] *= 4
        gameData["secondDerivative"] += 1
    }
}

function buyThirdDerivative()
{
    if (gameData["numbers"] >= gameData["thirdDerivativeCost"]) 
    {
        gameData["numbers"] -= gameData["secondDerivativeCost"]
        if (!gameData["thirdBought"])
        {
            gameData["thirdBought"] = true
            document.getElementById("buyThirdDerivative").innerHTML = "Increase third derivative <br> Cost: <span id = 'thirdDerivativeCost'>25000</span>"
        }
        gameData["thirdDerivativeCost"] *= 5
        gameData["thirdDerivative"] += 1
    }
}

function update()
{
    idList = document.querySelectorAll('*[id]:not([id=""])')
    
    for (let i = 0; i<idList.length; i++)
    {
        id = idList[i].id
        if (id in gameData)
        {
            document.getElementById(id).innerHTML = gameData[id]
        }
    }
}

function openTab(event, tab, tabC, tabL)
{
    //Declare variables
    var i, tabcontent, tablinks

     // Get all elements with class=tabC and hide them
    tabcontent = document.getElementsByClassName(tabC);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class=tabL and remove the class "active"
    tablinks = document.getElementsByClassName(tabL);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    event.currentTarget.className += " active";
}

window.setInterval(function()
{
    gameData["secondDerivative"] += gameData["thirdDerivative"]
    gameData["firstDerivative"] += gameData["secondDerivative"]
    increment(gameData["firstDerivative"])
}, 1000)
window.setInterval(function()
{
    update()
}, 10)