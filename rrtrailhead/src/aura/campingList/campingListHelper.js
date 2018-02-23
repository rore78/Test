({
    // Step 7 
    createItem: function(component, item) {
         
        var action = component.get("c.saveItem");
        action.setParams({
            "item": item
        });
        action.setCallback(this, function(response){
        	var state = response.getState();
        	if (component.isValid() && state === "SUCCESS") {
            	var items = component.get("v.items");
            	items.push(response.getReturnValue());
            	component.set("v.items", items);
            	component.set("v.newItem",{ 'sobjectType': 'Camping_Item__c',
               	    	'Name': '',
                    	'Quantity__c': 0,
                    	'Price__c': 0,
                    	'Packed__c': false });
        	}
        });
        $A.enqueueAction(action);
    },
    
    
    // Step 7
    validateItemForm: function(component) {

    	// Simplistic error checking
    	var validCampingItem = true;

    	// Name must not be blank
    	var fld = component.find("ciName");
    	var fldVal = fld.get("v.value");
    	if ($A.util.isEmpty(fldVal)){
     	   validCampingItem = false;
      	  fld.set("v.errors", [{message:"Name can't be blank."}]);
    	}
    	else {
        	fld.set("v.errors", null);
    	}

    	// Amount must be set, must be a positive number
    	var quantFld = component.find("ciQuantity");
    	var quantFldVal = quantFld.get("v.value");
    	if ($A.util.isEmpty(quantFldVal) || isNaN(quantFldVal) || (quantFldVal <= 0.0)){
        	validCampingItem = false;
        	quantFld.set("v.errors", [{message:"Enter qunatity."}]);
    	}
    	else {
        	// If the amount looks good, unset any errors...
        	quantFld.set("v.errors", null);
    	}
        
        // Amount must be set, must be a positive number
    	var priceFld = component.find("ciPrice");
    	var priceFldVal = priceFld.get("v.value");
    	if ($A.util.isEmpty(priceFldVal) || isNaN(priceFldVal) || (priceFldVal <= 0.0)){
        	validCampingItem = false;
        	priceFld.set("v.errors", [{message:"Enter price."}]);
    	}
    	else {
        	// If the amount looks good, unset any errors...
        	priceFld.set("v.errors", null);
    	}
    
    	return(validCampingItem);       
    }
})