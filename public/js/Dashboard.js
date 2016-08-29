queue()
    .defer(d3.json, "/api/data")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
	
//Data Transformations
	var dataSet = apiData;
	var dateFormat = d3.time.format("%m/%d/%Y");
	dataSet.forEach(function(d) {
		d.date_posted = dateFormat.parse(d.date_posted);
				d.date_posted.setDate(1);
		d.total_spendings = +d.total_spendings;
	});

	//Crossfilter instance
	var cf = crossfilter(dataSet);

	//Define Dimensions
	var datePosted = cf.dimension(function(d) { return d.date_posted; });
	var paymentGroup = cf.dimension(function(d) { return d.payment_type; });
	var spendingType = cf.dimension(function(d) { return d.category; });
	var zipcode = cf.dimension(function(d) { return d.zipcode; });
	var merchant = cf.dimension(function(d) { return d.merchant_name; });


	//Calculate by group
	var transactionsByDate = datePosted.group(); 
	var transactionsByPayment = paymentGroup.group(); 
	var transactionsBySpendingType = spendingType.group();
	var transactionsByZipcode = zipcode.group();
	var merchantGroup = merchant.group();

	var all = cf.groupAll();

	// Total
	var totalSpendingsMerchant = merchant.group().reduceSum(function(d) {
		return d.transaction_amount;
	});


	var netTotalSpendings = cf.groupAll().reduceSum(function(d) {return d.transaction_amount;});

	//Define range values for data
	var minDate = datePosted.bottom(1)[0].date_posted;
	var maxDate = datePosted.top(1)[0].date_posted;

console.log("888888 I am here:" + minDate);
console.log(maxDate);

    //Charts
	var dateChart = dc.lineChart("#date-chart");
	var paymentGroupChart = dc.rowChart("#paymentGroup-chart");
	var spendingTypeChart = dc.rowChart("#spending-chart");
	var zipcodeChart = dc.rowChart("#zipcode-chart");
	var totalTransactions = dc.numberDisplay("#total-transactions");
	var netSpendings = dc.numberDisplay("#net-spendings");
	var merchantSpendings = dc.barChart("#merchant-spendings");


  selectField = dc.selectMenu('#menuselect')
        .dimension(merchant)
        .group(merchantGroup); 

		selectField = dc.selectMenu('#menuselect1')
        .dimension(zipcode)
        .group(transactionsByZipcode); 

		selectField = dc.selectMenu('#filterselect')
        .dimension(spendingType)
        .group(transactionsBySpendingType); 

       dc.dataCount("#row-selection")
        .dimension(cf)
        .group(all);


	totalTransactions
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(all);

	netSpendings
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(netTotalSpendings)
		.formatNumber(d3.format(".4s"));

	dateChart
		.height(220)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(datePosted)
		.group(transactionsByDate)
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Year")
		.yAxis().ticks(6);

	spendingTypeChart
        .height(220)
        .dimension(spendingType)
        .group(transactionsBySpendingType)
        .elasticX(true)
        .xAxis().ticks(5);

	zipcodeChart
		//.width(300)
		.height(220)
        .dimension(zipcode)
        .group(transactionsByZipcode)
        .xAxis().ticks(4);

	paymentGroupChart
		.height(220)
        .dimension(paymentGroup)
        .group(transactionsByPayment)
        .xAxis().ticks(4);


    merchantSpendings
        .height(220)
        .transitionDuration(1000)
        .dimension(merchant)
        .group(totalSpendingsMerchant)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .centerBar(false)
        .gap(5)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(merchant))
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .ordering(function(d){return d.value;})
        .yAxis().tickFormat(d3.format("s"));



    dc.renderAll();

};