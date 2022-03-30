function getPointGen(){
	let ret = getPointConstant()
        ret = ret.times(getPointMultiplier())
        ret = ret.pow(getPointExponentiation())
        ret = dilate(ret, getPointDilationExponent())

	return ret
}

function getPointConstant(){
        let ret = decimalOne

        return ret
}

function getPointMultiplier(){
        let ret = decimalOne

        for (let i = 0; i < LAYERS.length; i++){
                if (layers[LAYERS[i]].row == "side") continue
                                        ret = ret.times(tmp[LAYERS[i]].effect || decimalOne)
        }

        if (hasUpgrade("a", 11))        ret = ret.times(tmp.a.upgrades[11].effect)
                                        ret = ret.times(CURRENT_BUYABLE_EFFECTS["a11"])
        if (hasUpgrade("a", 12))        ret = ret.times(tmp.a.upgrades[12].effect)

        return ret
}

function getPointExponentiation(){
        let ret = decimalOne

        if (hasUpgrade("a", 15))        ret = ret.times(1.01)
        if (hasMilestone("a", 2)) {
                let base = 1.01
                if (player.b.times > 0 /*|| player.c.unlocked*/) base = 1.03
                                        ret = ret.times(Decimal.pow(base, player.a.milestones.length))
        }
        
        return ret
}

function getPointDilationExponent(){
        let ret = decimalOne
        
        return ret
}

function getDilationExponent(){
        return getPointDilationExponent()
}

function sortStrings(l){
        l.sort(function(a,b){return Number(a)-Number(b)})
}

var br = "<br>"
var br2= br + br

function dilate(x, exponent, base = 10){
        if (x.lt(base)) return x
        return Decimal.pow(base, x.log(base).pow(exponent))
}

/*
All option+character:
¡™£¢∞§¶•ªº–≠
œ∑´®¥¨ˆøπ“‘«
åß∂ƒ©˙∆˚¬…æ
Ω≈ç√∫˜µ≤≥÷

All option+shift+character:
⁄€‹›ﬁﬂ‡°·‚—±
Œ„´‰ˇÁ¨Ø∏”’»
ÍÎÏ˝ÓÔÒÚÆ
¸˛Ç◊ı˜Â¯˘¿

Made 
𝞀
*/

function makeRed(c){
        return "<bdi style='color:#CC0033'>" + c + "</bdi>"
}

function makeBlue(c){
        return "<bdi style='color:#3379E3'>" + c + "</bdi>"
}

function makeGreen(c){
        return "<bdi style='color:#66E000'>" + c + "</bdi>"
}

function makePurple(c){
        return "<bdi style='color:#66297D'>" + c + "</bdi>"
}
                                                                                                                                                                                                                                                                        
function filter(list, keep){
        return list.filter(x => keep.includes(x) || keep.includes(Number(x)))
}

function filterOut(list, out){
        return list.filter(x => !out.includes(x) && !out.includes(Number(x)))
}

