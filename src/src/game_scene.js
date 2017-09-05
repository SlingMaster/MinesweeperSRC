var GameScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.schedule(this.update, 1.0);
        this.labelTime = null;
        this.labelMines = null;
    },

    update: function (dt) {
        if (gameAlive === false) {
            //if is not running, stop
            return;
        }
        timePlayed += dt;
        this.labelTime.setString(getGameTimeInfo(timePlayed));
        this.labelMines.setString("MINES • " + marked_cells + "/" + total_mines);
        // cc.log("gameAlive: " + gameAlive + " | Update GameScene: ", timePlayed);
    },

    onEnter: function () {

        this._super();

        this.addChild(new BackgroundLayer(), -1);
        this.addChild(new BarsLayer());
        this.addChild(new FieldLayer());

        var size = cc.director.getWinSize();
        this.labelTime = cc.LabelTTF.create("TIME • 00:00", "Arial", 24);
        this.labelTime.setPosition(size.width * .20, size.height - 220);
        this.addChild(this.labelTime, 0);

        this.labelMines = cc.LabelTTF.create("MINES • " + marked_cells + "/" + total_mines, "Arial", 24);
        this.labelMines.setPosition(size.width * .80, size.height - 220);
        this.addChild(this.labelMines, 1);

        // ----------------------
        var replayButton = new IconButton("replayBTN", res.ReplayImg, null, function () {
            // replay
            initGame(LAST_RESULT["game_level"]);
            cc.director.runScene(new GameScene());
        });

        // var buttonSize = replayButton.getContentSize();
        replayButton.setPosition(size.width * 0.25, 90);
        this.addChild(replayButton);

        // ----------------------
        var pauseButton = new IconButton("pauseBTN", res.PauseImg, null, function () {
            // pause game
            gameAlive = false;
        });
        // var buttonSize = pauseButton.getContentSize();
        pauseButton.setPosition(size.width * 0.5, 90);
        this.addChild(pauseButton);

        // ----------------------
        var exitButton = new IconButton("exitBTN", res.ExitImg, null, function () {
            // exit game and save last result
            gameAlive = false;
            saveAppState();
            // cc.director.runScene(new cc.TransitionCrossFade(TRANSITION_LEAD_TIME, new MainScene())); 
            cc.director.runScene(new cc.TransitionCrossFade(TRANSITION_LEAD_TIME, new GameOverScene()));
        });
        // var buttonSize = exitButton.getContentSize();
        exitButton.setPosition(size.width * 0.75, 90);
        this.addChild(exitButton);
    }
});
