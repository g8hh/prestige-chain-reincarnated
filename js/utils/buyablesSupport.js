/*
key = [buyable layer][buyable id] i.e. a11 or b23
data = [another key]: function
*/

var MAIN_BUYABLE_DATA = {
        a11: {
                name: "A 11",
                func: "exp",
                effects: "points",
                base: {
                        initial: new Decimal(1.5),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["a13"]
                                },
                        }
                },
                bases(){
                        let b0 = new Decimal(30)
                        let b1 = new Decimal(1.1)
                        let b2 = new Decimal(1.001)
                        if (hasUpgrade("a", 21)) b0 = decimalOne
                        if (hasUpgrade("a", 22)) b1 = decimalOne
                        return [b0, b1, b2]
                },
        },
        a12: {
                name: "A 12",
                func: "exp",
                effects: "Alligators",
                base: {
                        initial: new Decimal(1.3),
                        1: {
                                active(){
                                        return true
                                },
                                type: "add",
                                amount(){
                                        return CURRENT_BUYABLE_EFFECTS["a21"]
                                },
                        }
                },
                bases(){
                        let b0 = new Decimal(200)
                        let b1 = new Decimal(1.3)
                        let b2 = new Decimal(1.003)
                        if (hasUpgrade("a", 21)) b0 = decimalOne
                        return [b0, b1, b2]
                },
        },
        a13: {
                name: "A 13",
                func: "lin",
                effects: "A 11 base",
                base: {
                        initial: new Decimal(.03),
                        1: {
                                active(){
                                        return hasUpgrade("a", 15)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.005)
                                },
                        },
                },
                bases(){
                        let b0 = new Decimal(300)
                        let b1 = new Decimal(1.5)
                        let b2 = new Decimal(1.01)
                        if (hasUpgrade("a", 21)) b0 = decimalOne
                        if (hasMilestone("a", 3)) b1 = decimalOne
                        return [b0, b1, b2]
                },
        },
        a21: {
                name: "A 21",
                func: "lin",
                effects: "A 12 base",
                base: {
                        initial: new Decimal(.01),
                        1: {
                                active(){
                                        return hasMilestone("a", 1)
                                },
                                type: "add",
                                amount(){
                                        return new Decimal(.001 * player.a.milestones.length)
                                },
                        }
                },
                bases(){
                        let b0 = new Decimal(5e16)
                        let b1 = new Decimal(3)
                        let b2 = new Decimal(1.03)
                        return [b0, b1, b2]
                },
        },
        a22: {
                name: "A 22",
                func: "lin",
                effects: "A-ligator effect exponent",
                base: {
                        initial: new Decimal(.3),
                },
                bases(){
                        let b0 = new Decimal(1e34)
                        let b1 = new Decimal(2)
                        let b2 = new Decimal(1.05)
                        if (hasUpgrade("a", 23)) b0 = decimalOne
                        return [b0, b1, b2]
                },
        },
        a23: {
                name: "A 23",
                func: "lin",
                effects: "Alligator effect exponent",
                base: {
                        initial: new Decimal(.1),
                },
                bases(){
                        let b0 = new Decimal(1e55)
                        let b1 = new Decimal(6)
                        let b2 = new Decimal(1.1)
                        return [b0, b1, b2]
                },
        },
        a31: {
                name: "A 31",
                func: "lin",
                effects: "Alligator gain exponent",
                base: {
                        initial: new Decimal(.1),
                },
                bases(){
                        let b0 = new Decimal(1e84)
                        let b1 = new Decimal(10)
                        let b2 = new Decimal(1.2)
                        return [b0, b1, b2]
                },
        },
}

var EXTRA_FREE_BUYABLE_DATA = {
}


