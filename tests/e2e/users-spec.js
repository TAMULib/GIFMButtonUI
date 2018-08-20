describe('users', function () {

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

	it('has access to manage users', function () {

		browser.get('users');

		element.all(by.repeater('thisUser in userRepo.list track by thisUser.uin')).count().then(function(count) {
			expect(count).toBeGreaterThan(1);
		});

		element.all(by.repeater('thisUser in userRepo.list track by thisUser.uin')).each(function(row) {
			var cells = row.all(by.tagName('td'));
			expect(cells.count()).toEqual(6);
		});

	})

	it('can change user role to manager', function () {

		element.all(by.repeater('thisUser in userRepo.list track by thisUser.uin')).each(function(row) {
			
			row.getText().then(function(txt) {
				if(txt.indexOf(browser.params.user.uin) >= 0) {
					row.element(by.cssContainingText('option', 'ROLE_MANAGER')).click();
				}
			});
			
		});

		element.all(by.repeater('thisUser in userRepo.list track by thisUser.uin')).each(function(row) {
			var cells = row.all(by.tagName('td'));
			cells.get(0).getText().then(function(uin) {
				cells.get(4).getText().then(function(role) {
					if(uin == browser.params.user.uin) {
						expect(role).toEqual('ROLE_MANAGER');
					}
				});
			});
		});

	})

	it('can change user role back to user', function () {

		element.all(by.repeater('thisUser in userRepo.list track by thisUser.uin')).each(function(row) {
			
			row.getText().then(function(txt) {
				if(txt.indexOf(browser.params.user.uin) >= 0) {
					row.element(by.cssContainingText('option', 'ROLE_USER')).click();
				}
			});
			
		});

		element.all(by.repeater('thisUser in userRepo.list track by thisUser.uin')).each(function(row) {
			var cells = row.all(by.tagName('td'));
			cells.get(0).getText().then(function(uin) {
				cells.get(4).getText().then(function(role) {
					if(uin == browser.params.user.uin) {
						expect(role).toEqual('ROLE_USER');
					}
				});
			});
		});

	});

});