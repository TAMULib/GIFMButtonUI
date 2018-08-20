describe('authentication', function () {

	var EC = protractor.ExpectedConditions;

	it('login user with shibolleth', function () {
		browser.get('');

		element(by.linkText('Login')).click();

		browser.wait(EC.visibilityOf(element(by.id('loginModal'))), 5000);

		browser.ignoreSynchronization = true;

		element(by.buttonText("Shibboleth Login")).click();

		element(by.buttonText('Select')).click();

		element(by.id('username')).sendKeys(browser.params.user.username);

		element(by.id('password')).sendKeys(browser.params.user.password);

		element(by.buttonText('Log In')).click();

		browser.wait(EC.visibilityOf($('username')), 5000);

		expect($('username').getText()).toEqual("Library Test5");
	});

});