function getColRowCode(det, base = 7){
        let tens = Math.floor((det-1)/base) + 1
        let extra = det % base == 0 ? base : det % base
        return 10 * tens + extra
}

function getNumberNameLT1000(n){ //currently only works up to 1000
        if (n < 100) return getNumberNameLT100(n)
        if (n % 100 == 0) return getNumberNameLT100(n / 100) + " Hundred"
        let hun = getNumberNameLT100(Math.floor(n / 100)) + " Hundred and "
        return hun + getNumberNameLT100(n % 100)
}

function getNumberName(n){ //currently only works up to 1e6
        if (n < 1000) return getNumberNameLT1000(n)
        if (n < 1e6) {
                if (n % 1000 == 0) return getNumberNameLT1000(n / 1000) + " Thousand"
                let thou = getNumberNameLT1000(Math.floor(n / 1000)) + " Thousand "
                return thou + getNumberNameLT1000(n % 1000)
        }
}

function getNumberNameLT100(n){
        let units = {
                1: "One",
                2: "Two",
                3: "Three",
                4: "Four",
                5: "Five",
                6: "Six",
                7: "Seven",
                8: "Eight",
                9: "Nine",
        }
        let tens = {
                2: "Twenty",
                3: "Thirty",
                4: "Forty",
                5: "Fifty",
                6: "Sixty",
                7: "Seventy",
                8: "Eighty",
                9: "Ninety",
        }
        let forced = {
                10: "Ten",
                11: "Eleven",
                12: "Twelve",
                13: "Thirteen",
                14: "Fourteen",
                15: "Fifteen",
                16: "Sixteen",
                17: "Seventeen",
                18: "Eighteen", 
                19: "Nineteen",
        }
        if (forced[n] != undefined) return forced[n]
        if (n == 0) return "Zero"
        if (n % 10 == 0) return tens[n/10]
        if (n < 10) return units[n]
        return tens[Math.floor(n/10)] + "-" + units[n % 10].toLowerCase()
}

function getAchStuffFromNumber(n){
        let name = getNumberName(n)
        let id = getColRowCode(n)
        let done = function(){
                return hasAchievement("ach", id) || PROGRESSION_MILESTONES[n]() 
        }
        let isChall = false
        if (n > 301 && n < 309) isChall = true
        if (n > 323 && n < 330) isChall = true
        let startStr = isChall ? "Complete " : "Get "
        let tooltip = function(){
                return startStr + PROGRESSION_MILESTONES_TEXT[n]
        }
        let style = function(){
                let tens = id - id % 10
                for (i = 1; i <= 7; i++){
                        if (!hasAchievement("ach", tens + i)) return {}
                }
                
                let a = Math.sin(tens/35 + 0) 
                let b = Math.sin(tens/35 + 1.5)
                let c = Math.sin(tens/35 + 3)
                a = convertToB16(Math.floor(a*128) + 128)
                b = convertToB16(Math.floor(b*128) + 128)
                c = convertToB16(Math.floor(c*128) + 128)
                return {"background-color": "#" + String(a) + String(b) + String(c)}
        }
        let unlocked 
        if (n <= 56) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return true
                }
        } else if (n <= 161) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.tokens.unlocked
                }
        } else if (n <= 189) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.p.unlocked
                }
        } else if (n <= 301) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.l.unlocked
                }
        } else if (n <= 385) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.d.unlocked
                }
        } else if (n <= 532) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.cells.unlocked
                }
        } else if (n <= 595) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.t.unlocked
                }
        } else if (n <= 742) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.or.unlocked
                }
        } else if (n <= 1111) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.an.unlocked
                }
        } else if (n <= Infinity) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return false
                }
        } 
        return {name: name, done: done, tooltip: tooltip, unlocked: unlocked, style: style}
}

function getFirstNAchData(n){
        let obj = {}
        for (i = 1; i <= n; i++){
                obj[getColRowCode(i)] = getAchStuffFromNumber(i)
        }
        obj.rows = Math.ceil(n / 7)
        obj.cols = 7
        return obj
}

function hasCompletedFirstNRows(n){
	for (i = 1; i <= n; i++){
		for (j = 1; j <= 7; j++){
			x = 10 * i + j
			if (layers.ach.achievements[x] == undefined) return false
			if (!hasAchievement("ach", x)) return false
		}
	}
	return true
}

