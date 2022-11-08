var gameData = {
    "numbers": 0,
    "increment": 1,
    "incrementCost": 10,
    "firstDerivative": 0,
    "firstDerivativeCost": 50,
    "secondDerivative": 0,
    "secondDerivativeCost": 500
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
        if (gameData["firstDerivative"] == 0)
        {
            let oldButton = document.getElementById("buyFirstDerivative")
            let newButton = document.createElement("button");
            newButton.setAttribute("onClick", "buyFirstDerivative()")
            newButton.innerHTML = "Increase first derivative <br> Cost: <span id = \"firstDerivativeCost\">150</span>"
            
            oldButton.parentNode.replaceChild(newButton, oldButton)
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
        if (gameData[""] == 0)
        {
            let oldButton = document.getElementById("buySecondDerivative")
            let newButton = document.createElement("button");
            newButton.setAttribute("onClick", "buySecondDerivative()")
            newButton.innerHTML = "Increase second derivative <br> Cost: <span id = \"secondDerivativeCost\">2000</span>"
            
            oldButton.parentNode.replaceChild(newButton, oldButton)
        }
        gameData["secondDerivativeCost"] *= 4
        gameData["secondDerivative"] += 1
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
    increment(gameData["firstDerivative"])
    gameData["firstDerivative"] += gameData["secondDerivative"]
}, 1000)
window.setInterval(function()
{
    update()
}, 10)