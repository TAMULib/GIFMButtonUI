describe('theme', function () {

	var EC = protractor.ExpectedConditions;

	it('login admin with shibolleth', function () {
		browser.get('');

		element(by.linkText('Login')).click();

		browser.wait(EC.visibilityOf(element(by.id('loginModal'))), 5000);

		browser.ignoreSynchronization = true;

		element(by.buttonText("Shibboleth Login")).click();

		element(by.buttonText('Select')).click();

		element(by.id('username')).sendKeys(browser.params.admin.username);

		element(by.id('password')).sendKeys(browser.params.admin.password);

		element(by.buttonText('Log In')).click();

		browser.wait(EC.visibilityOf($('username')), 5000);

		expect($('username').getText()).toEqual("Library Test4");
	})

	it('synchronize', function() {
		browser.ignoreSynchronization = false;
	})

	it('has access to themes', function () {

		browser.get('theme');

		element.all(by.repeater('theme in themes.list')).count().then(function(count) {
			expect(count).toEqual(2);
		});

	});

	it('can create a new', function () {

		element(by.model('newTheme'));

		var model = element(by.model("newTheme.name"));
		model.evaluate("newTheme.name = 'Test Theme';");

		element(by.buttonText("Add Theme")).click();

		browser.wait(EC.visibilityOf(element(by.cssContainingText('h4', 'Test Theme'))), 5000);

		element.all(by.repeater('theme in themes.list')).count().then(function(count) {
			expect(count).toEqual(3);
		});

	})

	it('can active new', function () {

		

	})

	it('can change property', function () {

		

	})

	it('can refresh after changed property', function () {

		

	})

	it('can active previous', function () {

		

	})

	it('can delete newly created', function () {

		element.all(by.repeater('theme in themes.list')).each(function(theme) {
			
			theme.getText().then(function(txt) {
				if(txt.indexOf('Test Theme') > -1) {
					theme.element(by.css('[ng-click="removeTheme(theme)"]')).click();
				}
			});
			
		});

		browser.wait(EC.not(EC.visibilityOf(element(by.cssContainingText('h4', 'Test Theme')))), 5000);


		element.all(by.repeater('theme in themes.list')).count().then(function(count) {
			expect(count).toEqual(2);
		});

	});

});