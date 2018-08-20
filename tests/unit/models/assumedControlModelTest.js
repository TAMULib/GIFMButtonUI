describe('model: AssumedControl', function() {
	
	var AssumedControl;

	beforeEach(module('core'));

	beforeEach(module('app'));
	
	beforeEach(module('AssumedControl'));
			
	beforeEach(inject(function(_AssumedControl_) {
		AssumedControl = _AssumedControl_;
 
    }));

});
