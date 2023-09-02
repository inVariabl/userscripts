// ==UserScript==
// @name        SupportXMR Tweaks
// @namespace   Violentmonkey Scripts
// @match       https://supportxmr.com/
// @grant       none
// @version     1.0
// @author      -
// @description 6/5/2023, 9:41:59 PM
// ==/UserScript==

fetch("https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd") // XMR Price API
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
      xmrPrice = data.monero.usd;
      console.log("1 XMR = $" + xmrPrice);

			window.onload = function() {
      	xmrPriceToUSD("#DashPending");
				xmrPriceToUSD("#DashPaid");
      	// xmrPriceToUSD("#MinerCalc"); // FIXME: " XMR" breaks float parsing
			}
  })
  .catch(error => console.log(error))

function xmrPriceToUSD(element) {
    document.querySelector(element).innerText = "$" + (parseFloat(document.querySelector(element).innerText) * xmrPrice).toFixed(2);
}
