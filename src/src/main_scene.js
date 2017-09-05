var MainScene = cc.Scene.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());
        this.addChild(new BarsLayer());
        var size = cc.director.getWinSize();

        this.loginButton = new Button("Login", "Login", function () {
            //cc.director.runScene(new cc.TransitionShrinkGrow(TRANSITION_LEAD_TIME, new LoginScene()));
            cc.director.runScene(new cc.TransitionFadeTR(TRANSITION_LEAD_TIME, new LoginScene()));
        });
        this.loginButton.attr({ x: size.width * .5, y: size.height * .5 + 250 });
        this.addChild(this.loginButton, 0);

        // ===============================================
        // menu select level games
        // ===============================================
        var label1 = cc.LabelTTF.create("Sound Preset".toUpperCase(), "Arial", 26);
        label1.setPosition(size.width * .5, size.height * .5 + 130);
        label1.setColor(LABEL_COLOR);
        this.addChild(label1, 1);

        var label2 = cc.LabelTTF.create("Select level and start play".toUpperCase(), "Arial", 26);
        label2.setPosition(size.width * .5, size.height * .5);
        label2.setColor(LABEL_COLOR);
        this.addChild(label2, 1);

        // ----------------------
        var beginnerItem = new MenuItem("Beginner", function () {
            // init games | cells per row | total mines |
            initGame("beginner");
            cc.director.runScene(new cc.TransitionCrossFade(TRANSITION_LEAD_TIME, new GameScene()));
        });
        beginnerItem.attr({ x: size.width * .5, y: size.height * .5 - 70 });
        // ----------------------
        var intermediateItem = new MenuItem("Intermediate", function () {
            initGame("intermediate");
            cc.director.runScene(new cc.TransitionCrossFade(TRANSITION_LEAD_TIME, new GameScene()));
        });
        intermediateItem.attr({ x: size.width * .5, y: size.height * .5 - 160 });
        // ----------------------
        var expertItem = new MenuItem("Expert", function () {
            initGame("expert");
            cc.director.runScene(new cc.TransitionCrossFade(TRANSITION_LEAD_TIME, new GameScene()));
        });
        expertItem.attr({ x: size.width * .5, y: size.height * .5 - 250 });
        
        // ----------------------
        var levelMenu = cc.Menu.create(beginnerItem, intermediateItem, expertItem);
        levelMenu.attr({ x: 0, y: 0 });
        this.addChild(levelMenu);

        // ===============================================
        // ui  buttons
        // ===============================================

        // music toggle button 
        var offMusicBtn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName(res.MusicOffImg));
        var onMusicBtn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName(res.MusicOnImg));
        var musicToggler = new cc.MenuItemToggle.create(offMusicBtn);

        musicToggler.addSubItem(onMusicBtn);
        musicToggler.setTarget(function () {
            MUSIC = !MUSIC;
            buttonSoundEffect();
            saveAppState();
            playStopMusic();
        }, this);
        // set current state button  
        if (MUSIC === true) {
            musicToggler.setSelectedIndex(1);
            playStopMusic()
        } else {
            musicToggler.setSelectedIndex(0);
        }
        playStopMusic();
        musicToggler.setPosition(cc.p(size.width * .5 - 80, size.height * .5 + 80));
        // --------------------

        // sound toggle button 
        var offSoundBtn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName(res.SoundOffImg));
        var onSoundBtn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName(res.SoundOnImg));
        var soundToggler = new cc.MenuItemToggle.create(offSoundBtn);

        soundToggler.addSubItem(onSoundBtn);
        soundToggler.setTarget(function () {
            SOUND = !SOUND;
            buttonSoundEffect();
            saveAppState();
        }, this);
        // set current state button  
        if (SOUND === true) {
            soundToggler.setSelectedIndex(1);
        } else {
            soundToggler.setSelectedIndex(0);
        }

        soundToggler.setPosition(cc.p(size.width * .5 + 80, size.height * .5 + 80));
        // --------------------

        var menuPreset = new cc.Menu(soundToggler, musicToggler);
        menuPreset.attr({ x: 0, y: 0 });
        this.addChild(menuPreset);

        // ----------------------
        // var exitButton = new IconButton("exitBTN", res.ExitImg, null, function () {
        //     // exit mobile only
        // });
        // var buttonSize = exitButton.getContentSize();
        // exitButton.setPosition(size.width * 0.5, 90);
        // this.addChild(exitButton);
        // ----------------------
    },
});