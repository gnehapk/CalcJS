(function() {
    "use strict";

    //execute onLoad on window load
    window.addEventListener("load", onLoad, false);

    //find 'calculator' input types and instantiate Calculator with each
    function onLoad() {
        var inputCalcs = Array.prototype.slice.call(document.querySelectorAll('input[type=calculator]'));

        inputCalcs.forEach(function(el) {
            el.setAttribute("value", "");
            new Calculator(el);
        });
    }

    //Calculator Class
    function Calculator(arg) {
        var oThis = this,
            argTypeErrMsg = "Invalid argument received in Calculator constructor. Expecting a String or HTMLElement.";

        oThis.el = oThis.parseArgs(arg);

        if (oThis.el === null) {
            throw new TypeError(argTypeErrMsg);
        } else {
            oThis.initialize();
        }
    }

    //Shared Methods
    Calculator.prototype = {
        //reassign constructor
        constructor: Calculator,

        //check the argument type
        parseArgs: function(arg) {
            return (typeof arg === "string") ? document.querySelector(arg)[0] :
                    (arg instanceof HTMLElement) ? arg : null;
        },

        //initialize
        initialize: function() {
            var oThis = this;

            oThis.el.className = "calcInput";

            //construct the button panel
            oThis.btnPanel = oThis.constructBtnPanel();

            //show the panel on focus of the firld
            oThis.el.addEventListener("focus", function(evt) {
                oThis.showBtnPanel();
            }, false);

            //handle enter key press from the field
            oThis.el.addEventListener("keypress", function(evt) {
                //when enter is pressed without any special key
                if (!(evt.altGraphKey && evt.metaKey) &&
                        !(evt.altKey && evt.shiftKey && evt.ctrlKey) && evt.which && (evt.which === 13)) {
                            oThis.evaluate();
                    }
            }, false);

            //stop the click event at the field
            oThis.el.addEventListener("click", function(evt) {
                evt.stopPropagation();
            }, false);

            //hide the panel on click elsewhere
            document.getElementsByTagName("html")[0].
                    addEventListener("click", function(evt) {
                        oThis.hideBtnPanel();
            }, false);
        },

        constructBtnPanel: function() {
            var oThis = this,
                btnPanel = document.createElement("div");

            btnPanel.className = "calcBtnPanel";
            btnPanel.innerHTML = oThis.getBtnPanelHTML();
            btnPanel.style.left = oThis.el.offsetLeft + "px";
            btnPanel.style.top = oThis.el.offsetTop + oThis.el.offsetHeight + "px";
            oThis.el.parentNode.appendChild(btnPanel);

            btnPanel.addEventListener("click", function(evt) {
                if (evt.target.nodeName === "BUTTON") {
                    oThis.process(evt.target.getAttribute("data-id"));

                    evt.stopPropagation();
                }
            }, false);

            return oThis.btnPanel = btnPanel;
        },

        process: function(input) {
            var oThis = this,
                invalid = false;

            invalid = oThis.validate(input);

            if(invalid === false) {

              if (input === "=") {
                
                //if "=" is pressed when there is no input expression
                if (oThis.el.value !== "") {
                    oThis.evaluate(); 
                };

                }else if (input === "clear") {
                    oThis.clean();
                }else {
                    oThis.el.value += input;
                }  
            }
            
        },

        //validate the expression
        validate: function(input) {
            var oThis = this,
                invalid = false,
                op = ['*', '/', ')'];

            if (oThis.el.value === "") {
                invalid = op.some(function(item, index, array) {

                    if(input === item) {
                        alert("Invalid Expression");
                        oThis.el.value = "";
                    }
                    return(input === item);

                });
            };
            return invalid;
        },

        clean: function() {
            var oThis = this;

            oThis.el.value = "";
        },

        evaluate: function() {
            var oThis = this,
                expression = oThis.el.value;

            oThis.el.value = eval(expression);
        },

        getBtnPanelHTML: function() {
            var sHtml = "";

            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "(", ")", "+", "-", "*", "/", "=", "clear"].
                forEach(function(v) {
                    sHtml  += '<button type="button" data-id="' + v + '">' + v + '</button>';
                });

            return  sHtml;
        },

        //show calculator panel
        showBtnPanel: function() {
            this.displayBtnPanel(true);
        },

        //hide calculator panel
        hideBtnPanel: function() {
            this.displayBtnPanel(false);
        },

        //super for show/hide
        displayBtnPanel: function(isDisplay) {
            this.btnPanel.style.display = isDisplay ? "block" : "none";
        }
    };
})();