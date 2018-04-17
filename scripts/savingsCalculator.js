/*
Name: Akshath Jain
Date: 4/16/18
Purpose: script for savings calculator
*/

function calculateSavings(){
	var monthlyCostInput = document.getElementById('monthly-cost');
	var dailyStepsInput = document.getElementById('average-daily-steps');
	var discountInput = document.getElementById('discount');
	var calculatorSavingsOutput = document.getElementById('calculator-savings-output');
	var calculatorCostOutput = document.getElementById('calculator-cost-output');

	var doCalc = true;
	
	var monthlyCost = monthlyCostInput.value;
	if(!isNumber(monthlyCost, 'monthly-cost-parent')) doCalc = false;
	
	var dailySteps = dailyStepsInput.value;
	if(!isNumber(dailySteps, 'average-daily-steps-parent')) doCalc = false;

	var discount = discountInput.value;
	if(!isNumber(discount, 'discount-parent')) doCalc = false;


	if(doCalc){
		var savings = dailySteps / 1000.0 * discount * 30;
		var newCost = (monthlyCost - savings < 0) ? 0 : (monthlyCost - savings);
		calculatorSavingsOutput.innerHTML = "$" + savings.toFixed(2);
		calculatorCostOutput.innerHTML = "$" + newCost.toFixed(2);
	}else{
		calculatorSavingsOutput.innerHTML = "$--.--";
		calculatorCostOutput.innerHTML = "$--.--";
	}

	function isNumber(value, parentId){
		if(isNaN(parseFloat(value))){
			$("#" + parentId).addClass('has-error');
			return false;
		}
		else{
			$("#" + parentId).removeClass('has-error');
			return true;
		}
	}
}