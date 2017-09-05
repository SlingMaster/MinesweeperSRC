var GameOverScene = cc.Scene.extend({
    ctor: function () {
        this._super();
    },

    onEnter: function () {

        this._super();

        this.addChild(new GameOverLayer());
        this.addChild(new BarsLayer());

        var size = cc.director.getWinSize();

        var labelResult = cc.LabelTTF.create(getGameTimeInfo(timePlayed), "Arial", 32);
        labelResult.setPosition(size.width * .5, size.height * .5 - 100);
        this.addChild(labelResult, 0); 
        // ----------------------
        var labelResultMines = cc.LabelTTF.create("MINES • " + marked_cells + "/" + total_mines, "Arial", 32);
        labelResultMines.setPosition(size.width * .5, size.height * .5 - 140);
        this.addChild(labelResultMines, 1);

        // ??? разобраться со спрайтами добавить анимацию на сцену
        // информацию  выигрыш or проигрыш

        // ----------------------
        var replayButton = new IconButton("replayBTN", res.ReplayImg, null, function () {
            //replay
            initGame(LAST_RESULT["game_level"]);
            cc.director.runScene(new GameScene());
        });
        var buttonSize = replayButton.getContentSize();
        replayButton.setPosition(size.width * 0.25, 90);
        this.addChild(replayButton, 2);

        // ----------------------
        var menuButton = new IconButton("menuBTN", res.MenuImg, null, function () {
            // exit game and save last result
            saveAppState();
            cc.director.runScene(new cc.TransitionCrossFade(TRANSITION_LEAD_TIME, new MainScene()));
        });

        var buttonSize = menuButton.getContentSize();
        menuButton.setPosition(size.width * 0.75, 90);
        this.addChild(menuButton, 3);
    }
});