PROGRESSION_MILESTONES = {
        1:   () => player.points.gte(1),
        2:   () => player.points.gte(Decimal.pow(2, 0).pow10()),
        3:   () => player.points.gte(Decimal.pow(2, 1).pow10()),
        4:   () => player.points.gte(Decimal.pow(2, 2).pow10()),
        5:   () => player.points.gte(Decimal.pow(2, 3).pow10()),
        6:   () => player.points.gte(Decimal.pow(2, 4).pow10()),
        7:   () => player.points.gte(Decimal.pow(2, 5).pow10()),
        8:   () => player.a.points.gte(1),
        9:   () => player.a.points.gte(Decimal.pow(3, 0).pow10()),
        10:  () => player.a.points.gte(Decimal.pow(3, 1).pow10()),
        11:  () => player.a.points.gte(Decimal.pow(3, 2).pow10()),
        12:  () => player.a.points.gte(Decimal.pow(3, 3).pow10()),
        13:  () => player.a.points.gte(Decimal.pow(3, 4).pow10()),
        14:  () => player.a.points.gte(Decimal.pow(3, 5).pow10()),
        15:  () => player.points.gte(Decimal.pow(2, 6).pow10()),
        16:  () => player.points.gte(Decimal.pow(2, 7).pow10()),
        17:  () => player.points.gte(Decimal.pow(2, 8).pow10()),
        18:  () => player.points.gte(Decimal.pow(2, 9).pow10()),
        19:  () => player.points.gte(Decimal.pow(2, 10).pow10()),
        20:  () => player.points.gte(Decimal.pow(2, 11).pow10()),
        21:  () => player.points.gte(Decimal.pow(2, 12).pow10()),
        22:  () => player.b.points.gte(1),
        23:  () => player.b.points.gte(Decimal.pow(4, 0).pow10()),
        24:  () => player.b.points.gte(Decimal.pow(4, 1).pow10()),
        25:  () => player.b.points.gte(Decimal.pow(4, 2).pow10()),
        26:  () => player.b.points.gte(Decimal.pow(4, 3).pow10()),
        27:  () => player.b.points.gte(Decimal.pow(4, 4).pow10()),
        28:  () => player.b.points.gte(Decimal.pow(4, 5).pow10()),
        29:  () => player.a.points.gte(Decimal.pow(3, 6).pow10()),
        30:  () => player.a.points.gte(Decimal.pow(3, 7).pow10()),
        31:  () => player.a.points.gte(Decimal.pow(3, 8).pow10()),
        32:  () => player.a.points.gte(Decimal.pow(3, 9).pow10()),
        33:  () => player.a.points.gte(Decimal.pow(3, 10).pow10()),
        34:  () => player.a.points.gte(Decimal.pow(3, 11).pow10()),
        35:  () => player.a.points.gte(Decimal.pow(3, 12).pow10()),
        36:  () => player.points.gte(Decimal.pow(2, 13).pow10()),
        37:  () => player.points.gte(Decimal.pow(2, 14).pow10()),
        38:  () => player.points.gte(Decimal.pow(2, 15).pow10()),
        39:  () => player.points.gte(Decimal.pow(2, 16).pow10()),
        40:  () => player.points.gte(Decimal.pow(2, 17).pow10()),
        41:  () => player.points.gte(Decimal.pow(2, 18).pow10()),
        42:  () => player.points.gte(Decimal.pow(2, 19).pow10()),
}

PROGRESSION_MILESTONES_TEXT = {
        1:   "1 Point",
        2:   "10 Points",
        3:   "100 Points",
        4:   "10,000 Points",
        5:   "100,000,000 Points",
        6:   "1e16 Points",
        7:   "1e32 Points",
        8:   "1 Alligator",
        9:   "10 Alligators",
        10:  "1,000 Alligators",
        11:  "1,000,000,000 Alligators",
        12:  "1e27 Alligators",
        13:  "1e81 Alligators",
        14:  "1e243 Alligators",
        15:  "1e64 Points",
        16:  "1e128 Points",
        17:  "1e256 Points",
        18:  "1e512 Points",
        19:  "1e1024 Points",
        20:  "1e2048 Points",
        21:  "1e4096 Points",
        22:  "1 Beaver",
        23:  "10 Beavers",
        24:  "10,000 Beavers",
        25:  "1e16 Beavers",
        26:  "1e64 Beavers",
        27:  "1e256 Beavers",
        28:  "1e1024 Beavers",
        29:  "1e729 Alligators",
        30:  "1e2187 Alligators",
        31:  "1e6561 Alligators",
        32:  "1e19,683 Alligators",
        33:  "1e59,049 Alligators",
        34:  "1e177,147 Alligators",
        35:  "1e531,441 Alligators",
        36:  "1e8192 Points",
        37:  "1e16,384 Points",
        38:  "1e32,768 Points",
        39:  "1e65,536 Points",
        40:  "1e131,072 Points",
        41:  "1e262,144 Points",
        42:  "1e524,288 Points",
}









