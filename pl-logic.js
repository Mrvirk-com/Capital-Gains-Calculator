calculateProfitLossPercentage();
inputForm3.oninput = function(event) {
  event.preventDefault();
  calculateProfitLossPercentage();
};

function calculateProfitLossPercentage() {
  let profitOrLoss = document.getElementsByClassName("profitOrLoss");
  const form = document.forms.inputForm3;
  let y = form.elements.y.value;
  let n = form.elements.n.value;
  let x = n - y;
  let pl = (x / y) * 100;
  form.elements.pl.value = pl.toFixed(2) + "%";
  form.elements.plamount.value = x.toFixed(2);
  if (pl < 0) {
    form.elements.pl.className = "result-negative";
    form.elements.plamount.className = "result-negative";
    profitOrLoss[0].innerHTML = "Loss %";
    profitOrLoss[0].style = "color:red;";
    profitOrLoss[1].innerHTML = "Amount Lost";
    profitOrLoss[1].style = "color:red;";
  } else {
    form.elements.pl.className = "result";
    form.elements.plamount.className = "result";
    profitOrLoss[0].innerHTML = "Profit %";
    profitOrLoss[0].style = "color:green;";
    profitOrLoss[1].innerHTML = "Amount Gained";
    profitOrLoss[1].style = "color:green;";
  }

}