/*
Function order:
- Reset buyable extras
- Reset buyable effects
- Update buyable extras
- Update buyable effects
- is buyable defined (bool)
- is buyable unlocked (booL)
- getBuyableTotal (Decimal, amount)
- getCodedBuyableAmount (Decimal, amount)
- isValidBuyableCode (bool)
- getBuyableName (string)
- calcBuyableExtra (recalls it)
- reCalcBuyableExtra (calcs it)
- getAlwaysActiveAdditionalBuyables (returns list)
- getBuyableExtraText (returns text)
- getBuyableEffectFunction (returns function for inputted buyable)
- getBuyableEffectSymbol (returns the symbol that the effect has)
- getBuyableEffectString (returns the effect display string)
- reCalcBuyableBase (calcs it)
- getIdentity (recalls what happens with no effect/disabled)
- reCalcBuyableEffect (calcs it)
- getBuyableBase (recalls it)
- getBuyableBases (recalls it)
- getBuyableCost (calcs it)
- canAffordBuyable (calcs it)
- isBuyableFree
- buyManualBuyable
- buyMaximumBuyable
- getBuyableAmountDisplay (calcs it)
- getBuyableDisplay (calcs it)
*/

var CURRENT_BUYABLE_EXTRAS = {}
var CURRENT_BUYABLE_BASES = {}
var CURRENT_BUYABLE_EFFECTS = {}
var BUYABLES_FUNCTION_NAMES = {
        "exp": {
                "func": BUYABLE_EFFECT_EXPONENTIAL,
                "identity": decimalOne,
                "string": "^x",
                "eff": "*",
        },
        "exp_sqrt":{
                "func": BUYABLE_EFFECT_EXPONENTIAL_SQRT,
                "identity": decimalOne,
                "string": "^sqrt(x)",
                "eff": "*",
        },
        "exp_cbrt": {
                "func": BUYABLE_EFFECT_EXPONENTIAL_CBRT,
                "identity": decimalOne,
                "string": "^cbrt(x)",
                "eff": "*",
        },
        "lin": {
                "func": BUYABLES_EFFECT_LINEAR,
                "identity": decimalZero,
                "string": "*x",
                "eff": "+",
        },
        "lin_sqrt": {
                "func": BUYABLES_EFFECT_LINEAR_SQRT,
                "identity": decimalZero,
                "string": "*sqrt(x)",
                "eff": "+",
        },
}

function resetCurrBuyableExtras(){ 
        // Fully general
        for (i in MAIN_BUYABLE_DATA){
                CURRENT_BUYABLE_EXTRAS[i] = decimalZero
        }
}
resetCurrBuyableExtras()

function resetCurrBuyableEffects(){
        // NOT fully general
        for (i in MAIN_BUYABLE_DATA){
                data1 = MAIN_BUYABLE_DATA[i]

                let id = getIdentity(i.slice(0,1), i.slice(1,3))
                CURRENT_BUYABLE_BASES[i] = id
                CURRENT_BUYABLE_EFFECTS[i] = id
        }
}
resetCurrBuyableEffects()

function updateAllBuyableExtras(){
        // NOT fully general
        resetCurrBuyableExtras()
        let order = []
        for (i in MAIN_BUYABLE_DATA){
                order.push(i)
        }
        order.reverse()
        for (j in order){
                i = order[j]
                CURRENT_BUYABLE_EXTRAS[i] = reCalcBuyableExtra(i.slice(0,1), i.slice(1,3))
        }
}

function updateAllBuyableEffects(){
        // NOT fully general
        resetCurrBuyableEffects()
        let order = []
        for (i in MAIN_BUYABLE_DATA){
                order.push(i)
        }
        order.reverse()
        for (j in order){
                i = order[j]
                CURRENT_BUYABLE_BASES[i]   = reCalcBuyableBase(  i.slice(0,1), i.slice(1,3))
                CURRENT_BUYABLE_EFFECTS[i] = reCalcBuyableEffect(i.slice(0,1), i.slice(1,3))
        }
}

function isBuyableDefined(layer, id){
        // Fully general
        if (layers[layer] == undefined) return false
        if (layers[layer].buyables == undefined) return false
        return layers[layer].buyables[id] != undefined
}

function isBuyableUnlocked(layer, id){
        // Fully general
        if (!isBuyableDefined(layer, id)) return false
        return layers[layer].buyables[id].unlocked()
}

function getBuyableTotal(layer, id){
        // Fully general
        if (!isBuyableDefined(layer, id)) return decimalZero

        let a = calcBuyableExtra(layer, id)

        return getBuyableAmount(layer, id).plus(a)
}

function getCodedBuyableAmount(code){
        // NOT fully general
        return getBuyableTotal(code.slice(0,1), code.slice(1,3)) 
}

