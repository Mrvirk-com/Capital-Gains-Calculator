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

  //calculations
  let margin = sell_price - purchase_price;
  let margin_percent = (margin / purchase_price) * 100;
  let total_margin = margin * quantity;
  let total_cost = (purchase_price * quantity).toFixed(2);;
  let total_value_upon_selling = (sell_price * quantity).toFixed(2);

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

  form.elements.total_cost.value = total_cost;
  results_element[0].style = "color:black;";

  form.elements.total_value_upon_selling.value = total_value_upon_selling;
  results_element[1].style = "color:black;";

  form.elements.total_margin.value = total_margin.toFixed(2);

  form.elements.margin_percent.value = margin_percent.toFixed(2) + " %";

  form.elements.margin.value = margin.toFixed(2);


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