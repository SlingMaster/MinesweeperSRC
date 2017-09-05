// constants --
var CLOSE = 0, OPEN = 1, FIRE = 2, MARK = 3, MARK_ERROR = 4, MINE = 5;


// variables --
var cells_per_row = 3;
var total_mines = 5;
var marked_cells = 0;
var cells = new Array();

// game state
var gameAlive = false;
var timePlayed = 0;

// game preset
var SOUND = true;
var MUSIC = false;
var GAME_LEVEL = "beginner";
var LAST_RESULT = { "login": "noname", "game_level": GAME_LEVEL, "timePlayed": 0 };

// ===============================================
window.onload = function () {
    // window.localStorage.clear();
    resumeAppState();
    cc.game.onStart = function () {
        if (!cc.sys.isNative && document.getElementById("cocosLoading")) {
            //If referenced loading.js, please remove it
            document.body.removeChild(document.getElementById("cocosLoading"));
        }

        // Pass true to enable retina display, on Android disabled by default to improve performance
        cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
        // Adjust viewport meta
        cc.view.adjustViewPort(true);
        // Uncomment the following line to set a fixed orientation for your game
        cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
        // Setup the resolution policy and design resolution size
        if (isTouchDevice()) {
            cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
        } else {
            cc.view.setDesignResolutionSize(640, 1024, cc.ResolutionPolicy.SHOW_ALL);
        }

        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);

        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new SplashScene());
        }, this);
    };

    cc.game.run("gameCanvas");
};

// ===============================================
function initGame(level) {
    timePlayed = 0;
    LAST_RESULT["game_level"] = level;
    switch (level) {
        case "beginner":
            cells_per_row = 5;
            total_mines = 8;
            break;
        case "intermediate":
            cells_per_row = 8;
            total_mines = 15
            break;
        case "expert":
            cells_per_row = 9;
            total_mines = 18;
            break;
    }

    cells = [];
    length = cells_per_row * cells_per_row;
    for (var i = 0; i < length; i++) {
        cells.push({ "mine": (i < total_mines), "mark": false, "open": false, "value": i });
    }
    cells.shuffle();
    console.log("initGame | cells:", length, " | total_mines: " + total_mines);
};

// ===============================================
// sound effects
// ===============================================
function buttonSoundEffect() {
    if (SOUND) {
        cc.audioEngine.playEffect(res.ClickSound);
    }
}

function bandSoundEffect() {
    if (SOUND) {
        cc.audioEngine.playEffect(res.Band);
    }
}

function playStopMusic() {
    if (MUSIC === true) {
        cc.audioEngine.playMusic(res.Music, true);
    } else {
        cc.audioEngine.stopMusic(true);
    }
}

// ===============================================
// Utils
// ===============================================
Array.prototype.shuffle = function (b) {
    var i = this.length, j, t;
    while (i) {
        j = Math.floor((i--) * Math.random());
        t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

// ===============================================
function isTouchDevice() {
    return !!('ontouchstart' in window);
}

// ===============================================
function isDefined(json) {
    return (json !== null && json !== undefined);
}

// ===============================================
function isUndefined(json) {
    return (json === null || json === undefined);
}

// ===============================================
function getFormatStrXX(val) {
    var str = String(val);
    if (str.length === 1) {
        str = "0" + str;
    }
    return str;
}

// ===============================================
function getGameTimeInfo(val) {
    var m = Math.floor(val / 60)
    var s = Math.floor(val - m * 60);
    return "TIME • " + getFormatStrXX(m) + ":" + getFormatStrXX(s);
}

// ===============================================
// Html5Storage
// ===============================================
function supportsHtml5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

// ===============================================
function resumeAppState() {
    console.warn("resumeAppState");
    if (!supportsHtml5Storage()) {
        SOUND = true;
        MUSIC = false;
        console.warn("Not supports Local Storage");
        return false;
    } else {
        if (localStorage["sound"] !== null) {
            SOUND = (localStorage["sound"] === "true") || true;
            MUSIC = (localStorage["music"] === "true") || false;
            if (isDefined(localStorage["last_result"])) {
                LAST_RESULT = JSON.parse(localStorage["last_result"]);
            }
            return true;
        }
    }

}

// ===============================================
function saveAppState() {
    if (!supportsHtml5Storage()) {
        return false;
    }
    localStorage["sound"] = SOUND;
    localStorage["music"] = MUSIC;
    LAST_RESULT["timePlayed"] = Math.floor(timePlayed);
    localStorage["last_result"] = JSON.stringify(LAST_RESULT);

    console.info("saveAppState | sound : ", localStorage["sound"], " | music :", localStorage["music"]);
    console.info("saveAppState | last_result", localStorage["last_result"]);
    return true;
}
