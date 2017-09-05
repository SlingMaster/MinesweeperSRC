var approved = false;
var LoginScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.scheduleUpdate();
        // this.schedule( this.update, 1.0, 1.0, 1.0 );
        // this.scheduleOnce(this.update, 1.0);
    },

    update: function (dt) {
        //update callback, run every frame  
        if (approved) {
            nodeName = new StampLoginLayer();
            nodeName.setScale(1.5);
            this.addChild(nodeName);

            // var nodeAction = new cc.EaseBounceOut(new cc.ScaleTo(.05, 1, 1));
            // var nodeAction = new cc.EaseExponentialOut(new cc.ScaleTo(.05, 1, 1)); 
            var nodeAction = new cc.ScaleTo(.05, 1, 1);
            // var cbFunc = new cc.callFunc( );

            nodeName.runAction(
                cc.sequence(
                    nodeAction
                )

            );

            cc.log("LoginScene update" + dt, approved);
            approved = false;
        }

    },

    onEnter: function () {

        this._super();
        // approved = false;
        this.addChild(new BackgroundLoginLayer(), -1);
        this.addChild(new BarsLayer(), 0);

        var size = cc.director.getWinSize();
        // ----------------------
        var loginButton = new Button("loginBTN", "Login", function () {
            // check the length of the password and login
            if (loginEditBox.string.length > 3 && passwordEditBox.string.length > 3) {
                approved = true;
                label.setString("");
                LAST_RESULT["login"] = loginEditBox.string;
                saveAppState();
                window.setTimeout(function () {
                    loginEditBox.setVisible(false);
                    passwordEditBox.setVisible(false);
                    cc.director.runScene(new cc.TransitionFadeBL(TRANSITION_LEAD_TIME, new MainScene()));
                }, 1000);
            } else {

                label.setColor(WARN_TEXT_COLOR);
                if (loginEditBox.string.length <= 3) {
                    label.setString("Incorect Login");
                } else {
                    label.setString("Incorect Password");
                }

            }
        });


        var buttonSize = loginButton.getContentSize();
        loginButton.setPosition(size.width * 0.3, 160);
        this.addChild(loginButton);
        // ----------------------        
        var cancelButton = new Button("cancelBTN", "Cancel", function () {
            loginEditBox.setVisible(false);
            passwordEditBox.setVisible(false);
            // cc.director.runScene(new cc.TransitionShrinkGrow(TRANSITION_LEAD_TIME, new MainScene()));   
            cc.director.runScene(new cc.TransitionFadeBL(TRANSITION_LEAD_TIME, new MainScene()));
        });
        cancelButton.setPosition(size.width * 0.7, 160);
        this.addChild(cancelButton);
        // ----------------------

        // ---------------------- 
        var label = cc.LabelTTF.create("Input Login and Password", "Arial", 20);
        label.setPosition(size.width * .70, size.height * .5 + 140);
        label.setColor(TEXT_COLOR);
        this.addChild(label, 0);
        // ----------------------          
        var loginEditBox = cc.EditBox.create(cc.size(240, 60), cc.Scale9Sprite.create("res/input.png"), cc.Scale9Sprite.create("res/input_select.png"), null);
        loginEditBox.setPlaceHolder("Login");
        loginEditBox.setPosition(cc.p(size.width * .70, size.height * .5 + 90));
        loginEditBox.placeHolderFontSize = 30;
        loginEditBox.fontSize = 30;
        loginEditBox.maxLength = 32;
        loginEditBox.setFontColor(cc.color(TEXT_COLOR));
        loginEditBox.setDelegate(this);

        // restore last login ---
        if (isDefined(LAST_RESULT["login"])) {
            if (LAST_RESULT["login"] !== "noname") {
                loginEditBox.setString(LAST_RESULT["login"]);
            }
        }
        loginEditBox.setVisible(false);
        this.addChild(loginEditBox, 1);

        // ----------------------   
        var passwordEditBox = cc.EditBox.create(cc.size(240, 60), cc.Scale9Sprite.create("res/input.png"), cc.Scale9Sprite.create("res/input_select.png"));
        passwordEditBox.setPlaceHolder("Password");
        passwordEditBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        passwordEditBox.setPosition(cc.p(size.width * .70, size.height * .5 + 20));
        passwordEditBox.placeHolderFontSize = 30;
        passwordEditBox.fontSize = 30;
        passwordEditBox.maxLength = 6;
        passwordEditBox.setFontColor(TEXT_COLOR);
        passwordEditBox.setDelegate(this);
        passwordEditBox.setVisible(false);
        this.addChild(passwordEditBox, 2);

        // ??? нужно решить проблему с EditBox наверное особенность контрола Z index
        // решил но наверное есть более оригинальное решение
        window.setTimeout(function () {
            loginEditBox.setVisible(true);
            passwordEditBox.setVisible(true);
        }, 500);


    }
});
