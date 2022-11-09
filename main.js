var gameData = {
    "numbers": 10,
    "tickSpeedCost": 1000,
    "tickSpeed": 1000,
    "tickSpeedIncrease": 12,
}

function initialize()
{
    var deriv = $("#derivTableBody")

    
    
    for (var key in keys)
    {
        gameData[keys[key]+v[0]] = 10**key
        gameData[keys[key]+v[1]] = 0
        gameData[keys[key]+v[2]] = 0
        gameData[keys[key]+v[3]] = 1
        gameData[keys[key]+v[4]] = 10*(10**key)
        gameData[keys[key]+v[5]] = 10
        gameData[keys[key]+v[6]] = 10*gameData[keys[key]+v[0]]

        let row = document.createElement("tr")
        row.id = keys[key]+"Row"
        row.style = "font-size: 16px; display: table-row;"

        let derivative = document.createElement("td")
        derivative.innerText = keys[key].charAt(0).toUpperCase() + keys[key].slice(1) + " Derivative x"
        derivative.className = "rel"
        derivative.style.width = "32%"


        let mult = document.createElement("span")
        mult.id = keys[key]+"Mult"

        derivative.append(mult)
        row.append(derivative)

        let amt = document.createElement("td")
        amt.className = "rel"

        let amount = document.createElement("span")
        amount.id = keys[key]+"Derivative"
        
        let manual = document.createElement("span")
        manual.innerHTML = "   (<span id = '"+keys[key]+"Manual'></span>)"

        amt.append(amount)
        amt.append(manual)
        row.append(amt)

        let btnTD10 = document.createElement("td")
        btnTD10.id = "purchase"

        let btn10 = document.createElement("button")
        btn10.innerHTML = "Increase " + keys[key] + " derivative to 10 <br> Cost: "
        btn10.setAttribute("onClick", "buyDerivative("+key+",true)")
        let btn10Span = document.createElement("span")
        btn10Span.id = keys[key]+"Until10Cost"
        btn10Span.className = "cost"

        btn10.append(btn10Span)
        btnTD10.append(btn10)
        row.append(btnTD10)

        let btnTD = document.createElement("td")
        btnTD.id = "purchase"

        let btn = document.createElement("button")
        btn.innerHTML = "Increase " +keys[key] + " derivative <br> Cost: "
        btn.setAttribute("onClick", "buyDerivative("+key+",false)")
        let btnSpan = document.createElement("span")
        btnSpan.id = keys[key]+"DerivativeCost"
        btnSpan.className = "cost"

        btn.append(btnSpan)
        btnTD.append(btn)
        row.append(btnTD)

        deriv.append(row)
    }
    

    var resources = $("#resources")

    let numbers = document.createElement("p")
    numbers.innerText = "Numbers: "
    let numbersSpan = document.createElement("span")
    numbersSpan.setAttribute("id", "numbers")

    numbers.append(numbersSpan)
    resources.append(numbers)
}

var keys = {1:"first", 2:"second", 3:"third", 4:"fourth", 5:"fifth", 6:"sixth", 7:"seventh", 8:"eighth"}
var v = ["DerivativeCost", "Derivative", "Manual", "Mult", "CostMult", "Until10", "Until10Cost"]

function buyDerivative(number, until10)
{
    var place = keys[number]
    
    if (until10)
    {
        if (gameData["numbers"] >= gameData[place+v[0]]*(gameData[place+v[5]]))
        {
            gameData["numbers"] -= gameData[place+v[0]]*(gameData[place+v[5]])
            gameData[place+v[1]] += (gameData[place+v[5]])
            gameData[place+v[2]] = 0
            gameData[place+v[3]] *= 2
            gameData[place+v[5]] = 10
            gameData[place+v[0]] *= gameData[place+v[4]]
            gameData[place+v[6]] = 10*gameData[place+v[0]]
        }
    } else
    {
        if (gameData["numbers"] >= gameData[place+v[0]])
        {
            gameData["numbers"] -= gameData[place+v[0]]
            gameData[place+v[1]] += 1
            gameData[place+v[2]] += 1
            gameData[place+v[5]] -= 1
            gameData[place+v[6]] -= gameData[place+v[0]]

            if (gameData[place+v[2]]%10 == 0)
            {
                gameData[place+v[5]] = 10
                gameData[place+v[3]] *= 2
                gameData[place+v[0]] *= gameData[place+v[4]]
                gameData[place+v[2]] = 0
                gameData[place+v[6]] = 10 * gameData[place+v[0]]
            }
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
                if (gameData[id]%1 == 0)
                {
                    document.getElementById(id).innerHTML = gameData[id]
                } else
                {
                    document.getElementById(id).innerHTML = gameData[id].toFixed(2)
                }
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
