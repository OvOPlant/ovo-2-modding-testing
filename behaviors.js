(function() {
    let runtime = c3_runtimeInterface._GetLocalRuntime();
    let notify = () => {};

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
            notify("Mod Loaded", "Reset Button Mod Loaded");
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
            let bh = prompt('Choose one: "teleport", "gravity", "jumpstrength", "timescale", "angle", "speed", "fallspeed", "acceleration", "deceleration", "size", "downx", "downy", "zoom", "dead", or type "reset"');
            if (bh === "reset") {this.loadReset();
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

        tp() {
            px = prompt('Change your x coordinate to whatever you want, leave blank to not change');
            py = prompt('Change your y coordinate to whatever you want, leave blank to not change');
            if (px === null || px === "" || isNaN(px)){
                px = ovoBehaviors.getPlayer().x
            }else{
                ovoBehaviors.getPlayer().x = parseFloat(px)
            }
            if (py === null || py === "" || isNaN(py)){
                py = ovoBehaviors.getPlayer().y
            }else{
                ovoBehaviors.getPlayer().y = parseFloat(py)
            }
            return;
        },

        gravity() {
            grav = prompt('Change your gravity to whatever you want');
            if (grav === null || grav === "" || isNaN(grav)){
                alert("Must be a number, gravity reset")
                grav = 1500;
                this.getPlayer().maxFall = parseFloat(grav) * 2
                return;
            }
            this.getPlayer().behavior_insts[0].maxFall = parseFloat(grav) * 2
            setInterval(function() {ovoBehaviors.getPlayer().behaviors.Platform.gravity = parseFloat(grav)}, 0);
            return;
        },

        getPlayer() {
            return runtime._iRuntime.objects.Collider.getFirstPickedInstance()
        },

    };
        runtime._iRuntime.addEventListener("tick", () => Properties())
        function Properties() {
            try {
                document.getElementById("fps").innerHTML =
                    "FPS: " + runtime._fps
            } catch (err) { }
            try {
                document.getElementById("coords").innerHTML =
                    Math.round(ovoBehaviors.getPlayer().x) + ", " + Math.round(ovoBehaviors.getPlayer().y)
            } catch (err) { }
            try {
                document.getElementById("speed").innerHTML =
                    "Speed: " + Math.round(ovoBehaviors.getPlayer().behaviors.Platform.vectorX)
            } catch (err) { }
            try {
                document.getElementById("grav").innerHTML =
                    "Gravity: " + ovoBehaviors.getPlayer().behaviors.Platform.gravity
            } catch (err) { }
            try {
                document.getElementById("js").innerHTML =
                    "Jump strength: " + ovoBehaviors.getPlayer().behaviors.Platform.jumpStrength
            } catch (err) { }
            try { if(runtime._allObjectClasses[12]._instances[0]._timeScale === -1){
                document.getElementById("ts").innerHTML =
                "Player Timescale: Normal"
            }else{
                document.getElementById("ts").innerHTML =
                    "Player Timescale: " + runtime._allObjectClasses[12]._instances[0]._timeScale
            }} catch (err) { }
            try { if(ovoBehaviors.getMovearea().instances[0].my_timescale === -1){
                document.getElementById("mts").innerHTML =
                "Movearea Timescale: Normal"
            }else{
                document.getElementById("mts").innerHTML =
                    "Movearea Timescale: " + ovoBehaviors.getMovearea().instances[0].my_timescale
            }} catch (err) { }
            try {
                document.getElementById("angle").innerHTML =
                    "Angle: " + Math.round(ovoBehaviors.getPlayer().angle / (Math.PI / 180))
            } catch (err) { }
            try {
                document.getElementById("maxspeed").innerHTML =
                    "Max speed: " + parseInt(ovoBehaviors.getPlayer().behavior_insts[0].maxspeed)
            } catch (err) { }
            try {
                document.getElementById("fall").innerHTML =
                    "Fall speed: " + ovoBehaviors.getPlayer().behavior_insts[0].maxFall
            } catch (err) { }
            try {
                document.getElementById("acc").innerHTML =
                    "Acceleration: " + ovoBehaviors.getPlayer().behavior_insts[0].acc
            } catch (err) { }
            try {
                document.getElementById("dec").innerHTML =
                    "Deceleration: " + ovoBehaviors.getPlayer().behavior_insts[0].dec
            } catch (err) { }
            try { if (ovoBehaviors.getPlayer().width === 16.00000000000001){
                document.getElementById("size").innerHTML =
                "Size: " + 16 + ", " + ovoBehaviors.getPlayer().height
            }else if (ovoBehaviors.getPlayer().width === -16.00000000000001){
                document.getElementById("size").innerHTML =
                "Size: " + -16 + ", " + ovoBehaviors.getPlayer().height
            }else if (ovoBehaviors.getPlayer().width === -32.00000000000002){
                document.getElementById("size").innerHTML =
                "Size: " + -32 + ", " + ovoBehaviors.getPlayer().height
            }else if (ovoBehaviors.getPlayer().width === 32.00000000000002){
                document.getElementById("size").innerHTML =
                "Size: " + 32 + ", " + ovoBehaviors.getPlayer().height
            }else{
                document.getElementById("size").innerHTML =
                    "Size: " + ovoBehaviors.getPlayer().width + ", " + ovoBehaviors.getPlayer().height
            }
            } catch (err) { }
            try {
                document.getElementById("dx").innerHTML =
                    "Downx: " + ovoBehaviors.getPlayer().behavior_insts[0].downx
            } catch (err) { }
            try {
                document.getElementById("dy").innerHTML =
                    "Downy: " + ovoBehaviors.getPlayer().behavior_insts[0].downy
            } catch (err) { }
            try {
                document.getElementById("zoom").innerHTML =
                    "Zoom: " + ovoBehaviors.Layer0().scale
            } catch (err) { }
            try {
                document.getElementById("state").innerHTML =
                    "State: " + ovoBehaviors.getPlayer().instance_vars[0]
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