addLayer("a", {
        name: "Alligators", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
                unlocked: false,
		points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
        }},
        color: "#BB4C83",
        branches: [],
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "Alligators", // Name of prestige currency
        baseResource: "Points", // Name of resource prestige is based on
        baseAmount() {return player.points.floor()}, // Get the current amount of baseResource
        type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        getResetGain() {
                return getGeneralizedPrestigeGain("a")
        },
        getBaseDiv(){
                let ret = decimalOne
                
                return ret
        },
        getGainExp(){
                let ret = new Decimal(2)

                if (hasUpgrade("a", 13)) ret = ret.max(player.a.upgrades.length)
                ret = ret.plus(CURRENT_BUYABLE_EFFECTS["a31"])

                return ret
        },
        getGainMultPre(){
                let ret = decimalOne

                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a32"])

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("a")

                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a12"])
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a33"].pow(player.a.upgrades.length))
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b12"])

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("a")) return decimalOne

                let amt = player.a.points

                let exp = new Decimal(.5)
                exp = exp.plus(CURRENT_BUYABLE_EFFECTS["a23"])

                let ret = amt.plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("a")
        },
        getNextAt(){
                return getGeneralizedNextAt("a")
        },
        update(diff){
                let data = player.a

                if (tmp.a.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("a", diff)
                
                if (hasMilestone("b", 3)) {
                        handleGeneralizedBuyableAutobuy(diff, "a")
                } else {
                        data.abtime = 0
                }
                data.time += diff
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        layerShown(){return true},
        prestigeButtonText(){
                if (isPassiveGainActive("a")) return ""
                return getGeneralizedPrestigeButtonText("a")
        },
        canReset(){
                return player.a.time >= 2 && !isPassiveGainActive("a") && tmp.a.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A-ligator"
                        },
                        description(){
                                let a = "Alligators multiply point gain"
                                if (player.shiftAlias) return "log10(x+10)<sup>3</sup>"
                                return a + br + "Currently: " + format(tmp.a.upgrades[11].effect)
                        },
                        cost: new Decimal(2),
                        effect(){
                                let exp = CURRENT_BUYABLE_EFFECTS["a22"].plus(3)
                                return player.a.points.plus(10).log10().pow(exp)
                        },
                        unlocked(){
                                return player.a.best.gt(0) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Al-igator"
                        },
                        description(){
                                return "Each of the first nine upgrades unlocks an Alligator buyable and doubles point gain"
                        },
                        cost: new Decimal(30),
                        effect(){
                                return Decimal.pow(2, Math.min(9, player.a.upgrades.length))
                        },
                        unlocked(){
                                return player.a.best.gt(10) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A--igator"
                        },
                        description(){
                                return "Alligator initial gain exponent is the number of Alligator upgrades"
                        },
                        cost: new Decimal(500),
                        unlocked(){
                                return hasUpgrade("a", 12) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>All-gator"
                        },
                        description(){
                                return "Gain 100% of Alligator gained on reset and one reset per second but lose the ability to prestige"
                        },
                        cost: new Decimal(3e10),
                        unlocked(){
                                return hasUpgrade("a", 13) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A-l-gator"
                        },
                        description(){
                                return "Add .005 to A 13 base and raise Point gain ^1.01"
                        },
                        cost: new Decimal(1e20),
                        unlocked(){
                                return hasUpgrade("a", 14) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Al--gator"
                        },
                        description(){
                                return "Remove A 1X base costs"
                        },
                        cost: new Decimal(1e40),
                        unlocked(){
                                return hasUpgrade("a", 15) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A---gator"
                        },
                        description(){
                                return "Remove the linear exponential component of A 11's cost"
                        },
                        cost: new Decimal(1e70),
                        unlocked(){
                                return hasUpgrade("a", 21) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 22)
                23: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A-li-ator"
                        },
                        description(){
                                return "Remove A 22's base cost"
                        },
                        cost: new Decimal(1e119),
                        unlocked(){
                                return hasUpgrade("a", 22) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 23)
                24: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Al-i-ator"
                        },
                        description(){
                                return "Remove A 23's base cost and unlock Beavers"
                        },
                        cost: new Decimal(5e192),
                        unlocked(){
                                return hasUpgrade("a", 23) || player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 24)
                25: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A--i-ator"
                        },
                        description(){
                                return "Remove A 21's base cost and per upgrade add .01 to A 13's base"
                        },
                        cost: new Decimal("1e636"),
                        unlocked(){
                                return hasUpgrade("b", 12) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 25)
                31: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A--i-ator"
                        },
                        description(){
                                return "Remove A 21's linear exponential cost component and A 23 gives free A 22 levels"
                        },
                        cost: new Decimal("1e705"),
                        unlocked(){
                                return player.b.best.gte(1e4) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 31)
                32: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>All--ator"
                        },
                        description(){
                                return "You get 100% of Beavers upon reset per second and add 1 to its effect exponent"
                        },
                        cost: new Decimal("1e819"),
                        unlocked(){
                                return hasUpgrade("a", 31) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 32)
                33: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A-l--ator"
                        },
                        description(){
                                return "<bdi style='font-size: 80%'>Per upgrade upgrades/10 multiplies Beaver gain and All--ator adds to Beaver upgrade per this row upgrade</bdi>"
                        },
                        cost: new Decimal("1e942"),
                        unlocked(){
                                return hasUpgrade("a", 32) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 33)
                34: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Al---ator"
                        },
                        description(){
                                return "B 12 gives free A 32 levels and add .5 to the Beaver gain exponent"
                        },
                        cost: new Decimal("1e2048"),
                        unlocked(){
                                return hasUpgrade("b", 15) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 34)
                35: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>A----ator"
                        },
                        description(){
                                return "Remove A buyable's base cost and per row 2 Beaver upgrade add .5 to the Beaver gain exponent"
                        },
                        cost: new Decimal("1e5600"),
                        unlocked(){
                                return hasUpgrade("b", 21) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("a", 35)
        },
        buyables: {
                rows: 3,
                cols: 3,
                11: getGeneralizedBuyableData("a", 11, function(){
                        return hasUpgrade("a", 12) || player.b.unlocked
                        }),
                12: getGeneralizedBuyableData("a", 12, function(){
                        return hasUpgrade("a", 12) || player.b.unlocked
                        }),
                13: getGeneralizedBuyableData("a", 13, function(){
                        return hasUpgrade("a", 13) || player.b.unlocked
                        }),
                21: getGeneralizedBuyableData("a", 21, function(){
                        return hasUpgrade("a", 14) || player.b.unlocked
                        }),
                22: getGeneralizedBuyableData("a", 22, function(){
                        return hasUpgrade("a", 15) || player.b.unlocked
                        }),
                23: getGeneralizedBuyableData("a", 23, function(){
                        return hasUpgrade("a", 21) || player.b.unlocked
                        }),
                31: getGeneralizedBuyableData("a", 31, function(){
                        return hasUpgrade("a", 22) || player.b.unlocked
                        }),
                32: getGeneralizedBuyableData("a", 32, function(){
                        return hasUpgrade("a", 23) || player.b.unlocked
                        }),
                33: getGeneralizedBuyableData("a", 33, function(){
                        return hasUpgrade("a", 24) || player.b.unlocked
                        }),
        },
        milestones: {
                1: {
                        requirementDescription(){
                                return "4 A22"
                        },
                        done(){
                                return player.a.buyables[22].gte(4)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: Per milestone add .001 to A 21's base."
                        },
                }, // hasMilestone("a", 1)
                2: {
                        requirementDescription(){
                                return "1e300 Points"
                        },
                        done(){
                                return player.points.gte(1e300)
                        },
                        unlocked(){
                                return hasMilestone("a", 1)
                        },
                        effectDescription(){
                                if (player.b.times > 0 /*|| player.c.unlocked*/) return "Reward: Per milestone raise point gain ^" + makeRed("1.03") + "."
                                return "Reward: Per milestone raise point gain ^1.01."
                        },
                }, // hasMilestone("a", 2)
                3: {
                        requirementDescription(){
                                return "1e650 Points"
                        },
                        done(){
                                return player.points.gte("1e650")
                        },
                        unlocked(){
                                return hasMilestone("a", 2)
                        },
                        effectDescription(){
                                return "Reward: Remove the linear component of A 13's cost."
                        },
                }, // hasMilestone("a", 3)
                4: {
                        requirementDescription(){
                                return "1e1375 Points"
                        },
                        done(){
                                return player.points.gte("1e1375")
                        },
                        unlocked(){
                                return hasMilestone("a", 3)
                        },
                        effectDescription(){
                                return "Reward: Remove the linear component of A 22's cost and A buyables cost nothing."
                        },
                }, // hasMilestone("a", 4)
        },
        infoboxes: {
                introBox: {
                        title: "Introduction",
                        body(){
                                let a = "<h1>" + makeRed("Welcome to PRESTIGE CHAIN REINCARNATED!") + "</h1>"
                                let b = "There are seven pieces of information you should be aware of:"
                                let c = "First, pressing shift (and control occasionally) can often allow you to see more information."
                                let d = "Second, buyables are a key feature of every layer in the main chain, of which the ninth of each layer gives free levels to all prior in its layer."
                                let e = "Furthermore, later layers' buyables give free levels to the same positions in lower layers."
                                let f = "Third, there is a save bank. View it by going to the info tab and clicking \"Show built in saves\" and scrolling down."
                                let g = "Fourth, this game is designed to be played on a computer on Google Chrome. If this does not apply to you there might be some bugs or other issues you run into." 
                                let h = "Fifth, things in " +  makeRed("red") + " are buffs the next layer gives which are automatically given upon resetting once (and not viewable before so)."
                                let i = "Sixth, \"per upgrade\" and \"per milestone\" refer to the number of upgrades or milestones in the layer that the upgrade, milestone, or buyable is in."
                                let j = "Finally, you can click and drag to buy lots of upgrades at once!"

                                return a + br2 + b + br2 + c + br2 + d + br + e + br2 + f + br2 + g + br2 + h + br2 + i + br2 + j
                        },
                },
        },
        tabFormat: {
                "Upgrades": {
                        content: ["main-display",
                                ["prestige-button", "", function (){ return isPassiveGainActive("a") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "Your best Alligators is " + format(player.a.best) : "You have done " + formatWhole(player.a.times) + " Alligator resets"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("a")) {
                                                        if (player.shiftAlias) return "Alligator gain formula is " + getGeneralizedPrestigeButtonText("a")
                                                        return "You are gaining " + format(tmp.a.getResetGain) + " Alligators per second"
                                                }
                                                return "There is a two second cooldown for prestiging (" + format(Math.max(0, 2-player.a.time)) + ")" 
                                        },
                                ],
                                "blank", 
                                "upgrades",
                                ["infobox", "introBox"],],
                        unlocked(){
                                return true
                        },
                },
                "Buyables": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("a")) return "You are gaining " + format(tmp.a.getResetGain) + " Alligators per second"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("a", 12) || player.b.unlocked
                        },
                },
                "Milestones": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "You have done " + formatWhole(player.a.times) + " Alligator resets"
                                        }
                                ],
                                "milestones"],
                        unlocked(){
                                return player.a.buyables[22].gt(0) || player.b.unlocked
                        },
                },
        },
        onPrestige(gain){
                player.a.times ++
        },
        doReset(layer){
                let data = player.a
                if (layer == "a") data.time = 0
                if (!getsReset("a", layer)) return
                
                data.times = 0

                if (!false) { //upgrades
                        let keptUpgrades = 0
                        if (hasMilestone("b", 2)) keptUpgrades += player.b.times
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                if (!false) { //milestones
                        let keptMilestones = 0
                        if (hasMilestone("b", 2)) keptMilestones += player.b.times
                        if (!false) {
                                data.milestones = data.milestones.slice(0, keptMilestones)
                        }
                }

                //resources
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //buyables
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        player.a.buyables[resetBuyables[j]] = decimalZero
                }
        },
})

