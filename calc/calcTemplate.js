window.Calc = window["Calc"] || {};

(function (Calc) {

	Calc.renderBdy = function() {
		this.init();
	};

	Calc._disp = "";

	Calc._minus = 0;

	Calc.renderBdy.prototype = {
		init : function() {
			this.buildDom();
		},
		buildDom : function() {
			var oThis = this,
				tempNum,temp,
				numberPanelRow =  new Array(4),
				//tempNum [4][6],
				tempNum = new Array(24),
				numberPanel,k=0;

			oThis.el = document.createElement("div");
			oThis.el.setAttribute("class","calcBdy");
			
			Calc._disp = document.createElement("div");
			Calc._disp.setAttribute("class","disp");

			oThis.el.appendChild(Calc._disp);

			numberPanel = document.createElement("div");
			for(var j = 0 ; j < 4 ; j++ ){
				numberPanelRow[j] = document.createElement("div");
				numberPanelRow[j].setAttribute("class","row");
				numberPanel.appendChild(numberPanelRow[j]);				
				for(var i = 0; i < 6; i ++)
				{
					tempNum[k] = document.createElement("input");
					tempNum[k].setAttribute("type","submit");
					tempNum[k].setAttribute("class","operand");
					numberPanelRow[j].appendChild(tempNum[k]);
					k++;
				};
			};

			tempNum[0].setAttribute("value","7");
			tempNum[1].setAttribute("value","8");
			tempNum[2].setAttribute("value","9");
			tempNum[3].setAttribute("value","/");
			tempNum[4].setAttribute("value","C");
			tempNum[5].setAttribute("value","clear");

			tempNum[6].setAttribute("value","4");
			tempNum[7].setAttribute("value","5");
			tempNum[8].setAttribute("value","6");
			tempNum[9].setAttribute("value","x");
			tempNum[10].setAttribute("value","(");
			tempNum[11].setAttribute("value",")");

			tempNum[12].setAttribute("value","1");
			tempNum[13].setAttribute("value","2");
			tempNum[14].setAttribute("value","3");
			tempNum[15].setAttribute("value","-");
			tempNum[16].setAttribute("value","square");
			tempNum[17].setAttribute("value","sqroot");

			tempNum[18].setAttribute("value","0");
			tempNum[19].setAttribute("value",".");
			tempNum[20].setAttribute("value","%");
			tempNum[21].setAttribute("value","+");
			tempNum[22].setAttribute("value","=");
			tempNum[23].setAttribute("value","");			

			oThis.el.appendChild(numberPanel);			
		}
	};

	Calc.Template = function() {
		this.pgBdy = new Calc.renderBdy();
	}
	// body...
})(window.Calc);