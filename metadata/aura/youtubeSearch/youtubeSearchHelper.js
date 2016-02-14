({
	searchYoutube: function(component) {
		var action = component.get("c.search");
			var self = this;
			var searchkey = component.get("v.SearchString");
            console.log(searchkey);
        	action.setParams({
	        		"searchstr": searchkey
	    	});
			action.setCallback(this, function(response) {
			var state = response.getState();
			console.log('STATE'+response.getReturnValue());
				if (component.isValid() && state === "SUCCESS") {
					component.set("v.data",response.getReturnValue());
				}else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors) {
	                    $A.logf("Errors", errors);
	                    if (errors[0] && errors[0].message) {
	                        $A.error("Error message: " +
	                                 errors[0].message);
	                    }
	                } else {
	                    $A.error("Unknown error");
	                }
                }
			});
		$A.enqueueAction(action);
	}
})