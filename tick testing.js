(function() {
    let runtime = c3_runtimeInterface._GetLocalRuntime();
    let notify = () => {};
    
    function Angle(){
        runtime._allObjectClasses[12]._instances[0]._iScriptInterface.angle = 90 * (Math.PI/180)
    }

    let testing = {
        init() {
            document.addEventListener("keydown", (event) => {
                if (event.code === "KeyY") {
                    if (event.shiftKey) {
                        runtime._iRuntime.addEventListener("tick", Angle)
                    }
                }
                if (event.code === "KeyU") {
                    if (event.shiftKey) {
                        runtime._iRuntime.removeEventListener("tick", Angle)
                    }
                }

            })
          
            globalThis.ovoTesting = this;
            notify("dude there is no notify command");
        },
      
    };
    testing.init();
})();
