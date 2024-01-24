(function() {
    let runtime = c3_runtimeInterface._GetLocalRuntime();
    var timescale
    let inputs = {
        init() {
            document.addEventListener("keydown", userInput);

            globalThis.ovoInputs = this;
        },
    };
    function userInput(event){
        if (event.code === "Backquote"){
            if (event.ctrlKey){
                timescale = runtime._timeScale
                runtime._timeScale = 0
                try{document.getElementById("userinput").innerHTML="Press any key to replace your LEFT key."}catch(err){}
                document.addEventListener("keydown", leftInput)
                document.removeEventListener("keydown", userInput)
            }
        }
    }
    function leftInput(event){
        runtime._allObjectClasses[3]._instances[0]._instVarValues[0] = event.keyCode
        document.addEventListener("keydown", upInput)
        try{document.getElementById("userinput").innerHTML="Press any key to replace your UP key."}catch(err){}
        document.removeEventListener("keydown", leftInput)
    }

    function upInput(event){
        runtime._allObjectClasses[3]._instances[0]._instVarValues[1] = event.keyCode
        document.addEventListener("keydown", rightInput)
        try{document.getElementById("userinput").innerHTML="Press any key to replace your RIGHT key."}catch(err){}
        document.removeEventListener("keydown", upInput)
    }

    function rightInput(event){
        runtime._allObjectClasses[3]._instances[0]._instVarValues[2] = event.keyCode
        document.addEventListener("keydown", downInput)
        try{document.getElementById("userinput").innerHTML="Press any key to replace your DOWN key."}catch(err){}
        document.removeEventListener("keydown", rightInput)
    }

    function downInput(event){
        runtime._allObjectClasses[3]._instances[0]._instVarValues[3] = event.keyCode
        setTimeout(function() {runtime._timeScale = timescale}, 100)
        document.addEventListener("keydown", userInput)
        try{document.getElementById("userinput").innerHTML="Press Ctrl + `"}catch(err){}
        document.removeEventListener("keydown", downInput)
    }

    var bUserinput = document.createElement("div"),
        cUserinput = {
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
    Object.keys(cUserinput).forEach(function (a) {
        bUserinput.style[a] = cUserinput[a];
    });
    bUserinput.id = "userinput";
    const newContentuserinput = document.createTextNode("Press Ctrl + `");

    // add the text node to the newly created div
    bUserinput.appendChild(newContentuserinput);

    document.body.appendChild(bUserinput);
    inputs.init();
})();
