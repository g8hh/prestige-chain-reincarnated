function getPointGen(){
	let gain = getPointConstant()
        gain = gain.times(getPointMultiplier())
        gain = gain.pow(getPointExponentiation())
        gain = dilate(gain, getPointDilationExponent())

	return gain
}

function getPointConstant(){
        let ret = new Decimal(.1)

        return ret
}

function getPointMultiplier(){
        let ret = decimalOne

        return ret
}

function getPointExponentiation(){
        let exp = decimalOne
        
        return exp
}

function getPointDilationExponent(){
        let exp = decimalOne
        
        return exp
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


