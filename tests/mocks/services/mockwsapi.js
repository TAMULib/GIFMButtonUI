angular.module('mock.wsApi', []).
    service('WsApi', function($q) {

        var WsApi = this;

        WsApi.fetch = function(apiReq) {
        	
        	var defer = $q.defer();
        	
        	switch(apiReq.method) {        		
	        	case 'credentials': return {'payload':mockUser1};
	        	case 'page': return {'payload':mockDocumentPage1};
	        	case 'all': {	        		
	        		switch(apiReq.controller) {
	        			case 'user': return {'payload':mockUserRepo1};
	        			case 'document': return {'payload':mockDocumentRepo1};
	        			case 'cv': return {'payload':mockControlledVocabulary1};
	        			default: return {'payload':{}};
	        		}	        		
	        	}
	        	case 'get': {
	        		switch(apiReq.controller) {
		        		case 'user': return {'payload':mockUser1};
		        		case 'metadata': return {'payload':mockMetadata1};
		        		case 'document': return {'payload':mockDocumentRepo1};
		        		default: return {'payload':{}};
	        		}	        		
	        	}
	        	case 'update_role': {	        		
	        		mockUserRepo1['HashMap'][2].role = JSON.parse(apiReq['data']).role;
	        		return mockUserRepo1;
	        	}
	        	case 'update_annotator': {	        		
	        		mockDocumentRepo1['HashMap'].annatator = JSON.parse(apiReq['data']).annotator;
	        		return mockDocumentRepo1;
	        	}
	        	default: return {'payload':{}};
        	}
        	            
            return defer.promise;
        }
        
        WsApi.listen = function(apiReq) {        	
        	var defer = $q.defer();
            return defer.promise;
        }
            
});