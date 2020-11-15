mr_profit_loss();
profit_loss_input_form.oninput = function(event) {
  event.preventDefault();
  mr_profit_loss();
};

function mr_profit_loss() {

  const form = document.forms.profit_loss_input_form;
  //get user inputs
  let purchase_price = form.elements.purchase_price.value;
  let sell_price = form.elements.sell_price.value;
  let quantity = form.elements.quantity.value == "" ? 1 : form.elements.quantity.value;
  let tax_percent = form.elements.tax_percent.value;
  let dividend_per_share = form.elements.dividend_per_share.value;

  if (purchase_price == null || purchase_price == "") {
    purchase_price = 0;
  }
  if (dividend_per_share == null || dividend_per_share == "") {
    dividend_per_share = 0;
  }

  //calculations
  let margin = sell_price - purchase_price;
  let margin_percent = (margin / purchase_price) * 100;
  let total_margin = margin * quantity;
  let total_cost = (purchase_price * quantity).toFixed(2);
  let total_value_upon_selling = (sell_price * quantity).toFixed(2);
  let dividend_yield = (dividend_per_share / purchase_price) * 100;
  let total_return = margin_percent + dividend_yield;

  //return true if a profit is made
  let is_tax_payable = (total_margin > 0) ? true : false;

  //updates total profit, gain perent and tax payable, if a profit is made
  if (is_tax_payable) {
    let tax_amount = ((tax_percent * total_margin) / 100);
    form.elements.tax_payable.value = tax_amount.toFixed(2);

    //updating the profit after deducting tax
    let margin_after_tax = total_margin - tax_amount;
    total_margin = margin_after_tax;

    //calculating gain percentage after tax
    margin_percent = (margin_after_tax / total_cost) * 100;

  } else {
    form.elements.tax_payable.value = "No Tax";
  }

  //handling results
  let results_element = document.getElementsByClassName("results_element");

  form.elements.dividend_yield.value = dividend_yield.toFixed(2) + " %";
  let quarterly_dividend = dividend_per_share / 4;
  form.elements.quarterly_dividend.value = quarterly_dividend.toFixed(3);

  let monthly_dividend = dividend_per_share / 12;
  form.elements.monthly_dividend.value = monthly_dividend.toFixed(3);

  form.elements.total_cost.value = total_cost;
  results_element[0].style = "color:black;";

  form.elements.total_value_upon_selling.value = total_value_upon_selling;
  results_element[1].style = "color:black;";

  form.elements.total_margin.value = total_margin.toFixed(2);

  form.elements.margin_percent.value = margin_percent.toFixed(2) + " %";

  form.elements.margin.value = margin.toFixed(2);

  form.elements.total_return.value = total_return.toFixed(2) + " %";



  results_element[5].style = "color:black;";

  //changing element colors based on profit (green) or loss (red)
  if (margin_percent < 0) {
    form.elements.margin_percent.className = "result-negative";
    form.elements.margin.className = "result-negative";
    form.elements.total_margin.className = "result-negative";
    results_element[3].innerHTML = "Loss";
    results_element[3].style = "color:black;";
    results_element[4].innerHTML = "Loss per Item";
    results_element[4].style = "color:black;";
    results_element[2].innerHTML = "Total Loss";
    results_element[2].style = "color:black;";
  } else {
    form.elements.margin_percent.className = "result";
    form.elements.margin.className = "result";
    form.elements.total_margin.className = "result";
    results_element[3].innerHTML = "Profit";
    results_element[3].style = "color:black;";
    results_element[4].innerHTML = "Gain per Item";
    results_element[4].style = "color:black;";
    results_element[2].innerHTML = "Total Gain";
    results_element[2].style = "color:black;";
  }

}