(function () {
    runtime = c3_runtimeInterface._GetLocalRuntime();

    const getHead = () => {
        return runtime._allObjectClasses[33]._instances[0]._worldInfo
    }

    const isInLevel = () => {
        return runtime._layoutManager._mainRunningLayout._eventSheetName == "Levels";
    }

    const bigheadMod = {
        init() {
            this.scale = 2;
            this.width = 64 * this.scale;
            this.height = 64 * this.scale;
            
            runtime._dispatcher.addEventListener("tick2", () => {this.tick()})
            globalThis.ovoBighead = this;
        },

        tick() {
            if (isInLevel()) {
                const head = getHead();
                head._w = this.width;
                head._h = this.height;
            }
        }
    };

    bigheadMod.init();
})();
