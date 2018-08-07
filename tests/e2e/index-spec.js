describe('index', function () {

	it('is navigatable', function() {
		browser.get('');
	})

	it('body is displayed', function () {
		expect($('body').isDisplayed()).toBeTruthy();
	})

	it('has tamuheader', function () {
		expect($('tamuheader').isDisplayed()).toBeTruthy();
	})

	it('has tamufooter', function () {
		expect($('tamufooter').isDisplayed()).toBeTruthy();
	});

});