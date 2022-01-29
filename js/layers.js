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
        if (hasMilestone("a", 2))       ret = ret.times(Decimal.pow(1.01, player.a.milestones.length))
        
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
        requires: decimalOne, // Can be a function that takes requirement increases into account
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

                return ret
        },
        getGainMultPre(){
                let ret = decimalOne

                return ret
        },
        getGainMultPost(){
                let ret = getGeneralizedInitialPostMult("a")

                                                ret = ret.times(CURRENT_BUYABLE_EFFECTS["a12"])

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
                if (isPassiveGainActive("a")) {
                        data.points = data.points.plus(tmp.a.getResetGain.times(diff))
                        data.total   = data.total.plus(tmp.a.getResetGain.times(diff))
                        data.autotimes += diff
                        if (data.autotimes > 10) data.autotimes = 10
                        if (data.autotimes > 1) {
                                data.autotimes += -1
                                data.times ++
                        }
                }
                if (false) {
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
                                return player.a.best.gt(0) //|| player.b.unlocked
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
                                return player.a.best.gt(10) //|| player.b.unlocked
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
                                return player.a.best.gt(1000) || player.a.buyables[11].gte(12) //|| player.b.unlocked
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
                                return player.a.best.gt(1e11) || player.a.buyables[12].gte(44) //|| player.b.unlocked
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
                                return player.a.best.gt(1e11) || player.a.buyables[12].gte(80) //|| player.b.unlocked
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
                                return player.a.best.gt(1e42) || player.a.buyables[12].gte(132) //|| player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 21)
                22: {
                        title(){
                                return "<bdi style='color: #" + getUndulatingColor() + "'>Al--gator"
                        },
                        description(){
                                return "Remove the linear exponential component of A 11's cost"
                        },
                        cost: new Decimal(1e70),
                        unlocked(){
                                return player.a.best.gt(1e72) || player.a.buyables[12].gte(192) //|| player.b.unlocked
                        }, 
                }, // hasUpgrade("a", 22)
        },
        buyables: {
                rows: 3,
                cols: 3,
                11: getGeneralizedBuyableData("a", 11, function(){
                        return hasUpgrade("a", 12) //|| player.b.unlocked
                        }),
                12: getGeneralizedBuyableData("a", 12, function(){
                        return hasUpgrade("a", 12) //|| player.b.unlocked
                        }),
                13: getGeneralizedBuyableData("a", 13, function(){
                        return hasUpgrade("a", 13) //|| player.b.unlocked
                        }),
                21: getGeneralizedBuyableData("a", 21, function(){
                        return hasUpgrade("a", 14) //|| player.b.unlocked
                        }),
                22: getGeneralizedBuyableData("a", 22, function(){
                        return hasUpgrade("a", 15) //|| player.b.unlocked
                        }),
                23: getGeneralizedBuyableData("a", 23, function(){
                        return hasUpgrade("a", 21) //|| player.b.unlocked
                        }),/*
                31: getGeneralizedBuyableData("a", 31, function(){
                        return hasUpgrade("a", 22) //|| player.b.unlocked
                        }),
                32: getGeneralizedBuyableData("a", 32, function(){
                        return hasUpgrade("a", 23) //|| player.b.unlocked
                        }),
                33: getGeneralizedBuyableData("a", 33, function(){
                        return hasUpgrade("a", 23) //|| player.b.unlocked
                        }),
                        */
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
                                return true
                        },
                        effectDescription(){
                                return "Reward: Per milestone raise point gain ^1.01."
                        },
                }, // hasMilestone("a", 2)
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
                                                if (isPassiveGainActive("a")) return "You are gaining " + format(tmp.a.getResetGain) + " Alligators per second"
                                                return "There is a two second cooldown for prestiging (" + format(Math.max(0, 2-player.a.time)) + ")" 
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
                                                if (isPassiveGainActive("a")) return "You are gaining " + format(tmp.a.getResetGain) + " Alligators per second"
                                                return ""
                                        },
                                ],
                                "buyables"],
                        unlocked(){
                                return hasUpgrade("a", 12) //|| player.b.unlocked
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
                                return player.a.buyables[22].gt(0) //|| player.b.unlocked
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