function isValidBuyableCode(code){
        // NOT fully general
        if (code.length != 3) return false
        let letter = code.slice(0,1)
        let num = Number(code.slice(1,3))
        return isBuyableDefined(letter, num)
}

function getBuyableName(code){
        // NOT fully general
        if (MAIN_BUYABLE_DATA[code] != undefined && MAIN_BUYABLE_DATA[code].name != undefined) return MAIN_BUYABLE_DATA[code].name
        console.log("do this " + code)
        return "bug bug bug yeet"
        //return layers[code.slice(0,1)].buyables[code.slice(1,3)].title
}

function getNoExtras(layer, id){
        // remove the lines for this and fully general
        return false
}

function calcBuyableExtra(layer, id){
        // Fully general
        if (!isBuyableDefined(layer, id)) return decimalZero
        if (getNoExtras(layer, id)) return decimalZero
        let a = CURRENT_BUYABLE_EXTRAS[layer+id]
        if (a != undefined) return a
        return decimalZero
}

function reCalcBuyableExtra(layer, id){
        // Fully general
        let key = layer + id
        let data = MAIN_BUYABLE_DATA[key] || {}
        if (data == undefined) return decimalZero
        let amt = decimalZero
        for (i in data) {
                if (!isValidBuyableCode(i)) continue
                if (data[i].active() == true) amt = amt.plus(getCodedBuyableAmount(i))
        }
        let data2 = getAlwaysActiveAdditionalBuyables(layer, id)
        for (j in data2) {
                let i = data2[j]
                amt = amt.plus(getCodedBuyableAmount(i))
        }
        let data3 = EXTRA_FREE_BUYABLE_DATA[key] || {}
        for (i in data3) {
                if (data3[i].active() == true) amt = amt.plus(data3[i].amount())
        }
        return amt
}

function getAlwaysActiveAdditionalBuyables(layer, id){
        // kinda a spec thing, but basically general
        let l = []
        let yet1 = false
        for (j in LAYERS){
                i = LAYERS[j]
                if (layers[i].row == "side") continue
                if (yet1 && isBuyableDefined(i, id)) l.push(i+id)
                if (i == layer) yet1 = true
        }
        if (id == 33) return l
        if (isBuyableDefined(layer, 33)) l.push(layer+33)
        return l
}

function getBuyableExtraText(layer, id){
        // Fully general
        let a = "<b><h2>Extra levels from</h2>:<br>"
        let extra = false
        let key = layer + id
        let data = MAIN_BUYABLE_DATA[key] || {}
        for (i in data) {
                if (!isValidBuyableCode(i)) continue
                if (data[i].active() == true) {
                        extra = true
                        a += "<h3>" + getBuyableName(i) + "</h3>, "
                }
        }
        let data3 = EXTRA_FREE_BUYABLE_DATA[key] || {}
        for (i in data3) {
                if (!data3[i].name) continue
                if (data3[i].active() == true) {
                        extra = true
                        a += "<h3>" + data3[i].name + "</h3>, "
                }
        }
        if (!extra) return ""
        return a.slice(0, a.length-2) + "<br>"
}

function BUYABLE_EFFECT_EXPONENTIAL(a,b){
        return a.pow(b)
}

function BUYABLE_EFFECT_EXPONENTIAL_SQRT(a,b){
        return a.pow(b.sqrt())
}

function BUYABLE_EFFECT_EXPONENTIAL_CBRT(a,b){
        return a.pow(b.cbrt())
}

function BUYABLES_EFFECT_LINEAR(a,b){
        return a.times(b)
}

function BUYABLES_EFFECT_LINEAR_SQRT(a,b){
        return a.times(b.sqrt())
}

function getBuyableEffectFunction(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) return BUYABLE_EFFECT_EXPONENTIAL
        let func = MAIN_BUYABLE_DATA[layer+id]["func"]
        if (typeof func == "function") return func
        return BUYABLES_FUNCTION_NAMES[func]["func"] || BUYABLE_EFFECT_EXPONENTIAL
}

function getBuyableEffectSymbol(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) return "bug"
        let data = MAIN_BUYABLE_DATA[layer+id]
        let func = data["func"]
        
        return data["effectSymbol"] || BUYABLES_FUNCTION_NAMES[func]["eff"] || "bug"
}

