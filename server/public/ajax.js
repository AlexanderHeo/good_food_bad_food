$('#FDASubmit').on('submit', getFDAData);

function getFDAData(event) {
  event.preventDefault();
  const cityText = $('.cityText').val();
  $.ajax({
    dataType: 'json',
    url: `https://api.fda.gov/food/enforcement.json?search=city:"${cityText}"`,
    method: 'GET',
    success: function (response) {
      console.log('FULL RESPONSE: ', response);

      const FDAWarning = response.meta.disclaimer;
      console.log('WARNING: ', FDAWarning);
      const FDADateIssued = response.results[0].report_date
      console.log("Date issued: ", FDADateIssued)
      const FDACity = response.results[0].city;
      console.log('City: ', FDACity);
      const FDAReason = response.results[0].reason_for_recall;
      console.log('Reason: ', FDAReason);
      const FDADescription = response.results[0].product_description;
      console.log('Product: ', FDADescription);
      const FDAQuantity = response.results[0].product_quantity;
      console.log('Quantity: ', FDAQuantity);
      const FDADistribution = response.results[0].distribution_pattern;
      console.log(FDADistribution);
    },
    error: function (response) {
      console.log('error: ', response);
    }
  });

}
