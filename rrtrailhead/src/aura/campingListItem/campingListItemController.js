({
    packItem : function(component, event, helper) {
        var btnClicked = event.getSource();         // the button
        var btnMessage = btnClicked.get("v.label"); // the button's label
        btnClicked.set("v.disabled",true);			// Disable the button
        var item = component.get('v.item');			// Get the Item 
        item.Packed__c = true;						// set the Field 
        component.set('v.item', item);				// update the Component
        // component.set("v.item.Packed__c", "true");

        
    }
})