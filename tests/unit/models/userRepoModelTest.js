describe('model: UserRepo', function() {
	
	var UserRepo, WsApi;
	
	beforeEach(module('core'));

	beforeEach(module('app'));
	
	beforeEach(module('mock.wsApi'));
	
	beforeEach(inject(function(_UserRepo_, _WsApi_) {
        UserRepo = _UserRepo_;
        WsApi = _WsApi_; 
    }));

	describe('model is defined', function() {
		it('should be defined', function() {
			expect(UserRepo).toBeDefined();
		});
	});
	
	describe('get method should return a UserRepo', function() {
		it('the UserRepo was returned', function() {
			expect(UserRepo.get().payload).toEqual(mockUserRepo1);
		});
	});

	describe('set method should set a UserRepo', function() {
		it('the UserRepo was set', function() {
			var userRepo = UserRepo.get();
			UserRepo.set({"unwrap":function(){}, "payload":mockUserRepo2});
			expect(userRepo.payload).toEqual(mockUserRepo2);
		});
	});
	
	describe('update method should udpate a user in the UserRepo', function() {
		it('the user was updated in the UserRepo', function() {
			var userRepo = UserRepo.get();			
			UserRepo.updateRole("192837465","ROLE_MANAGER");			
			userRepo.payload['HashMap'][2].role = "ROLE_MANAGER";			
			expect(userRepo.payload).toEqual(mockUserRepo1);
		});
	});
	
});
