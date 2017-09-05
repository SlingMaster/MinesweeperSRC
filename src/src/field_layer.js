var FieldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.objCells = [];
        this.createScreen();
        // this.scheduleUpdate();
        // this.scheduleOnce(this.update, 1.0);
        // this.schedule(this.update, 1.0);
        //this.updateField();
    },

    update: function () {
        cc.log("update FieldLayer");
    },

    createScreen: function () {
        this.createField();
    },

    createField: function () {

        var size = cc.winSize;
        var cellSize = { width: 60, height: 60 }; //exitButton.getContentSize();
        var fieldSize = cellSize.width * cells_per_row;
        var startPosX = (size.width - cellSize.width * (cells_per_row - 1) + cellSize.width) * 0.5;
        var startPosY = (size.height + fieldSize) * .5 - 80;
        var index = 0;
        var cell_item = null;

        for (var y = 0; y < cells_per_row; y++) {
            //cc.log("cell_item name : " + y);
            for (var x = 0; x < cells_per_row; x++) {
                //cc.log(x,"\nFieldLayer.createScreen", cells_per_row + " X " + cells_per_row);

                var posY = startPosY - y * cellSize.height - cellSize.height * 0.5 + 40;
                var posX = startPosX + x * cellSize.width - cellSize.width * 0.5;

                var cell_name = "cell_" + index;
                cell_item = new Cell(cell_name, index, cells[index], function (id, long_tap) {
                    
                    if (long_tap) {
                        if (!cells[id].open) {
                            cells[id].mark = !cells[id].mark;
                        }
                    } else {
                        cells[id].open = true;
                    }

                    cc.log("TOUCH_ENDED : ", id + " | long_tap: " + long_tap);
                    cells[id].open = true;
                    // ??? так явно делать нельзя нужно думать
                    // нужно както правильно делать update только field а не всю сцену
                    // и скорее всего в game scene
                    cc.director.runScene(new GameScene()); 
                    
                    // ??? обновление cells просчет вероятностей,
                    // еще нужно реализовывать
                    // и после этого обновление field

                    // cc.director.update();              
                    // this.update();
                    // this.updateField();
                    //fieldLayer = new FieldLayer;
                    //this.createScreen();
                    // this.removeAllChildrenWithCleanup(true) ; 
                    //cc.director.popScene( );
                    //cc.director.pushScene( scene );
                    //this.removeAllChildrenWithCleanup(true) ; 
                });
                
                cell_item.setPosition(posX, posY);
                this.addChild(cell_item);
                this.objCells.push(cell_item);;

                index++;
            }

        }
    }

});
