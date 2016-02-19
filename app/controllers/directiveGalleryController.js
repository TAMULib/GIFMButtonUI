app.controller('DirectiveGalleryController', function ($scope, AlertService) {

	AlertService.add({type: "SUCCESS", message: "This is a success alert."}, "directive/gallery");
	AlertService.add({type: "ERROR", message: "This is an error alert."}, "directive/gallery");
	AlertService.add({type: "WARNING", message: "This is a warning alert."}, "directive/gallery");
	AlertService.add({type: "INFO", message: "This is an info alert."}, "directive/gallery");

});