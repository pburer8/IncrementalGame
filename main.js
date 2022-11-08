var gameData = {
    "numbers": 10,
    "tickSpeedCost": 1000,
    "tickSpeed": 1000,
    "tickSpeedIncrease": 12,

    "firstDerivative": 0,
    "firstDerivativeCost": 10,
    "firstManual": 0,
    "firstMult": 1,
    "firstCostMult": 10,
    
    "secondDerivative": 0,
    "secondDerivativeCost": 100,
    "secondManual": 0,
    "secondMult": 1,
    "secondCostMult": 100,

    "thirdDerivative": 0,
    "thirdDerivativeCost": 1000,
    "thirdManual": 0,
    "thirdMult": 1,
    "thirdCostMult": 1000,

    "fourthDerivative":0,
    "fourthDerivativeCost": 10000,
    "fourthManual": 0,
    "fourthMult": 1,
    "fourthCostMult": 10000
}

var keys = {1:"first", 2:"second", 3:"third", 4:"fourth"}
var v = ["DerivativeCost", "Derivative", "Manual", "Mult", "CostMult"]

function buyDerivative(number)
{
    var place = keys[number]

    if (gameData["numbers"] >= gameData[place+v[0]])
    {
        gameData["numbers"] -= gameData[place+v[0]]
        gameData[place+v[1]] += 1
        gameData[place+v[2]] += 1

        if (gameData[place+v[2]]%10 == 0)
        {
            gameData[place+v[3]] *= 2
            gameData[place+v[0]] *= gameData[place+v[4]]
        }
    }
}

function buyTickSpeed()
{
    if (gameData["numbers"] >= gameData["tickSpeedCost"])
    {
        gameData["numbers"] -= gameData["tickSpeedCost"]
        gameData["tickSpeed"] *= (1+(gameData["tickSpeedIncrease"])/100)
        gameData["tickSpeedCost"] *= 10
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
            if (gameData[id] >= 10000)
            {
                document.getElementById(id).innerHTML = Number.parseFloat(gameData[id]).toExponential(2)
            } else
            {
                document.getElementById(id).innerHTML = gameData[id].toFixed(2)
            }
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

function highlight()
{
    var spans = $(".cost")

    for (let i = 0; i<spans.length; i++)
    {
        let value = parseFloat(spans[i].innerHTML)
        if (!(value == NaN) && value <= gameData["numbers"])
        {
            spans[i].parentElement.style.backgroundColor = "lightgrey"
        } else if (!(value == NaN) && value > gameData["numbers"])
        {
            spans[i].parentElement.style.backgroundColor = "grey"
        }
        console.log(spans[i])
        console.log(spans[i].parentElement)
        console.log()
    }
}

window.setInterval(function()
{
    for (let i = 4; i > 1; i--)
    {
        gameData[keys[i-1]+v[1]] += gameData[keys[i]+v[1]] * gameData[keys[i]+v[3]] * (gameData["tickSpeed"]/1000)
    }
    gameData["numbers"] += gameData["firstDerivative"] * gameData["firstMult"] * gameData["tickSpeed"]/1000
}, 1000)
window.setInterval(function()
{
    update()
    highlight()
}, 10)
