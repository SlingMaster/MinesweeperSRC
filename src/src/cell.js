var Cell = ccui.Button.extend({
    ctor: function (name, index, state_data, callback) {
        this._super();
        // init(); 
        this.game_over = false;
        this.index = index;
        this.stateData = state_data;
        this.createScreen(name, this.stateData);
        this.createListeners(callback);
        // this.updateState(this.stateData);
        this.schedule(this.update, 1.0);


        //this.scheduleUpdate();


        //this.mouseEvent();
        this.tap_delay = 0;
    },
    init: function () {
        if ('mouse' in sys.capabilities) {
            cc.log("MOUSE Supported");
            this.setMouseEnabled(true);
        } else {
            cc.log("MOUSE Not supported");
        }
        return true;
    },

    createScreen: function (name, index, stateData) {
        //this.loadTextures(res.Cell_png, res.ButtonSelected_png);
        //this.loadTextures(res.Cell_png, res.Cell_png);

        var cell_text = (this.stateData.open)
            ? this.stateData.value : 0;
        // cc.log("Cell | ", name, " | " + JSON.stringify(stateData));
        var texture = (this.stateData.open) ? res.CellOpenImg : res.CellImg;
        if ((this.stateData.open) && this.stateData.mine) {
            // game over
            gameAlive = false;
            cell_text = 0;
            texture = res.MineFireImg;
            this.game_over = true;
            bandSoundEffect();
        } else {
            if (this.stateData.open) {
                if (this.stateData.mark) {
                    cell_text = 0;
                    texture = res.MineMarkImg;
                } else {
                    if (this.stateData.mine) {
                        cell_text = 0;
                        texture = res.MineImg;
                    }
                }
            }

        }

        this.loadTextures(texture);
        this.setName(name);
        this.setTag(index);
        this.name = name;
        //this.state = state;

        var size = this.getContentSize();
        var captionLabel = new cc.LabelTTF(cell_text, "Arial", 20);

        captionLabel.setPosition(size.width * 0.5, size.height * 0.5);
        captionLabel.setColor(LABEL_COLOR);
        captionLabel.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        // captionLabel.setVerticalAlignment(cc.ZERO);    
        this.addChild(captionLabel);
    },
    update: function (dt) {
        if (this.game_over === true) {
            this.unscheduleUpdate();
            cc.director.runScene(new cc.TransitionRotoZoom(TRANSITION_LEAD_TIME, new GameOverScene()));
        }
    },

    returnState: function (state) {
        return state;
    },

    createListeners: function (callback) {
        this.addTouchEventListener(this.touchEvent(callback), this);
    },
    touchEvent: function (callback) {
        return function (sender, type) {

            if (type == ccui.Widget.TOUCH_BEGAN) {
                // callback("start");
            }
            if (type == ccui.Widget.TOUCH_ENDED) {
                // ??? нужно найти решение для long tap -----
                var re = /\d+/;
                var index = parseInt(this.name["match"](re)[0]);
                var long_tap = false;
                buttonSoundEffect();
                gameAlive = true;
                callback(index, long_tap);
            }
        };
    }


});