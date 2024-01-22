(function () {
    let runtime = c3_runtimeInterface._GetLocalRuntime();

    const getPlayer = () => {
        return runtime._allObjectClasses[12]._instances[0]
    }

    const flyMod = {
        init() {
            this.movementKeys = [false, false, false, false];
            this.activatorKeyHeld = false;
            this.activated = false;
            this.speed = { x: 20, y: 20 };
            this.stored = [3000, 24];
            this.override = false;

            document.addEventListener("keydown", (event) => { this.keyDown(event) });
            document.addEventListener("keyup", (event) => { this.keyUp(event) });

            runtime._dispatcher.addEventListener("tick2", () => { this.tick() });

            globalThis.ovoFlyMod = this;
        },

        keyDown(event) {
            const key = event.key.toLowerCase();

            if (key == "control" && !this.override) {
                this.activatorKeyHeld = true;
            } else if (event.keyCode >= 37 && event.keyCode <= 40 && this.activatorKeyHeld) {
                if (!this.activated) {
                    this.startActivation();
                    this.activated = true;
                }

                this.movementKeys[event.keyCode - 37] = true;
            }
        },

        keyUp(event) {
            const key = event.key.toLowerCase();

            if (key == "control" && this.activatorKeyHeld) {
                this.activatorKeyHeld = false;

                if (this.activated) {
                    this.movementKeys = [false, false, false, false];
                    this.activated = false;
                    this.endActivation();
                }
            } else if (event.keyCode >= 37 && event.keyCode <= 40 && this.activatorKeyHeld) {
                this.movementKeys[event.keyCode - 37] = false;
            }
        },

        startActivation() {
            const player = getPlayer();

            if (player) {
                this.stored = [player._iScriptInterface.behaviors.Platform.gravity, player._worldInfo._flags];
            } else {
                this.stored = [3000, 24];
            }
        },

        endActivation() {
            const player = getPlayer();

            if (player) {
                player._iScriptInterface.behaviors.Platform.gravity = this.stored[0];
                player._worldInfo._flags = this.stored[1];
            }
        },

        speedX(speed) {
            this.speed.x = speed;
        },

        speedY(speed) {
            this.speed.y = speed;
        },

        setSpeed(speed) {
            this.speed.x = speed;
            this.speed.y = speed;
        },

        setOverride(value) {
            this.override = !!value;
        },

        tick() {
            if (this.activated) {
                const player = getPlayer();

                if (player) {
                    if (!!player._iScriptInterface.behaviors.Platform.gravity || player._worldInfo._flags) {
                        player._iScriptInterface.behaviors.Platform.gravity = 0;
                        if (player._iScriptInterface.isVisible === true){
                            player._worldInfo._flags = 17
                        }else{
                        player._worldInfo._flags = 16
                        }
                    }

                    let moveX = this.movementKeys[2] - this.movementKeys[0];
                    let moveY = this.movementKeys[3] - this.movementKeys[1];
                    player._iScriptInterface.x += moveX * this.speed.x;
                    player._iScriptInterface.y += moveY * this.speed.y;
                }
            }
        }
    };

    flyMod.init();
})();
