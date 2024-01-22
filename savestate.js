(function () {
    let runtime = c3_runtimeInterface._GetLocalRuntime();
    targetY = null;
    function showPosition(){
            let player = runtime._allObjectClasses[12]._instances[0]._iScriptInterface
            try {
                document.getElementById("pos").innerHTML =
                    Math.round(player.x.toString()) +
                    ", " +
                    Math.round(player.y.toString());
            } catch (err) { }
    };

    let fly = {
        tick() {
            let player = runtime._allObjectClasses[12]._instances[0]._iScriptInterface
            try {
                player.y = targetY;
            } catch (err) { }
        },
    };

    var b = document.createElement("div"),
        c = {
            backgroundColor: "white",
            border: "solid",
            borderColor: "black",
            borderWidth: "6px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "0px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "20pt",
        };
    Object.keys(c).forEach(function (a) {
        b.style[a] = c[a];
    });
    b.id = "pos";
    const newContent = document.createTextNode("N/A");

    // add the text node to the newly created div
    b.appendChild(newContent);

    document.body.appendChild(b);

    var sb = document.createElement("div"),
        sc = {
            backgroundColor: "white",
            border: "solid",
            borderColor: "black",
            borderWidth: "6px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "60px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "20pt",
        };
    Object.keys(sc).forEach(function (a) {
        sb.style[a] = sc[a];
    });
    sb.id = "ssss";
    const snewContent = document.createTextNode("N/A");

    // add the text node to the newly created div
    sb.appendChild(snewContent);

    document.body.appendChild(sb);

    g = globalThis.ovoExplorer = {
        init: function () {
            runtime._dispatcher.addEventListener("tick2", showPosition)
        },

        trackOvO: function (a) {
            a ? runtime._dispatcher.addEventListener("tick2", showPosition) : runtime._dispatcher.removeEventListener("tick2", showPosition);
        },

        warp: function (x, y) {
            targetY = y;
            let player = runtime._allObjectClasses[12]._instances[0]
            player.x = x;
            player.y = y;
        },

        levitate: function (a) {
            let player = runtime._allObjectClasses[12]._instances[0]
            targetY = player.y;
            a ? runtime._dispatcher.addEventListener("tick2", fly) : runtime._dispatcher.removeEventListener("tick2", fly);
        },
    };
    g.init();
})();

(function () {
    let runtime = c3_runtimeInterface._GetLocalRuntime();

    //Get all valid players on the layout
    // Ghosts don't count as valid players, and replays don't count either

    alert(
        "Save state with Shift+S, load with S, reset state with Shift+R, skip level with Shift+N, go back in level with Shift+B, go to flag with Shift+M, go to coin with Shift+C (Made by Skymen, ported by OvOPlant)"
    );

    let getPlayer = () =>
    runtime._allObjectClasses[12]._instances[0]._iScriptInterface
    let getFlag = () =>
    runtime._allObjectClasses[16]._instances[0]._worldInfo
    let getCoin = () =>
    runtime._allObjectClasses[15]._instances[0]._worldInfo
    let curState = null;
    let curLayout = null;
    let saveState = () => {
        try {document.getElementById("ssss").innerHTML = "Saved player state"} catch (err) { }
        let state = runtime._allObjectClasses[12]._instances[0].SaveToJson();
        return state;
    };
    let loadState = (state) => {
        let player = getPlayer();
        player.y -= 10;
        runtime._allObjectClasses[12]._instances[0]._worldInfo.SetBboxChanged();
        player.behaviors.Platform.lastFloorObject = null;
        try {document.getElementById("ssss").innerHTML = "Loaded player state"} catch (err) { }
        runtime._allObjectClasses[12]._instances[0].LoadFromJson(state);
    };
    document.addEventListener("keydown", (event) => {
        if (event.code === "KeyS") {
            if (event.shiftKey) {
                curState = saveState();
            } else if (curState != null) {
                loadState(curState);
            }
        }
        if (event.code === "KeyR" && event.shiftKey) {
            curState = null;
            runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._mainRunningLayout;
            try {document.getElementById("ssss").innerHTML = "State reset"} catch (err) { }
        }
        if (event.code === "KeyN") {
            if (event.shiftKey) {
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-1"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[1]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-2"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[2]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-3"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[3]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-4"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[7]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-1"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[8]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-2"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[9]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-3"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[10]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-4"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[11]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-5"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[12]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 0-0"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[4]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level dlc"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[5]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level dlc2"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[13]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-8"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[14]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-X"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[15]}
                try {document.getElementById("ssss").innerHTML = "Going to next level"} catch (err) { }
            }
        }
        if (event.code === "KeyM") {
            if (event.shiftKey) {
                let player = getPlayer();
                let flag = getFlag();
                player.x = flag._x;
                player.y = flag._y;
                runtime._allObjectClasses[12]._instances[0]._worldInfo.SetBboxChanged();
                try {document.getElementById("ssss").innerHTML = "Going to flag"} catch (err) { }
            }
        }
        if (event.code === "KeyB") {
            if (event.shiftKey) {
                if (runtime._layoutManager._mainRunningLayout._name === "Level dlc"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[6]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level dlc2"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[4]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-8"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[5]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-X"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[13]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 17-B"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[14]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-6"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[11]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-5"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[10]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-4"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[9]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-3"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[8]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-2"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[7]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 2-1"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[3]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-4"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[2]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-3"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[1]}
                if (runtime._layoutManager._mainRunningLayout._name === "Level 1-2"){runtime._layoutManager._pendingChangeLayout = runtime._layoutManager._allLayouts[0]}
                try {document.getElementById("ssss").innerHTML = "Going to previous level"} catch (err) { }
            }
        }
        if (event.code === "KeyC") {
            if (event.shiftKey) {
                let player = getPlayer();
                let coin = getCoin();
                player.x = coin._x;
                player.y = coin._y;
                runtime._allObjectClasses[12]._instances[0]._worldInfo.SetBboxChanged();
                try {document.getElementById("ssss").innerHTML = "Going to coin"} catch (err) { }
            }
        }
    });

})();
