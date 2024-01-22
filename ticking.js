(function() {
    let runtime = c3_runtimeInterface._GetLocalRuntime();
    
    function Angle(){
        runtime._allObjectClasses[12]._instances[0]._iScriptInterface.angle = 90 * (Math.PI/180)
    }

    let testing = {
        init() {
            document.addEventListener("keydown", (event) => {
                if (event.code === "KeyO") {
                    if (event.shiftKey) {
                        runtime._dispatcher.addEventListener("tick2", Angle)
                    }
                }
                if (event.code === "KeyU") {
                    if (event.shiftKey) {
                        runtime._dispatcher.removeEventListener("tick2", Angle)
                    }
                }

            })
          
            globalThis.ovoTesting = this;
        },
      
    };
    testing.init();
})();
