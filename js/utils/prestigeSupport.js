function getsReset(layer, layerPrestiging) {
        let ids = {
                "a": 1,
                "b": 2,
                "c": 3,
                "d": 4,
                "e": 5,
                "f": 6,
                "g": 7,
                "h": 8,
                "i": 9,
                "j": 10,
                "k": 11,
                "l": 12,
                "m": 13,
                "n": 14,
                "o": 15,
        }
        return ids[layer] < ids[layerPrestiging]
}

function isPrestigeEffectActive(layer){
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
        console.log("issue")
}

function getPrestigeGainChangeExp(layer){
        let ret = decimalOne
        return ret
}

function getDilationExp(layer){
        let ret = decimalOne
        return ret
}

function doPrestigeGainChange(amt, layer){
        return dilate(/**/amt.pow(getPrestigeGainChangeExp(layer))/**/, getDilationExp(layer))
}

function getGeneralizedPrestigeGain(layer){
        let pts = tmp[layer].baseAmount
        let pre = tmp[layer].getGainMultPre
        let exp = tmp[layer].getGainExp
        let pst = tmp[layer].getGainMultPost
        let div = tmp[layer].getBaseDiv

        let a = pts.div(div)
        if (a.lt(1)) return decimalZero

        let ret = a.log10().times(pre).pow(exp).times(pst)

        return doPrestigeGainChange(ret, layer).floor()
}

function getGeneralizedEffectDisplay(layer){
        if (player.tab != layer) return ""
        let eff = tmp[layer].effect
        let a = "which buffs point and all previous prestige gain by "

        return a + format(eff) + "."
}

function getGeneralizedInitialPostMult(layer){
        let x = decimalOne
        let yet = false
        for (let i = 0; i < LAYERS.length; i++){
                if (layers[LAYERS[i]].row == "side") continue
                if (yet) x = x.times(tmp[LAYERS[i]].effect || decimalOne)
                if (LAYERS[i] == layer) yet = true
        }
        return x
}

function getGeneralizedNextAt(layer){
        let gain= tmp[layer].getResetGain
        let pre = tmp[layer].getGainMultPre
        let exp = tmp[layer].getGainExp
        let pst = tmp[layer].getGainMultPost
        let div = tmp[layer].getBaseDiv

        return gain.plus(1).div(pst).max(1).root(exp).div(pre).pow10().times(div).ceil()
}

function getGeneralizedPrestigeButtonText(layer){
        let gain= tmp[layer].getResetGain
        let pre = tmp[layer].getGainMultPre
        let exp = tmp[layer].getGainExp
        let pst = tmp[layer].getGainMultPost
        let div = tmp[layer].getBaseDiv

        let nextnum = gain.plus(1).div(pst).max(1).root(exp).div(pre).pow10().times(div).ceil()

        let nextAt = ""
        if (gain.lt(1e6)) {
                nextAt = "<br>Next at " + format(nextnum) + " " + layers[layer].baseResource
                let ps = gain.div(player[layer].time || 1)

                if (ps.lt(1000/3600)) nextAt += "<br>" + format(ps.times(3600)) + "/h"
                else if (ps.lt(1000/60)) nextAt += "<br>" + format(ps.times(60)) + "/m"
                else nextAt += "<br>" + format(ps) + "/s"
        }
        if (player[layer].best.eq(0) && gain.eq(0)){
                nextAt = "<br>Get " + format(pre.pow(-1).pow10().times(div)) + " " + layers[layer].baseResource + " for the first " + layers[layer].resource.slice(0,-1)
        }

        return "Reset for " + formatWhole(gain) + " " + layers[layer].resource + nextAt
}



