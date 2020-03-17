calculateProfitLossPercentage();
profit_loss_input_form.oninput = function(event) {
  event.preventDefault();
  calculateProfitLossPercentage();
};

function calculateProfitLossPercentage() {
  let results_element = document.getElementsByClassName("results_element");
  const form = document.forms.profit_loss_input_form;
  let purchase_price = form.elements.purchase_price.value;
  let sell_price = form.elements.sell_price.value;
  let quantity = form.elements.quantity.value == "" ? 1 : form.elements.quantity.value;

  let margin = sell_price - purchase_price;
  let margin_percent = (margin / purchase_price) * 100;

  let total_margin = margin * quantity;

  form.elements.margin_percent.value = margin_percent.toFixed(2) + " %";
  form.elements.margin.value = margin.toFixed(2);
  form.elements.total_margin.value = total_margin.toFixed(2);
  if (margin_percent < 0) {
    form.elements.margin_percent.className = "result-negative";
    form.elements.margin.className = "result-negative";
    form.elements.total_margin.className = "result-negative";
    results_element[0].innerHTML = "Loss %";
    results_element[0].style = "color:red;";
    results_element[1].innerHTML = "Loss per Item";
    results_element[1].style = "color:red;";
    results_element[2].innerHTML = "Total Loss";
    results_element[2].style = "color:red;";
  } else {
    form.elements.margin_percent.className = "result";
    form.elements.margin.className = "result";
    form.elements.total_margin.className = "result";
    results_element[0].innerHTML = "Profit %";
    results_element[0].style = "color:green;";
    results_element[1].innerHTML = "Gain per Item";
    results_element[1].style = "color:green;";
    results_element[2].innerHTML = "Total Gain";
    results_element[2].style = "color:green;";
  }

}