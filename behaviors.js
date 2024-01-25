(function() {
    let runtime = c3_runtimeInterface._GetLocalRuntime();
    var debugInt;
    var dead;

    let behaviors = {
        init() {
            this.initDomUI();
            document.addEventListener("keydown", (event) => {
                if (event.code === "KeyY") {
                    if (event.shiftKey) {
                        this.loadPrompt();
                    }
                }
            });

            globalThis.ovoBehaviors = this;
        },

        initDomUI() {
            let style = document.createElement("style");
            style.innerHTML = `
            .ovo-behaviors-button {
                background-color: white;
                border: solid;
                border-color: black;
                border-width: 6px;
                font-family: "Retron2000";
                position: absolute;
                z-index: 999999;
                cursor: pointer;
            }

            .ovo-behaviors-button:hover {
                background-color: rgba(200, 200, 200, 1);
            }
            `
            document.head.appendChild(style);

            let toggleButton = document.createElement("button");
            toggleButton.id = "ovo-behaviors-toggle-button";
            toggleButton.innerText = "";

            let loadIcon = document.createElement("img");
            loadIcon.src = "https://ovoplant.github.io/ovo/versions/reverse/electric.png"
            loadIcon.style.width = "38px";
            loadIcon.style.height = "38px";

            toggleButton.appendChild(loadIcon);
            toggleButton.classList.add("ovo-behaviors-button");
            toggleButton.style.top = "calc(50% - 50px)";
            toggleButton.style.right = "0%";
            toggleButton.style.transform = "translateY(-50%)";
            toggleButton.style.width = "50px";
            toggleButton.style.height = "50px";
            toggleButton.onclick = this.loadPrompt.bind(this);
            document.body.appendChild(toggleButton);
        },
       
        loadPrompt() {
            let bh = prompt('Choose one: "pausing", "debug", "teleport", "gravity", "jumpstrength", "timescale", "angle", "speed", "fallspeed", "acceleration", "deceleration", "size", "downx", "downy", "zoom", "dead", or type "reset"');
            if (bh === "reset") {this.loadReset();
            }else if (bh === "pausing") {this.pausing();
            }else if (bh === "debug") {this.debug();
            }else if (bh === "teleport") {this.tp();
            }else if (bh === "gravity") {this.gravity();
            }else if (bh === "jumpstrength") {this.jumpstrength();
            }else if (bh === "timescale") {this.timescale();
            }else if (bh === "angle") {this.angle();
            }else if (bh === "speed") {this.maxspeed();
            }else if (bh === "fallspeed") {this.fallspeed();
            }else if (bh === "acceleration") {this.acceleration();
            }else if (bh === "deceleration") {this.deceleration();
            }else if (bh === "size") {this.size();
            }else if (bh === "downx") {this.downx();
            }else if (bh === "downy") {this.downy();
            }else if (bh === "zoom") {this.zoom();
            }else if (bh === "dead") {this.dead();
            }else {alert("Please choose from the list")}
        },

        loadReset(){
            let bhreset = prompt('Choose one: "gravity", "jumpstrength", "timescale", "angle", "speed", "fallspeed", "acceleration", "deceleration", "size", "downx", "downy", "zoom"')
        },

        pausing() {
            penable = prompt('This will allow you to pause the game just like OvO (Esc or P), but there will be no pop up. (Try to pause while player/movearea timescale is set to 1) To enable pausing, type "enable". To disable pausing, type "disable".')
            if (penable === "enable"){
                document.addEventListener("keydown", Pause);
                return;
            }else if (penable === "disable"){
                document.removeEventListener("keydown",Pause);
                if (runtime._timeScale === 0){
                    runtime._timeScale = 1
                }
            }else{
                alert('"enable" or "disable", nothing else.')
                return;
            }
        },

        debug() {
            debug = prompt('This will allow you to see your hitbox and moveareas by pressing F2. Pressing F2 again will hide them. No replays, literally impossible. Type "yes".')
            if (debug === "yes"){
                debugv = "debugyes"
                document.addEventListener("keydown", Debug)
            }else{
                alert('Literally just one option, "yes"')
                return;
            }
        },

        tp() {
            px = prompt('Change your x coordinate to whatever you want, leave blank to not change');
            py = prompt('Change your y coordinate to whatever you want, leave blank to not change');
            if (px === null || px === "" || isNaN(px)){
                px = ovoBehaviors.getPlayer()._iScriptInterface.x
            }else{
                ovoBehaviors.getPlayer()._iScriptInterface.x = px
            }
            if (py === null || py === "" || isNaN(py)){
                py = ovoBehaviors.getPlayer()._iScriptInterface.y
            }else{
                ovoBehaviors.getPlayer()._iScriptInterface.y = py
            }
            return;
        },

        gravity() {
            grav = prompt('Change your gravity to whatever you want');
            if (grav === null || grav === "" || isNaN(grav)){
                alert("Must be a number, gravity reset")
                grav = 3000;
                this.getPlayer()._iScriptInterface.behaviors.Platform.maxFallSpeed = grav * 2
                return;
            }
            this.getPlayer()._iScriptInterface.behaviors.Platform.maxFallSpeed = grav * 2
            runtime._dispatcher.addEventListener("tick2", GravTick)
            return;
        },

        jumpstrength() {
            js = prompt('Change your jump strength to whatever you want');
            if (js === null || js === "" || isNaN(js)){
                alert("Must be a number, jump strength reset")
                js = 1300
                return;
            }
            if (js < 0){
                alert("Cannot be negative, jumpstrength changed to a positive number.")
                js = js * -1
                return;
            }
            setInterval(function() {ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.jumpStrength = js;}, 0);
            return;
        },

        timescale() {
            wts = prompt('"player" or "moveareas"?')
            if (wts === "player"){
            ts = prompt('Change your timescale to whatever you want');
            if (ts === null || ts === "" || isNaN(ts)){
                alert("Must be a number, timescale reset")
                ts = -1
                return;
            }
            if (ts < 0){
                alert("Negative timescale breaks the game and, unlike OvO, certain collider behaviors cannot be negative. Timescale has been changed to a positive number.")
                ts = ts * -1
                return;
            }
            setInterval(function() {
                if (runtime._timeScale === 0 && (ovoBehaviors.getPlayer()._timeScale < 1 || ovoBehaviors.getPlayer()._timeScale > 1)){
                    ovoBehaviors.getPlayer()._timeScale = -1
                }else(
                ovoBehaviors.getPlayer()._timeScale = ts), 0});
                }
                if (wts === "moveareas"){
                mts = prompt('Change movearea timescale to whatever you want');
            if (mts === null || mts === "" || isNaN(mts)){
                alert("Must be a number, timescale reset")
                mts = -1
                return;
            }
            if (mts < 0){
                alert("Changing movearea's timescale to a negative number CRASHES the game. Changed to a positive number.")
                mts = mts * -1
                return;
            }
            
            setInterval(function() {
                for (i = 0, len = runtime._allObjectClasses[20]._instances.length; i < len; i++)
                {
                if (runtime._timeScale === 0 && (ovoBehaviors.getMovearea()._instances[i]._timeScale < 1 || ovoBehaviors.getMovearea()._instances[i]._timeScale > 1)){
                    ovoBehaviors.getMovearea()._instances[i]._timeScale = -1
                }else(
                    ovoBehaviors.getMovearea()._instances[i]._timeScale = mts), 0}});
            
                }
        },

        angle() {
            pangle = prompt('Change your angle to a number between 1 and 360');
            if (pangle === null || pangle === "" || isNaN(pangle)){
                alert("Must be a number between 1 and 360, angle reset")
                pangle = 0
                return;
            }
            if (pangle >= 0 && pangle <= 360){
                runtime._dispatcher.addEventListener("tick2", AngleTick)
                return;
            }else{
                alert("Must be a number between 1 and 360, angle reset")
                pangle = 0
            }
            return;
        },

        maxspeed() {
            ms = prompt("Change your speed to whatever you want")
            if (ms === null || ms === "" || isNaN(ms)){
                alert("Must be a number, speed reset")
                runtime._dispatcher.removeEventListener("tick2", SpeedTick)
                return;
            }else if (parseFloat(ms) === 330){
                ms = 330.00000000001
            }
            runtime._dispatcher.addEventListener("tick2", SpeedTick)
        },

        fallspeed() {
            mf = prompt('Change your fallspeed to whatever you want');
            if (mf === null || mf === "" || isNaN(mf)){
                alert("Must be a number, speed reset")
                runtime._dispatcher.removeEventListener("tick2", FallTick)
                return;
            }
            runtime._dispatcher.addEventListener("tick2", FallTick)
            return;
        },

        acceleration() {
            acc = prompt('Change your acceleration to whatever you want');
            if (acc === null || acc === "" || isNaN(acc)) {
                alert("Must be a number, acceleration reset")
                acc = 3000
                return;
            }
            setInterval(function () {ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.acceleration = acc; }, 0);
            return;
        },

        deceleration() {
            dc = prompt('Change your deceleration to whatever you want')
            if (dc === null || dc === "" || isNaN(dc)) {
                alert("Must be a number, deceleration reset")
                runtime._dispatcher.removeEventListener("tick2", DecTick)
                return;
            }
            runtime._dispatcher.addEventListener("tick2", DecTick)
            return;
        },

        size() {
            width = prompt("Change your width to whatever you want")
            if (width === null || width === "" || isNaN(width)){
                alert("Must be a number, width reset");
                width = 64;
            }
            if (width < 0){
                width = parseFloat(width)-parseFloat(width)*2
            }
            if (parseFloat(width) === 32){
                width = 32.00000000000001
            }
            height = prompt("Change your height to whatever you want")
            if (height === null || height === "" || isNaN(height)){
                alert("Must be a number, height reset");
                height = 128
            }
            if (parseFloat(width) === 64 && parseFloat(height) === 128){
                runtime._dispatcher.removeEventListener("tick2", SizeTick)
            }else{
                runtime._dispatcher.addEventListener("tick2", SizeTick)
            }
            if (this.getPlayer()._iScriptInterface.instVars.State === "plunge" || this.getPlayer()._iScriptInterface.instVars.State === "slide"){
                this.getPlayer()._iScriptInterface.width = parseFloat(width) * 2
                this.getPlayer()._iScriptInterface.height = parseFloat(height) / 2
            }else {
            this.getPlayer()._iScriptInterface.width = parseFloat(width)
            this.getPlayer()._iScriptInterface.height = parseFloat(height)}
        },

        downx() {
            downx = prompt("Change your downX to whatever you want")
            if (downx === null || downx === "" || isNaN(downx)) {
                alert("Must be a number, downX reset");
                downx = 0;
            }
            setInterval(function () {
                ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._downX = parseFloat(downx)
            })
        },

        downy() {
            downy = prompt("Change your downY to whatever you want")
            if (downy === null || downy === "" || isNaN(downy)) {
                alert("Must be a number, downY reset");
                downy = 1;
            }
            setInterval(function () {
                ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._downY = parseFloat(downy)
            })
        },


        dead() {
            dead = prompt("This will put you in death state, meaning you can't die. Just be sure to not fall under the level. If you do, you will die. To enable this, type 'yes'. To disable this, type 'stop'.")
            if (dead === "yes"){
                runtime._dispatcher.addEventListener("tick2", Death)
            }else if (dead === "stop"){
                runtime._dispatcher.removeEventListener("tick2", Death)
                ovoBehaviors.getPlayer()._iScriptInterface.instVars.State = ""
            }else{
                alert('"yes" or "stop", nothing else.')
            }
        },

        getPlayer() {
            return runtime._allObjectClasses[12]._instances[0]
        },

        getMovearea() {
            return runtime._allObjectClasses[20]
        },

        getLayer(layerName) {
            return runtime._layoutManager.GetMainRunningLayout()._layers.find(x => x.name = layerName)
        },

    };

        function Pause(event){
            if (event.code === "KeyP" || event.code === "Escape"){
                if (runtime._timeScale !== 0){
                    timescale = runtime._timeScale
                    runtime._timeScale = 0
                }else{
                    runtime._timeScale = timescale
                }
            }
        }

        function Debug(event){
            if (event.code === "F2"){
                if (debugv === "debugyes"){
                    runtime._dispatcher.addEventListener("tick2", DebugTick)
                    debugv = "debugno"
                }else if(debugv === "debugno"){
                    runtime._dispatcher.removeEventListener("tick2", DebugTick)
                    ovoBehaviors.getPlayer()._iScriptInterface.isVisible = false
                        for (j = 0, lenj = runtime._allObjectClasses[20]._instances.length; j < lenj; j++){
                        ovoBehaviors.getMovearea()._instances[j]._behaviorInstances[0]._iScriptInterface.instance.isVisible = false}
                   debugv = "debugyes"
                }
            }
        }

        function DebugTick(){
            ovoBehaviors.getPlayer()._iScriptInterface.isVisible = true
                for (j = 0, lenj = runtime._allObjectClasses[20]._instances.length; j < lenj; j++){
                ovoBehaviors.getMovearea()._instances[j]._behaviorInstances[0]._iScriptInterface.instance.isVisible = true}
        }

        function GravTick(){
            ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.gravity = grav
        }

        function AngleTick(){
            ovoBehaviors.getPlayer()._iScriptInterface.angle = pangle * (Math.PI/180)
        }

        function SpeedTick(){
            if (ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxSpeed === 660){
                ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxSpeed = ms
            }else if(ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxSpeed === 1320){
                ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxSpeed = ms * 2
            }
        }

        function FallTick(){
            ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxFallSpeed = mf
        }

        function DecTick(){
            if (ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._dec === 3000){
                ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._dec = dc
            }else if (ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._dec === 2000){
                ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._dec = dc / 1.5
            }else if (ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._dec === 0){
                ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._dec = 0    
            }
        }

        function SizeTick(){
            let sib = ovoBehaviors.getPlayer()._siblings
            if (ovoBehaviors.getPlayer()._iScriptInterface.width <= 0){
                sib[0]._worldInfo._w = parseFloat(-width) / 4, sib[0]._worldInfo._h = parseFloat(height) / 4, sib[1]._worldInfo._w = parseFloat(-width), sib[1]._worldInfo._h = parseFloat(height) / 2, sib[2]._worldInfo._w = parseFloat(-width) / 8, sib[2]._worldInfo._h = parseFloat(height) / 8, sib[3]._worldInfo._w = parseFloat(-width) / 8, sib[3]._worldInfo._h = parseFloat(height) / 8, sib[4]._worldInfo._w = parseFloat(-width) / 8, sib[4]._worldInfo._h = parseFloat(height) / 8, sib[5]._worldInfo._w = parseFloat(-width) / 8, sib[5]._worldInfo._h = parseFloat(height) / 8, sib[6]._worldInfo._w = parseFloat(-width) / 8, sib[6]._worldInfo._h = parseFloat(height) / 8, sib[7]._worldInfo._w = parseFloat(-width) / 8, sib[7]._worldInfo._h = parseFloat(height) / 8, sib[8]._worldInfo._w = parseFloat(-width) / 8, sib[8]._worldInfo._h = parseFloat(height) / 8, sib[9]._worldInfo._w = parseFloat(-width) / 8, sib[9]._worldInfo._h = parseFloat(height) / 8
            }else {
                sib[0]._worldInfo._w = parseFloat(width) / 4, sib[0]._worldInfo._h = parseFloat(height) / 4, sib[1]._worldInfo._w = parseFloat(width), sib[1]._worldInfo._h = parseFloat(height) / 2, sib[2]._worldInfo._w = parseFloat(width) / 8, sib[2]._worldInfo._h = parseFloat(height) / 8, sib[3]._worldInfo._w = parseFloat(width) / 8, sib[3]._worldInfo._h = parseFloat(height) / 8, sib[4]._worldInfo._w = parseFloat(width) / 8, sib[4]._worldInfo._h = parseFloat(height) / 8, sib[5]._worldInfo._w = parseFloat(width) / 8, sib[5]._worldInfo._h = parseFloat(height) / 8, sib[6]._worldInfo._w = parseFloat(width) / 8, sib[6]._worldInfo._h = parseFloat(height) / 8, sib[7]._worldInfo._w = parseFloat(width) / 8, sib[7]._worldInfo._h = parseFloat(height) / 8, sib[8]._worldInfo._w = parseFloat(width) / 8, sib[8]._worldInfo._h = parseFloat(height) / 8, sib[9]._worldInfo._w = parseFloat(width) / 8, sib[9]._worldInfo._h = parseFloat(height) / 8
            }
            if (ovoBehaviors.getPlayer()._iScriptInterface.width === parseFloat(width) * 2){
                ovoBehaviors.getPlayer()._iScriptInterface.width = parseFloat(width) * 2
                ovoBehaviors.getPlayer()._iScriptInterface.height = parseFloat(height) / 2
            }else if (ovoBehaviors.getPlayer()._iScriptInterface.width === parseFloat(-width)){
                ovoBehaviors.getPlayer()._iScriptInterface.width = parseFloat(-width)
                ovoBehaviors.getPlayer()._iScriptInterface.height = parseFloat(height)
            }else if (ovoBehaviors.getPlayer()._iScriptInterface.width === parseFloat(-width) * 2){
                ovoBehaviors.getPlayer()._iScriptInterface.width = parseFloat(-width) * 2
                ovoBehaviors.getPlayer()._iScriptInterface.height = parseFloat(height) / 2
            }else{
                ovoBehaviors.getPlayer()._iScriptInterface.width = parseFloat(width)
                ovoBehaviors.getPlayer()._iScriptInterface.height = parseFloat(height)
            }
        }

        function Death(){
            if (ovoBehaviors.getPlayer()._iScriptInterface.y >= (runtime._iRuntime.globalVars.levelHeight + ovoBehaviors.getPlayer()._iScriptInterface.height)){
                ovoBehaviors.getPlayer()._iScriptInterface.instVars.State = ""
            }else{
                ovoBehaviors.getPlayer()._iScriptInterface.instVars.State = "dead"
            }
        }
        runtime._dispatcher.addEventListener("tick", () => Properties())
        function Properties() {
            try {
                document.getElementById("fps").innerHTML =
                    "FPS: " + runtime._fps
            } catch (err) { }
            try {
                document.getElementById("coords").innerHTML =
                    Math.round(ovoBehaviors.getPlayer()._iScriptInterface.x) + ", " + Math.round(ovoBehaviors.getPlayer()._iScriptInterface.y)
            } catch (err) { }
            try {
                document.getElementById("speed").innerHTML =
                    "Speed: " + Math.round(ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.vectorX)
            } catch (err) { }
            try {
                document.getElementById("grav").innerHTML =
                    "Gravity: " + ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.gravity
            } catch (err) { }
            try {
                document.getElementById("js").innerHTML =
                    "Jump strength: " + ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.jumpStrength
            } catch (err) { }
            try { if(ovoBehaviors.getPlayer()._timeScale === -1){
                document.getElementById("ts").innerHTML =
                "Player Timescale: Normal"
            }else{
                document.getElementById("ts").innerHTML =
                    "Player Timescale: " + ovoBehaviors.getPlayer()._timeScale
            }} catch (err) { }
            try { if(ovoBehaviors.getMovearea()._instances[0]._timeScale === -1){
                document.getElementById("mts").innerHTML =
                "Movearea Timescale: Normal"
            }else{
                document.getElementById("mts").innerHTML =
                    "Movearea Timescale: " + ovoBehaviors.getMovearea()._instances[0]._timeScale
            }} catch (err) { }
            try {
                document.getElementById("angle").innerHTML =
                    "Angle: " + Math.round(ovoBehaviors.getPlayer()._iScriptInterface.angle / (Math.PI / 180))
            } catch (err) { }
            try {
                document.getElementById("maxspeed").innerHTML =
                    "Max speed: " + parseInt(ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxSpeed)
            } catch (err) { }
            try {
                document.getElementById("fall").innerHTML =
                    "Fall speed: " + ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.maxFallSpeed
            } catch (err) { }
            try {
                document.getElementById("acc").innerHTML =
                    "Acceleration: " + ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.acceleration
            } catch (err) { }
            try {
                document.getElementById("dec").innerHTML =
                    "Deceleration: " + parseInt(ovoBehaviors.getPlayer()._iScriptInterface.behaviors.Platform.deceleration)
            } catch (err) { }
            try { if (ovoBehaviors.getPlayer()._iScriptInterface.width === 32.00000000000001){
                document.getElementById("size").innerHTML =
                "Size: " + 32 + ", " + ovoBehaviors.getPlayer()._iScriptInterface.height
            }else if (ovoBehaviors.getPlayer()._iScriptInterface.width === -32.00000000000001){
                document.getElementById("size").innerHTML =
                "Size: " + -32 + ", " + ovoBehaviors.getPlayer()._iScriptInterface.height
            }else if (ovoBehaviors.getPlayer()._iScriptInterface.width === -64.00000000000001){
                document.getElementById("size").innerHTML =
                "Size: " + -64 + ", " + ovoBehaviors.getPlayer()._iScriptInterface.height
            }else if (ovoBehaviors.getPlayer()._iScriptInterface.width === 64.00000000000001){
                document.getElementById("size").innerHTML =
                "Size: " + 64 + ", " + ovoBehaviors.getPlayer()._iScriptInterface.height
            }else{
                document.getElementById("size").innerHTML =
                    "Size: " + ovoBehaviors.getPlayer()._iScriptInterface.width + ", " + ovoBehaviors.getPlayer()._iScriptInterface.height
            }
            } catch (err) { }
            try {
                document.getElementById("dx").innerHTML =
                    "Downx: " + ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._downX
            } catch (err) { }
            try {
                document.getElementById("dy").innerHTML =
                    "Downy: " + ovoBehaviors.getPlayer()._behaviorInstances[1]._sdkInst._downY
            } catch (err) { }
            try {
                document.getElementById("zoom").innerHTML =
                    "Zoom: " + ovoBehaviors.Layer0().scale
            } catch (err) { }
            try {
                document.getElementById("state").innerHTML =
                    "State: " + ovoBehaviors.getPlayer()._iScriptInterface.instVars.State
            } catch (err) { }
    };

   

    var bcoords = document.createElement("div"),
        ccoords = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "0px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(ccoords).forEach(function (a) {
        bcoords.style[a] = ccoords[a];
    });
    bcoords.id = "coords";
    const newContentcoords = document.createTextNode("N/A");

    // add the text node to the newly created div
    bcoords.appendChild(newContentcoords);

    document.body.appendChild(bcoords);

    var bx = document.createElement("div"),
        cx = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "45px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cx).forEach(function (a) {
        bx.style[a] = cx[a];
    });
    bx.id = "speed";
    const newContentx = document.createTextNode("Speed: N/A");

    // add the text node to the newly created div
    bx.appendChild(newContentx);

    document.body.appendChild(bx);
   
    var bg = document.createElement("div"),
        cg = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "90px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cg).forEach(function (a) {
        bg.style[a] = cg[a];
    });
    bg.id = "grav";
    const newContentg = document.createTextNode("Gravity: 1500");

    // add the text node to the newly created div
    bg.appendChild(newContentg);

    document.body.appendChild(bg);
   
    var bjs = document.createElement("div"),
        cjs = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "135px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cjs).forEach(function (a) {
        bjs.style[a] = cjs[a];
    });
    bjs.id = "js";
    const newContentjs = document.createTextNode("Jump strength: 650");

    // add the text node to the newly created div
    bjs.appendChild(newContentjs);

    document.body.appendChild(bjs);

    var bts = document.createElement("div"),
        cts = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "180px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cts).forEach(function (a) {
        bts.style[a] = cts[a];
    });
    bts.id = "ts";
    const newContentts = document.createTextNode("Player Timescale: Normal");

    // add the text node to the newly created div
    bts.appendChild(newContentts);

    document.body.appendChild(bts);

    var bmts = document.createElement("div"),
        cmts = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "225px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cmts).forEach(function (a) {
        bmts.style[a] = cmts[a];
    });
    bmts.id = "mts";
    const newContentmts = document.createTextNode("Movearea Timescale: Normal");

    // add the text node to the newly created div
    bmts.appendChild(newContentmts);

    document.body.appendChild(bmts);
   
    var ba = document.createElement("div"),
        ca = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "270px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(ca).forEach(function (a) {
        ba.style[a] = ca[a];
    });
    ba.id = "angle";
    const newContenta = document.createTextNode("Angle: 0");

    // add the text node to the newly created div
    ba.appendChild(newContenta);

    document.body.appendChild(ba);

    var bs = document.createElement("div"),
        cs = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "315px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cs).forEach(function (a) {
        bs.style[a] = cs[a];
    });
    bs.id = "maxspeed";
    const newContents = document.createTextNode("Max speed: 330");

    // add the text node to the newly created div
    bs.appendChild(newContents);

    document.body.appendChild(bs);

    var bf = document.createElement("div"),
        cf = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "360px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cf).forEach(function (a) {
        bf.style[a] = cf[a];
    });
    bf.id = "fall";
    const newContentf = document.createTextNode("Fall speed: 3000");

    // add the text node to the newly created div
    bf.appendChild(newContentf);

    document.body.appendChild(bf);

    var bac = document.createElement("div"),
        cac = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "405px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cac).forEach(function (a) {
        bac.style[a] = cac[a];
    });
    bac.id = "acc";
    const newContentac = document.createTextNode("Acceleration: 1500");

    // add the text node to the newly created div
    bac.appendChild(newContentac);

    document.body.appendChild(bac);

    var bdc = document.createElement("div"),
        cdc = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "450px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cdc).forEach(function (a) {
        bdc.style[a] = cdc[a];
    });
    bdc.id = "dec";
    const newContentdc = document.createTextNode("Deceleration: 1500");

    // add the text node to the newly created div
    bdc.appendChild(newContentdc);

    document.body.appendChild(bdc);

    var bz = document.createElement("div"),
        cz = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "495px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cz).forEach(function (a) {
        bz.style[a] = cz[a];
    });
    bz.id = "size";
    const newContentcz = document.createTextNode("Size: 32, 64");

    // add the text node to the newly created div
    bz.appendChild(newContentcz);

    document.body.appendChild(bz);

    var bdx = document.createElement("div"),
        cdx = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "540px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cdx).forEach(function (a) {
        bdx.style[a] = cdx[a];
    });
    bdx.id = "dx";
    const newContentdx = document.createTextNode("Downx: 0");

    // add the text node to the newly created div
    bdx.appendChild(newContentdx);

    document.body.appendChild(bdx);

    var bdy = document.createElement("div"),
        cdy = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "585px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cdy).forEach(function (a) {
        bdy.style[a] = cdy[a];
    });
    bdy.id = "dy";
    const newContentdy = document.createTextNode("Downy: 1");

    // add the text node to the newly created div
    bdy.appendChild(newContentdy);

    document.body.appendChild(bdy);

    var bzm = document.createElement("div"),
        czm = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "630px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(czm).forEach(function (a) {
        bzm.style[a] = czm[a];
    });
    bzm.id = "zoom";
    const newContentzm = document.createTextNode("Zoom: 1");

    // add the text node to the newly created div
    bzm.appendChild(newContentzm);

    document.body.appendChild(bzm);

    var bfps = document.createElement("div"),
        cfps = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "720px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cfps).forEach(function (a) {
        bfps.style[a] = cfps[a];
    });
    bfps.id = "fps";
    const newContentfps = document.createTextNode("FPS: 0");

    // add the text node to the newly created div
    bfps.appendChild(newContentfps);

    document.body.appendChild(bfps);

    var bstate = document.createElement("div"),
        cstate = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "675px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cstate).forEach(function (a) {
        bstate.style[a] = cstate[a];
    });
    bstate.id = "state";  
    const newContentstate = document.createTextNode("State: N/A");

    // add the text node to the newly created div
    bstate.appendChild(newContentstate);

    document.body.appendChild(bstate);

    behaviors.init();
})();
