calculateProfitLossPercentage();
profit_loss_input_form.oninput = function(event) {
  event.preventDefault();
  calculateProfitLossPercentage();
};

function calculateProfitLossPercentage() {

  const form = document.forms.profit_loss_input_form;
  //get user inputs
  let purchase_price = form.elements.purchase_price.value;
  let sell_price = form.elements.sell_price.value;
  let quantity = form.elements.quantity.value == "" ? 1 : form.elements.quantity.value;

  //calculations
  let margin = sell_price - purchase_price;
  let margin_percent = (margin / purchase_price) * 100;
  let total_margin = margin * quantity;

  //handling results
  let results_element = document.getElementsByClassName("results_element");

  let total_cost = form.elements.total_cost;
  total_cost.value = (purchase_price * quantity).toFixed(2);
  results_element[0].style = "color:black;";

  let total_value_upon_selling = form.elements.total_value_upon_selling;
  total_value_upon_selling.value = (sell_price * quantity).toFixed(2);
  results_element[1].style = "color:black;";


  form.elements.margin_percent.value = margin_percent.toFixed(2) + " %";
  form.elements.margin.value = margin.toFixed(2);
  form.elements.total_margin.value = total_margin.toFixed(2);

  //changing element colors based on profit (green) or loss (red)
  if (margin_percent < 0) {
    form.elements.margin_percent.className = "result-negative";
    form.elements.margin.className = "result-negative";
    form.elements.total_margin.className = "result-negative";
    results_element[3].innerHTML = "Loss %";
    results_element[3].style = "color:black;";
    results_element[4].innerHTML = "Loss per Item";
    results_element[4].style = "color:black;";
    results_element[2].innerHTML = "Total Loss";
    results_element[2].style = "color:black;";
  } else {
    form.elements.margin_percent.className = "result";
    form.elements.margin.className = "result";
    form.elements.total_margin.className = "result";
    results_element[3].innerHTML = "Profit %";
    results_element[3].style = "color:black;";
    results_element[4].innerHTML = "Gain per Item";
    results_element[4].style = "color:black;";
    results_element[2].innerHTML = "Total Gain";
    results_element[2].style = "color:black;";
  }

}