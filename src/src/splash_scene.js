var SplashScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        // this.addChild(new BackgroundLayer());
        var size = cc.director.getWinSize();
        var sprite = new cc.Sprite(res.SplashBg);
        sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(sprite, 0);
        window.setTimeout(function () {
            // cc.TransitionCrossFade           
            // cc.TransitionFade      
            // cc.TransitionFadeTR
            // cc.TransitionJumpZoom
            // cc.TransitionMoveInL
            // cc.TransitionPageTurn
            // cc.TransitionProgress
            // cc.TransitionRotoZoom
            // cc.TransitionSceneOriented 
            // cc.TransitionShrinkGrow
            // cc.TransitionSlideInL
            // cc.TransitionSplitCols
            // cc.TransitionTurnOffTiles
            //cc.director.runScene(new cc.TransitionFadeTR(TRANSITION_LEAD_TIME, new MainScene()));
            cc.director.runScene(new cc.TransitionShrinkGrow(TRANSITION_LEAD_TIME, new MainScene()));
        }, 2000);
    }
});

