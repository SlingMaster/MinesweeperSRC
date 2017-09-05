var LABEL_COLOR = cc.color(204,204, 238);
var TEXT_COLOR = cc.color(255, 255, 255);
var WARN_TEXT_COLOR = cc.color(255, 32, 0);
var TRANSITION_LEAD_TIME = .5;
var LABEL_FONT_SIZE = 26;
// ===============================================
//var menuItem = new cc.MenuItemSprite( normalSprite, selectedSprite, disabledSprite, functionToCall );

var MenuItem = cc.MenuItemSprite.extend({
    ctor: function (caption, callback) {

        var menuNormal = new cc.Sprite(res.MenuItem_png);
        var menuSelected = new cc.Sprite(res.MenuItem_png);

        this._super(menuNormal, menuSelected, null, this.onEvent(callback), this);
        // this.setOpacity(90);
        this.setScale(1.0);

        var size = this.getContentSize();

        var label = new cc.LabelTTF(caption, "Arial", 32);
        label.setPosition(size.width * 0.5, size.height * 0.5);
        this.addChild(label);
    },
    onEvent: function (callback) {
        return function () {
            buttonSoundEffect();

            // WEB
            //var scale = new cc.ScaleBy(0.5, 1.5);

            //var easeScale = new cc.EaseBackIn(scale);
            // this.setOpacity(100);
            var cbFunc = new cc.callFunc(callback);

            var secuence = new cc.Sequence(cbFunc);
            // var secuence = new cc.Sequence(easeScale, cbFunc);

            this.runAction(secuence);
            //

            // android, win32
            // callback();
            //
        }
    }
});
// ===============================================
var Button = ccui.Button.extend({
    ctor: function (name, caption, callback) {
        this._super();

        this.createScreen(name, caption);
        this.createListeners(callback)
    },
    createScreen: function (name, caption) {
        this.loadTextures(res.ButtonNormal_png, res.ButtonSelected_png);
        this.setName(name);
        var size = this.getContentSize();

        var captionLabel = new cc.LabelTTF(caption, "Arial", 32);
        captionLabel.setPosition(size.width * 0.5, size.height * 0.5);
        captionLabel.setColor(TEXT_COLOR);
        this.addChild(captionLabel);
    },
    createListeners: function (callback) {
        this.addTouchEventListener(this.touchEvent(callback), this);
    },
    touchEvent: function (callback) {
        return function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                buttonSoundEffect();
                callback();
            }
        };
    }
});

// ===============================================
var IconButton = ccui.Button.extend({
    ctor: function (name, normalIcon, selectIcon, callback) {
        this._super();

        this.createScreen(name, normalIcon, selectIcon);
        this.createListeners(callback)
    },
    createScreen: function (name, normalIcon, selectIcon) {
        this.loadTextures(normalIcon, selectIcon);
        this.setName(name);
    },
    createListeners: function (callback) {
        this.addTouchEventListener(this.touchEvent(callback), this);
    },
    touchEvent: function (callback) {
        return function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                buttonSoundEffect();
                callback();
            }
        };
    }
});
