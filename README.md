# [CalcJS](http://gnehapk.wordpress.com/)

CalcJS is a simple JavaScript plugin hooked to a textfield for converting it into a Calculator field for basic arithmatic operations.

## How does it work?

It works like a Datepicker plugin. On focus (tab to field or click), a calculator interface is shown attached to the field. On blur (focus/click outside the textfield) the calculator interface is hidden.

## How to use

* For static textfields, include the JS file on your page

`<script src="calc.js"></script>`

and set the 'type' attribute of the INPUT element to 'calculator'

`<input type="calculator" name="total" />`

* For dynamic textfield elements, you can instantiate the Calculator class programatically

`var txtfld = document.createElement("input");
txtfld.type = "text";
txtfld.name = "amount";

new Calculator(txtfld);`

The Calculator constructor can accept textfield(s) in the form of
1) DOM Element reference
2) Array of DOM Element references
3) NodeList or HTMLCollection
4) CSS selector and
5) Array of CSS selectors