addLayer("b", {
        name: "Beavers", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        row: 1, // Row the layer is in on the tree (0 is the first row)
        startData() { return {
                unlocked: false,
		points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
        }},
        color: "#EC7D20",
        branches: [],
        requires: new Decimal("1e250"), // Can be a function that takes requirement increases into account
        resource: "Beavers", // Name of prestige currency
        baseResource: "Alligators", // Name of resource prestige is based on
        baseAmount() {return player.a.points.floor()}, // Get the current amount of baseResource
        type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        getResetGain() {
                return getGeneralizedPrestigeGain("b")
        },
        getBaseDiv(){
                let ret = new Decimal(1e230)
                
                return ret
        },
        getGainExp(){
                let ret = new Decimal(2)

                if (hasUpgrade("a", 34))        ret = ret.plus(.5)
                if (hasUpgrade("a", 35))        ret = ret.plus(.5 * player.b.upgrades.filter(x => x < 30 && x > 20).length)

                return ret
        },
        getGainMultPre(){
                let ret = new Decimal(.05)

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("b")

                if (hasUpgrade("b", 13))        ret = ret.times(Decimal.pow(2, player.b.upgrades.length))
                if (hasUpgrade("a", 33))        ret = ret.times(Decimal.pow(player.a.upgrades.length/10, player.a.upgrades.length).max(1))
                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["b11"])

                return ret
        },
        effect(){
                if (!isPrestigeEffectActive("b")) return decimalOne

                let amt = player.b.points

                let exp = new Decimal(1)
                if (hasUpgrade("a", 32))        exp = exp.plus(hasUpgrade("a", 33) ? player.a.upgrades.filter(x => x < 40 && x > 30).length : 1)
                                                exp = exp.plus(CURRENT_BUYABLE_EFFECTS["b13"])

                let ret = amt.times(4).plus(1).pow(exp)

                return ret
        },
        effectDescription(){
                return getGeneralizedEffectDisplay("b")
        },
        getNextAt(){
                return getGeneralizedNextAt("b")
        },
        update(diff){
                let data = player.b

                if (tmp.b.getResetGain.gt(0)) data.unlocked = true

                data.best = data.best.max(data.points)
                doPassiveGain("b", diff)
                
                if (false) {
                        handleGeneralizedBuyableAutobuy(diff, "b")
                } else {
                        data.abtime = 0
                }
                data.time += diff
        },
        layerShown(){return hasUpgrade("a", 24) || player.b.unlocked},
        prestigeButtonText(){
                if (isPassiveGainActive("b")) return ""
                return getGeneralizedPrestigeButtonText("b")
        },
        canReset(){
                return player.b.time >= 2 && !isPassiveGainActive("b") && tmp.b.getResetGain.gt(0)
        },
        upgrades: {
                rows: 5,
                cols: 5,
                11: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>B-aver"
                        },
                        description(){
                                let a = "The Alligator autobuy speed is multiplied by 1 + Beaver resets"
                                return a
                        },
                        cost: new Decimal(20),
                        unlocked(){
                                return hasMilestone("b", 3) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 11)
                12: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Be-ver"
                        },
                        description(){
                                let a = "A 32 gives free A 22 levels and you can bulk [upgrades]x Alligator buyables"
                                return a
                        },
                        cost: new Decimal(1000),
                        unlocked(){
                                return hasUpgrade("b", 11) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 12)
                13: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>B--ver"
                        },
                        description(){
                                let a = "Per upgrade double Beaver gain and A 22 gives free A 13 and A 11 levels"
                                return a
                        },
                        cost: new Decimal(2000),
                        unlocked(){
                                return hasUpgrade("a", 25) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 13)
                14: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Bea-er"
                        },
                        description(){
                                let a = "Per upgrade add .2 to A 32's base and A 31 gives free A 22 levels"
                                return a
                        },
                        cost: new Decimal(1e6),
                        unlocked(){
                                return hasUpgrade("a", 32) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 14)
                15: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>B-a-er"
                        },
                        description(){
                                let a = "A 32 gives free A 21 and A 13 levels and unlock Beaver buyables"
                                return a
                        },
                        cost: new Decimal(6e7),
                        unlocked(){
                                return hasUpgrade("a", 33) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 15)
                21: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Be--er"
                        },
                        description(){
                                let a = "A 21 gives free A 12 and A 13 levels and unlock another buyable"
                                return a
                        },
                        cost: new Decimal(1e13),
                        unlocked(){
                                return hasUpgrade("b", 15) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>B---er"
                        },
                        description(){
                                let a = "B 13 gives free B 11 levels"
                                return a
                        },
                        cost: new Decimal(3e18),
                        unlocked(){
                                return hasUpgrade("b", 21) //|| player.c.unlocked
                        }, 
                }, // hasUpgrade("b", 22)
        },
        buyables: {
                rows: 3,
                cols: 3,
                11: getGeneralizedBuyableData("b", 11, function(){
                        return hasUpgrade("b", 15) //|| player.c.unlocked
                        }),      
                12: getGeneralizedBuyableData("b", 12, function(){
                        return hasMilestone("b", 5) //|| player.b.unlocked
                        }),
                13: getGeneralizedBuyableData("b", 13, function(){
                        return hasUpgrade("b", 21) //|| player.b.unlocked
                        }),
                /*21: getGeneralizedBuyableData("b", 21, function(){
                        return hasUpgrade("a", 14) //|| player.b.unlocked
                        }),
                /*22: getGeneralizedBuyableData("b", 22, function(){
                        return hasUpgrade("a", 15) //|| player.b.unlocked
                        }),
                /*23: getGeneralizedBuyableData("b", 23, function(){
                        return hasUpgrade("a", 21) //|| player.b.unlocked
                        }),
                /*31: getGeneralizedBuyableData("b", 31, function(){
                        return hasUpgrade("a", 22) //|| player.b.unlocked
                        }),
                /*32: getGeneralizedBuyableData("b", 32, function(){
                        return hasUpgrade("a", 23) //|| player.b.unlocked
                        }),
                /*33: getGeneralizedBuyableData("b", 33, function(){
                        return hasUpgrade("a", 23) //|| player.b.unlocked
                        }),/**/
        },
        milestones: {
                1: {
                        requirementDescription(){
                                return "1 Beaver reset"
                        },
                        done(){
                                return player.b.times >= 1
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: A13 gives free A11 levels."
                        },
                }, // hasMilestone("b", 1)
                2: {
                        requirementDescription(){
                                return "2 Beaver resets"
                        },
                        done(){
                                return player.b.times >= 2
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: Per reset keep an Alligator upgrade and milestone and remove A 23's linear cost component."
                        },
                }, // hasMilestone("b", 2)
                3: {
                        requirementDescription(){
                                return "4 Beaver resets"
                        },
                        done(){
                                return player.b.times >= 4
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: Autobuy an Alligator buyable once per second and A 31 gives free A 23 levels."
                        },
                }, // hasMilestone("b", 3)
                4: {
                        requirementDescription(){
                                return "8 Beaver resets"
                        },
                        done(){
                                return player.b.times >= 8
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: The Alligator autobuyer triggers on every buyable per activation and A 32 gives free A 12 levels."
                        },
                }, // hasMilestone("b", 4)
                5: {
                        requirementDescription(){
                                return "500,000,000 Beavers"
                        },
                        done(){
                                return player.b.points.gte(5e8)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: A 32 gives free A 31 levels and unlock another buyable."
                        },
                }, // hasMilestone("b", 5)
                6: {
                        requirementDescription(){
                                return "1e23 Beavers"
                        },
                        done(){
                                return player.b.points.gte(1e23)
                        },
                        unlocked(){
                                return true
                        },
                        effectDescription(){
                                return "Reward: A 31 gives free A 12 levels and remove the linear cost component of A buyables."
                        },
                }, // hasMilestone("b", 6)
        },
        tabFormat: {
                "Upgrades": {
                        content: ["main-display",
                                ["prestige-button", "", function (){ return isPassiveGainActive("b") ? {'display': 'none'} : {}}],
                                ["display-text",
                                        function() {
                                                return shiftDown ? "Your best Beavers is " + format(player.b.best) : "You have done " + formatWhole(player.b.times) + " Beaver resets"
                                        }
                                ],
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("b")) {
                                                        if (player.shiftAlias) return "Beaver gain formula is " + getGeneralizedPrestigeButtonText("b")
                                                        return "You are gaining " + format(tmp.b.getResetGain) + " Beavers per second"
                                                }
                                                return "There is a two second cooldown for prestiging (" + format(Math.max(0, 2-player.b.time)) + ")" 
                                        },
                                ],
                                "blank", 
                                "upgrades"],
                        unlocked(){
                                return true
                        },
                },
                "Buyables": {
                        content: ["main-display",
                                ["display-text",
                                        function() {
                                                if (isPassiveGainActive("b")) return "You are gaining " + format(tmp.b.getResetGain) + " Beavers per second"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("b", 15) //|| player.c.unlocked
                        },
                },
                "Milestones": {
                        content: [
                                "main-display",
                                ["display-text",
                                        function() {
                                                return "You have done " + formatWhole(player.b.times) + " Beaver resets"
                                        }
                                ],
                                "milestones"],
                        unlocked(){
                                return player.b.times > 0 //|| player.c.unlocked
                        },
                },
        },
        onPrestige(gain){
                player.b.times ++
        },
        doReset(layer){
                let data = player.b
                if (layer == "b") data.time = 0
                if (!getsReset("b", layer)) return
                
                data.times = 0

                if (!false) { //upgrades
                        let keptUpgrades = 0
                        if (false) keptUpgrades += 0
                        if (!false) {
                                data.upgrades = data.upgrades.slice(0, keptUpgrades)
                        }
                }

                //resources
                data.points = decimalZero
                data.total = decimalZero
                data.best = decimalZero

                //buyables
                let resetBuyables = [11, 12, 13, 21, 22, 23, 31, 32, 33]
                for (let j = 0; j < resetBuyables.length; j++) {
                        player.a.buyables[resetBuyables[j]] = decimalZero
                }
        },
})