function getBuyableEffectString(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) return "bug"
        let func = MAIN_BUYABLE_DATA[layer+id]["func"]
        if (typeof func == "function") return MAIN_BUYABLE_DATA[layer+id]["effectSymbol"]
        return BUYABLES_FUNCTION_NAMES[func]["string"] || "bug"
}

function reCalcBuyableBase(layer, id){
        if (!isValidBuyableCode(layer + id)) {
                console.log("ya boi broke" + layer+ id)
                Decimal(0)
        }
        if (!isBuyableActive(layer, id)) return getIdentity(layer, id)
        let data1 = MAIN_BUYABLE_DATA[layer+id]
        
        let data2 = data1.base
        let a = data2.initial
        let b = 0
        while (b < 10){ //maybe change later
                b ++
                let data3 = data2[b]
                //this is the data
                if (data3 == undefined) break
                //if data undefined done w loop
                if (data3.active != undefined && !data3.active()) continue
                //if the effect isnt active continue to next effect
                let func = data3.type
                let eff = data3.amount()
                //effect of the effect... (xd)
                if (func == "add" || func == "plus") a = a.plus(eff)
                else if (func == "mult" || func == "times") a = a.times(eff)
                else if (func == "exp" || func == "pow") a = a.pow(eff)
                else {
                        console.log("ahh")
                        console.log(b)
                        console.log(layer + id)
                }
                //do the effect to a
        }
        return a
}

function getIdentity(layer, id){
        // Fully general
        let data1 = MAIN_BUYABLE_DATA[layer+id]
        if (typeof data1.func == "function") return data1.identity
        return BUYABLES_FUNCTION_NAMES[data1.func]["identity"]
}

function reCalcBuyableEffect(layer, id){
        // Softcap is not general, otherwise it is
        if (!isBuyableActive(layer, id)) return getIdentity(layer, id)
        let base = CURRENT_BUYABLE_BASES[layer + id]
        let amt = getBuyableTotal(layer, id)
        let ret = getBuyableEffectFunction(layer,id)(base, amt)

        return ret
}

function getBuyableBase(layer, id){
        // Fully general
        return CURRENT_BUYABLE_BASES[layer + id]
}

function getBuyableBases(layer, id){
        // Fully general
        if (!isValidBuyableCode(layer + id)) {
                console.log("ya boi broke" + layer+ id)
                Decimal(0)
        }
        return MAIN_BUYABLE_DATA[layer+id].bases()
}

function getBuyableCost(layer, id, delta = decimalZero){
        // assuming the cost formula is alwuas the same fully general
        let bases = getBuyableBases(layer, id)
        let x = getBuyableAmount(layer, id).plus(delta)

        let base0 = bases[0]
        let base1 = bases[1]
        let base2 = bases[2]
        let exp0 = 1
        let exp1 = x
        let exp2 = x.times(x)

        return Decimal.pow(base0, exp0).times(Decimal.pow(base1, exp1)).times(Decimal.pow(base2, exp2)).ceil()
}

function canAffordBuyable(layer, id, cost = undefined){
        // Fully general
        if (player.tab != layer) return false
        let amt = getBuyableAmount(layer, id)
        if (amt.eq(amt.plus(1))) return false
        if (cost == undefined) cost = getBuyableCost(layer, id, 0)
        let a = player[layer].points.gte(cost)
        let b = getBuyableAmount(layer, id).lt(getMaxBuyablesAmount(layer))
        return a && b
}

function isBuyableFree(layer){
        // Spec function
        return false
}

function buyManualBuyable(layer, id){
        // Fully general
        let cost = getBuyableCost(layer, id)
        if (!canAffordBuyable(layer, id, cost)) return
        player[layer].buyables[id] = player[layer].buyables[id].plus(1)
        if (isBuyableFree(layer)) return
        player[layer].points = player[layer].points.minus(cost)
}

