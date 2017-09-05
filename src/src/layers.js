 // ===============================================
var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.AppBg);
        this.sprite.setPosition(size.width * 0.5, size.height * 0.5);
        this.addChild(this.sprite);

        return true;
    }
});

// ===============================================
var BarsLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.createScreen();

        return true;
    },
    createScreen: function () {
        var size = cc.director.getWinSize();

        var topBar = new cc.Sprite(res.TopBarImg);
        var topBarSize = topBar.getContentSize();
        topBar.setPosition(size.width * .5, size.height - topBarSize.height * .5);
        this.addChild(topBar, 0);

        // ----------------------
        // var bottomBar = new cc.Sprite(res.BottomBarImg);
        // var bottomBarSize = bottomBar.getContentSize();
        // bottomBar.setPosition(size.width * .5, bottomBarSize.height * .5);
        // this.addChild(bottomBar, 1);
    }
});

// ===============================================
var BackgroundLoginLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.LoginBg);
        this.sprite.setPosition(size.width * 0.5, size.height * 0.5);
        this.addChild(this.sprite);

        return true;
    }
});

// ===============================================
var StampLoginLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.StampImg);
        this.sprite.setPosition(size.width * 0.4, size.height * 0.5);
        this.addChild(this.sprite);

        return true;
    }
});

// ===============================================
var GameOverLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.sprite = new cc.Sprite(res.GameOverBg);
        this.sprite.setPosition(size.width * 0.5, size.height * 0.5);
        this.addChild(this.sprite);

        return true;
    },

    createScreen: function () {
        var size = cc.director.getWinSize();
        this.addChild(new BarsLayer());

        // this.sprite = new cc.Sprite(res.GameOverBg);
        // this.sprite.setPosition(size.width * 0.5, size.height * 0.5);
        // this.addChild(this.sprite);

        // var topBar = new cc.Sprite(res.TopBarImg);
        // var topBarSize = topBar.getContentSize();
        // topBar.setPosition(size.width * .5, size.height - topBarSize.height * .5);
        // this.addChild(topBar, 0);

        // ----------------------
        // var bottomBar = new cc.Sprite(res.BottomBarImg);
        // var bottomBarSize = bottomBar.getContentSize();
        // bottomBar.setPosition(size.width * .5, bottomBarSize.height * .5);
        // this.addChild(bottomBar, 1);
    }
});