addLayer("ach", {
        name: "Achievements",
        symbol: "⭑", 
        position: 1,
        startData(){ return {
                unlocked: true,
		points: decimalZero,
                best: decimalZero,
                total: decimalZero,
                abtime: 0,
                time: 0,
                times: 0,
                autotimes: 0,
                hiddenRows: 0,
                clickedYeet: 0,
                completedRows: 0,
        }},
        color: "#FFC746",
        branches: [],
        requires: decimalZero,
        resource: "Achievements",
        baseResource: "points",
        baseAmount(){return decimalZero},
        type: "none",
        update(diff){
                let data = player.ach
                data.points = new Decimal(data.achievements.length).max(data.points)
                data.best = data.best.max(data.points)
                if (hasCompletedFirstNRows(player.ach.completedRows + 1)){
                        player.ach.completedRows ++
                }
        },
        row: "side",
        hotkeys: [
                {
                        key: "THIS SHOULD NOT BE POSSIBLE",
                        description: makeBlue("<b>Generally applicable</b>:"),
                        onPress(){
                                console.log("oops something went really badly wrong")
                        },
                },
                {key: "Control+C", description: "Control+C: Go to changelog", onPress(){
                                showTab("changelog-tab")
                        }
                },
                {key: ",", description: ",: Move one tab to the left", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                player.subtabs[l].mainTabs = getNextLeftTab(l)
                        }
                },
                {key: ".", description: ".: Move one tab to the right", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                player.subtabs[l].mainTabs = getNextRightTab(l)
                        }
                },
                {key: "ArrowLeft", description: "Left Arrow: Move one tab to the left", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                if (!player.arrowHotkeys) return
                                player.subtabs[l].mainTabs = getNextLeftTab(l)
                        }
                },
                {key: "ArrowRight", description: "Right Arrow: Move one tab to the right", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                if (!player.arrowHotkeys) return
                                player.subtabs[l].mainTabs = getNextRightTab(l)
                        }
                },
                {key: "shift+<", description: "Shift+,: Move all the way to the left", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                k = getUnlockedSubtabs(l)
                                player.subtabs[l].mainTabs = k[0]
                        }
                },
                {key: "shift+>", description: "Shift+.: Move all the way to the right", 
                        onPress(){
                                let l = player.tab
                                if (layers[l] == undefined) return
                                k = getUnlockedSubtabs(l)
                                player.subtabs[l].mainTabs = k[k.length-1]
                        }
                },
                {key: "Control+S", description: "Control+S: Save", 
                        onPress(){
                                save()
                        }
                },
                {key: "shift+Control+S", description: "Shift+Control+S: Save", 
                        onPress(){
                                save()
                        }
                },
                {key: "shift+Control+E", description: "Shift+Control+E: Force endgame",
                        onPress(){ // forces the endgame screen to pop up 
                                forceEndgame = true
                                player.keepGoing = false
                        }
                },
                {key: " ", description: "Space: Toggle Pause", 
                        onPress(){
                                if (player.spaceBarPauses) player.paused = !player.paused
                        }
                },
                {
                        key: "THIS SHOULD NOT BE POSSIBLE2",
                        description: br + makeBlue("<b>Jump to locations</b>:"),
                        onPress(){
                                console.log("oops something went really badly wrong")
                        },
                },
                {key: "shift+!", description: "Shift+1: Go to achievements", 
                        onPress(){
                                player.tab = "ach"
                        }
                },
                {key: "shift+A", description: "Shift+A: Go to Alligator", 
                        onPress(){
                                if (player.a.unlocked) player.tab = "a"
                        }
                },
                {key: "shift+B", description: "Shift+B: Go to Beaver", 
                        onPress(){
                                if (player.b.unlocked) player.tab = "b"
                        }
                },
                {
                        key: "THIS SHOULD NOT BE POSSIBLE3",
                        description: br + makeBlue("<b>Prestige</b>:"),
                        onPress(){
                                console.log("oops something went really badly wrong")
                        },
                        unlocked(){
                                return true
                        },
                },
                {key: "a", description: "A: Go to Alligators",
                        onPress(){
                                if (canReset("a")) doReset("a")
                        }
                },
                {key: "b", description: "B: Reset for Beavers",
                        onPress(){
                                if (canReset("b")) doReset("b")
                        }
                },
                {
                        key: "THIS SHOULD NOT BE POSSIBLE4",
                        description: br + makeBlue("<b>Other</b>:"),
                        onPress(){
                                console.log("oops something went really badly wrong")
                        },
                        unlocked(){
                                return true
                        },
                },
        ],
        layerShown(){return true},
        prestigeButtonText(){
                return ""
        },
        canReset(){
                return false
        },
        achievements: getFirstNAchData(Object.keys(PROGRESSION_MILESTONES).length),
        clickables: {
                rows: 1,
                cols: 3,
                11: {
                        title(){
                                return "<h3 style='color: #0033FF'>Hide the top row</h3>"
                        },
                        display(){
                                return "Shift: Hides top layers until an unfinished layer"
                        },
                        unlocked(){
                                return true
                        },
                        canClick(){
                                if (player.shiftAlias) return true
                                return player.ach.hiddenRows < Object.keys(PROGRESSION_MILESTONES).length/7
                        },
                        onClick(){
                                if (!this.canClick()) return
                                if (!player.shiftAlias) {
                                        player.ach.hiddenRows ++
                                        return
                                }
                                player.ach.hiddenRows = 0
                                let b = 0
                                while (hasCompletedFirstNRows(player.ach.hiddenRows + 1)) {
                                        b ++ 
                                        player.ach.hiddenRows ++
                                        if (b > 1000) {
                                                console.log('uh oh')
                                                return
                                        }
                                }
                        },
                },
                12: {
                        title(){
                                return "<h3 style='color: #0033FF'>Show a row</h3>"
                        },
                        display(){
                                return "Shift: Show all rows"
                        },
                        unlocked(){
                                return true
                        },
                        canClick(){
                                return player.ach.hiddenRows > 0
                        },
                        onClick(){
                                if (!this.canClick()) return
                                if (player.shiftAlias) player.ach.hiddenRows = 0
                                else player.ach.hiddenRows --
                        },
                },
                13: {
                        title(){
                                return "<h3 style='color: #0033FF'>Click</h3>"
                        },
                        display(){
                                return formatWhole(player.ach.clickedYeet) + (player.ach.clickedYeet == 69 ? " nice" : "")
                        },
                        unlocked(){
                                return true
                        },
                        canClick(){
                                return true
                        },
                        onClick(){
                                player.ach.clickedYeet ++ 
                        },
                },
        },
        tabFormat: {
                "Achievements": {
                        content: [
                                "main-display-goals",
                                "clickables",
                                ["display-text",function(){
                                        return "You have completed the first " + formatWhole(player.ach.completedRows) + " rows"
                                }],
                                "achievements",
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
        doReset(layer){},
})