function buyMaximumBuyable(layer, id, maximum){
        // Fully general
        let maxAllowed = getMaxBuyablesAmount(layer)
        if (getBuyableAmount(layer, id).gte(maxAllowed)) return
        let bases = getBuyableBases(layer, id)
        let pts = player[layer].points
        if (!isBuyableUnlocked(layer, id)) return 
        if (pts.lt(bases[0])) return 
        
        let pttarget = pts.div(bases[0]).log(1.01)
        let bfactor = Decimal.log(bases[1], 3).div(Decimal.log(1.01, 3))
        //want to find ax^2+bx = c
        let c = pttarget
        let b = bfactor
        let a = Decimal.log(bases[2], 3).div(Decimal.log(1.01, 3))

        let target = c.times(a).times(4).plus(b.pow(2)).sqrt().minus(b).div(2).div(a).floor().plus(1)
        //-b + sqrt(b*b+4*c*a)

        target = target.min(maxAllowed)

        let diff = target.minus(player[layer].buyables[id]).max(0)
        if (maximum != undefined) diff = diff.min(maximum)
                                
        player[layer].buyables[id] = player[layer].buyables[id].plus(diff)

        if (isBuyableFree(layer) || diff.eq(0)) return 
        pts = pts.sub(getBuyableCost(layer, id, -1)).max(0)
        //max 0 so nothing goes horribly wrong with weird errors and stuffs
}

function getBuyableAmountDisplay(layer, id){
        // Fully general
        let extra = calcBuyableExtra(layer, id)
        if (extra.eq(0)) return formatWhole(getBuyableAmount(layer, id))
        return formatWhole(getBuyableAmount(layer, id)) + "+" + formatWhole(extra)
}

function getBuyableDisplay(layer, id){
        // other than softcapping fully general
        if (player.tab != layer) return ""
        if (player.subtabs[layer].mainTabs != "Buyables") return ""
        //if we arent on the tab, then we dont care :) (makes it faster)
        if (!shiftDown) {
                let amt = "<b><h2>Amount</h2>: " + getBuyableAmountDisplay(layer, id) + "</b><br>"
                let eff1 = "<b><h2>Effect</h2>: " + getBuyableEffectSymbol(layer, id) 
                let savedEff = CURRENT_BUYABLE_EFFECTS[layer + id]
                let eff2 = format(savedEff, 4) + " " + MAIN_BUYABLE_DATA[layer + id]["effects"] + "</b><br>"
                let cost = "<b><h2>Cost</h2>: " + format(getBuyableCost(layer, id)) + " " + layers[layer].name + "</b><br>"
        
                return "<br>" + amt + eff1 + eff2 + cost + "Shift to see details"
        }

        let eformula = ""
        if (MAIN_BUYABLE_DATA[layer + id]["eFormula"] != undefined) {
                eformula = MAIN_BUYABLE_DATA[layer + id]["eFormula"]
                if (typeof eformula == "function") eformula = eformula()
                eformula = replaceString(eformula, "[base]", format(getBuyableBase(layer, id), 4))
        } else {
                eformula = format(getBuyableBase(layer, id), 4) + getBuyableEffectString(layer, id)
        }
        let allEff = "<b><h2>Effect formula</h2>:<br>" + eformula + "</b><br>"

        let bases = getBuyableBases(layer, id)
        let cost1 = "<b><h2>Cost formula</h2>:<br>"
        let cost3 = "</b><br>"
        let cost2a = bases[0].eq(1) ? "" :  "" + formatBuyableCostBase(bases[0]) + ""
        let cost2b = bases[1].eq(1) ? "" : "*" + formatBuyableCostBase(bases[1]) + "<sup>x</sup>"
        let cost2c = bases[2].eq(1) ? "" : "*" + formatBuyableCostBase(bases[2]) + "<sup>x<sup>2</sup></sup>" 
        let cost2 = cost2a + cost2b + cost2c
        if (cost2[0] == "*") cost2 = cost2.slice(1) //removes the star if its the first character
        let allCost = cost1 + cost2 + cost3

        return br + allEff + getBuyableExtraText(layer, id) + allCost
}

function formatBuyableCostBase(x){
        if (x.lt(1)) {
                let a = formatBuyableCostBase(Decimal.div(1, x))
                if (a == "1") return "1"
                return "1/" + a
        } else if (x.lt(1.0001)) return "1"
        else if (x.eq(x.floor())) return formatWhole(x)
        else if (x.lt(1.99)) return format(x, 4)
        else if (x.lt(10)) return format(x, 3)
        return format(x)
}

