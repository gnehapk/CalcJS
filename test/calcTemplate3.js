window.Calc = window["Calc"] || {};

window.onload = function() {
	var calcRef, page;
	calcRef = document.querySelectorAll("input[type=calculator]");
	for (var i = 0; i < calcRef.length; i++) {
		page = new Calc.renderBdy(calcRef[i]);
	}


	//document.body.appendChild(page.pgBdy.el);
	//page.pgBdy.attachEventListener();
}

//(function (Calc) {

	Calc.renderBdy = function(calcRef) {
		var oThis = this;
		oThis._disp = "";
		oThis._rslt = "";
		oThis.init(calcRef);		
	};

	//this._disp = "";

	//Calc._rslt = "";

	Calc.renderBdy.prototype = {
		init : function(calcRef) {
			var oThis = this;
			console.log(oThis._disp);
			
				//calcRef[i].value = "9";
				var el = oThis.buildDom();
				var position = calcRef.getBoundingClientRect();
				var x = position.left;
				var y = position.top;
				
				calcRef.parentNode.appendChild(el);
				calcRef.el.css("margin-left",x);
				document.body.addEventListener("click", function(e){
				    document.querySelector(".calcBdy").style.display = "none";
				    console.log('on body');
				});
				calcRef.addEventListener("click", function(e) {
    				document.querySelector(".calcBdy").style.display = "block";
    				e.stopPropagation();
    			},false);
    			oThis.attachEventListener();
						
		},
		buildDom : function() {
			var oThis = this,
				tempNum,temp,
				numberPanelRow =  new Array(4),
				tempNum = new Array(24),
				numberPanel,k=0,disp;

			oThis.el = document.createElement("div");
			oThis.el.setAttribute("class","calcBdy");
			//$(oThis.el).hide();
			
			/*disp = document.createElement("div");
			disp.setAttribute("class","disp");
			//disp.setAttribute("id","disp");

			oThis.el.appendChild(disp);*/

			numberPanel = document.createElement("div");
			for(var j = 0 ; j < 4 ; j++ ){
				numberPanelRow[j] = document.createElement("div");
				numberPanelRow[j].setAttribute("class","row");
				numberPanel.appendChild(numberPanelRow[j]);				
				for(var i = 0; i < 5; i ++)
				{
					tempNum[k] = document.createElement("input");
					tempNum[k].setAttribute("type","submit");
					tempNum[k].setAttribute("class","operand");
					numberPanelRow[j].appendChild(tempNum[k]);
					k++;
				};
			};

			tempNum[0].setAttribute("value","7");
			tempNum[0].setAttribute("id","val7");
			tempNum[1].setAttribute("value","8");
			tempNum[1].setAttribute("id","val8");
			tempNum[2].setAttribute("value","9");
			tempNum[2].setAttribute("id","val9");
			tempNum[3].setAttribute("value","C");
			tempNum[3].setAttribute("id","cncl");
			tempNum[4].setAttribute("value","clear");
			tempNum[4].setAttribute("id","clear");

			tempNum[5].setAttribute("value","4");
			tempNum[5].setAttribute("id","val4");
			tempNum[6].setAttribute("value","5");
			tempNum[6].setAttribute("id","val5");
			tempNum[7].setAttribute("value","6");
			tempNum[7].setAttribute("id","val6");
			tempNum[8].setAttribute("value","(");
			tempNum[8].setAttribute("id","val(");
			tempNum[9].setAttribute("value",")");
			tempNum[9].setAttribute("id","val)");

			tempNum[10].setAttribute("value","1");
			tempNum[10].setAttribute("id","val1");
			tempNum[11].setAttribute("value","2");
			tempNum[11].setAttribute("id","val2");
			tempNum[12].setAttribute("value","3");
			tempNum[12].setAttribute("id","val3");
			tempNum[13].setAttribute("value","+");
			tempNum[13].setAttribute("id","val+");
			tempNum[14].setAttribute("value","-");
			tempNum[14].setAttribute("id","val-");
			
			tempNum[15].setAttribute("value","0");
			tempNum[15].setAttribute("id","val0");
			tempNum[16].setAttribute("value",".");
			tempNum[16].setAttribute("id","valdec");
			tempNum[17].setAttribute("value","=");
			tempNum[17].setAttribute("id","val=");
			tempNum[18].setAttribute("value","*");
			tempNum[18].setAttribute("id","val*");
			tempNum[19].setAttribute("value","/");
			tempNum[19].setAttribute("id","val/");			

			oThis.el.appendChild(numberPanel);	
			return oThis.el;		
		},

		attachEventListener : function() {

			var oThis =this;

			var evnt1=document.getElementById("val1");
			var evnt2=document.getElementById("val2");
			var evnt3=document.getElementById("val3");
			var evnt4=document.getElementById("val4");
			var evnt5=document.getElementById("val5");
			var evnt6=document.getElementById("val6");
			var evnt7=document.getElementById("val7");
			var evnt8=document.getElementById("val8");
			var evnt9=document.getElementById("val9");
			var evnt0=document.getElementById("val0");
			var plus=document.getElementById("val+");
			var equal=document.getElementById("val=");
			var mul=document.getElementById("val*");
			var sub=document.getElementById("val-");
			var div=document.getElementById("val/");
			//var clr=document.getElementById("clr");
			var dec=document.getElementById("valdec");
			var bcksp=document.getElementById("cncl");
			var sBrac = document.getElementById("val(");
			var eBrac = document.getElementById("val)");
			var clear = document.getElementById("clear");

			evnt1.addEventListener("click",oThis.store,false);
			evnt2.addEventListener("click",oThis.store,false);
			evnt3.addEventListener("click",oThis.store,false);
			evnt4.addEventListener("click",oThis.store,false);
			evnt5.addEventListener("click",oThis.store,false);
			evnt6.addEventListener("click",oThis.store,false);
			evnt7.addEventListener("click",oThis.store,false);
			evnt8.addEventListener("click",oThis.store,false);
			evnt9.addEventListener("click",oThis.store,false);
			evnt0.addEventListener("click",oThis.store,false);
			plus.addEventListener("click",oThis.store,false);
			equal.addEventListener("click",oThis.evaluate,false);
			mul.addEventListener("click",oThis.store,false);
			sub.addEventListener("click",oThis.store,false);
			div.addEventListener("click",oThis.store,false);
			clear.addEventListener("click",oThis.clearDisp,false);
			dec.addEventListener("click",oThis.store,false);
			//bcksp.addEventListener("click",this.store(bcksp.defaultValue),false);
			sBrac.addEventListener("click",oThis.store,false);
			eBrac.addEventListener("click",oThis.store,false);

		},

		store: function(event) {
			var oThis = this;
			oThis._disp=oThis._disp+event.target.defaultValue;
			document.getElementById("calc").value = oThis._disp;
			console.log(oThis._disp);
			event.stopPropagation();
		},

		evaluate: function() {
			var oThis = this;
			var exp, rslt;
			exp = document.getElementById("calc").value;
			console.log(exp.length);
			len = exp.length;
			for (var i = 0; i < len; i++) {

				if((exp[0] === "+") || (exp[0] === "-") || (exp[0] === "/") || (exp[0] ==="*")) {
					alert("Not a valid expression");
					oThis._disp = "";
					document.getElementById("calc").value = " ";
					break;
				}

				if(((exp[i]<"0") || (exp[i]>"9")) && (exp[i]!=='+') && (exp[i]!=='-') && (exp[i]!=='*') && (exp[i]!=='/') && (exp[i]!=='.'))    {
					alert("Not a valid expression");
					oThis._disp = "";
					document.getElementById("calc").value = " ";
					break;
				}
			};
			oThis._rslt = eval(exp);
			document.getElementById("calc").value = oThis._rslt;
			exp = "";
			oThis._disp = oThis._rslt;
		},

		clearDisp: function() {
			var oThis = this;
			document.getElementById("calc").value = " ";
			oThis._disp = "";
		}
	};

	/*Calc.Template = function(calcRef) {
		this.pgBdy = new Calc.renderBdy(calcRef);
		
	}*/

	
	// body...
//})(window.Calc);