var CUSTOM_SAVES = { 
}

var CUSTOM_SAVES_IDS = Object.keys(CUSTOM_SAVES)
var CUSTOM_SAVE_IDS = CUSTOM_SAVES_IDS //proxy
REORDER = [

        
            ]

function reorderSaveIds(){
        let a = []
        for (i in REORDER) {
                a.push(CUSTOM_SAVES_IDS[REORDER[i]])
        }
        CUSTOM_SAVES_IDS = a
}

reorderSaveIds()