function getGeneralizedBuyableData(layer, id, unlockedTF){
        let title = getBuyableName(layer+id)
        let display = function(){
                return getBuyableDisplay(layer, id)
        }
        let effect = function(){
                return CURRENT_BUYABLE_EFFECTS[layer+id]
        }
        let canAfford = function(){
                return canAffordBuyable(layer, id)
        }
        let total = function(){
                return getBuyableAmount(layer, id).plus(this.extra())
        }
        let extra = function(){
                return calcBuyableExtra(layer, id)
        }
        let buy = function(){
                buyManualBuyable(layer, id)
        }
        let buyMax = function(maximum){
                buyMaximumBuyable(layer, id, maximum)
        }
        return {
                title: title, 
                display: display, 
                effect: effect,
                canAfford: canAfford,
                total: total,
                extra: extra,
                buy: buy,
                buyMax: buyMax,
                unlocked: unlockedTF,
                }
}

// GENERAL BUYABLE SUPPORT

function isBuyableActive(layer, thang){
        if (layer == "o") return true
        if (layer == "n") return true
        if (layer == "m") return true
        if (layer == "l") return true
        if (layer == "k") return true
        if (layer == "j") return true
        if (layer == "i") return true
        if (layer == "h") return true
        if (layer == "g") return true
        if (layer == "f") return true
        if (layer == "e") return true
        if (layer == "d") return true
        if (layer == "c") return true
        if (layer == "b") return true
        if (layer == "a") return true
        console.log(layer, thang)
        return true
}

function getABBulk(layer){
        let amt = decimalOne
        if (layer == "a") {
        }
        if (layer == "b") {
        }
        if (layer == "c"){
        }
        if (layer == "d"){
        }
        if (layer == "e"){
        }
        if (layer == "f"){
        }
        if (layer == "g"){
        }
        if (layer == "h"){
        }
        return amt
}

function getABSpeed(layer){
        let diffmult = 1 // times per second
        if (layer == "a"){
        }
        if (layer == "b"){
        }
        if (layer == "c"){
        }
        if (layer == "d"){
        }
        return diffmult
}

function getMaxBuyablesAmount(layer){
        let ret = Decimal.pow(10, 20)
        if (layer == "a") {
        }
        if (layer == "b") {
        }
        if (layer == "c") {
        }
        if (layer == "d") {
        }
        if (layer == "e") {
        }
        if (layer == "f") {
        }
        if (layer == "g") {
        }
        if (layer == "h"){
        }
        if (layer == "i"){
        }
        return ret
}

function handleGeneralizedBuyableAutobuy(diff, layer){
        player[layer].abtime += diff * getABSpeed(layer)

        if (player[layer].abtime > 10) player[layer].abtime = 10
        if (player[layer].abtime > 1) {
                player[layer].abtime += -1
                let amt = getABBulk(layer)
                if (tmp[layer].buyables[11] && tmp[layer].buyables[11].unlocked) layers[layer].buyables[11].buyMax(amt)
                if (tmp[layer].buyables[12] && tmp[layer].buyables[12].unlocked) layers[layer].buyables[12].buyMax(amt)
                if (tmp[layer].buyables[13] && tmp[layer].buyables[13].unlocked) layers[layer].buyables[13].buyMax(amt)
                if (tmp[layer].buyables[21] && tmp[layer].buyables[21].unlocked) layers[layer].buyables[21].buyMax(amt)
                if (tmp[layer].buyables[22] && tmp[layer].buyables[22].unlocked) layers[layer].buyables[22].buyMax(amt)
                if (tmp[layer].buyables[23] && tmp[layer].buyables[23].unlocked) layers[layer].buyables[23].buyMax(amt)
                if (tmp[layer].buyables[31] && tmp[layer].buyables[31].unlocked) layers[layer].buyables[31].buyMax(amt)
                if (tmp[layer].buyables[32] && tmp[layer].buyables[32].unlocked) layers[layer].buyables[32].buyMax(amt)
                if (tmp[layer].buyables[33] && tmp[layer].buyables[33].unlocked) layers[layer].buyables[33].buyMax(amt)
        }
}

