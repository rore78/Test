({
	doInit: function(component, event, helper) {
        console.log('Here 1');
        var action = component.get('c.getAccounts');
        var sfurl = event;
        console.log('<url>'+sfurl);
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('state:', state);
            if (state == "SUCCESS") {
                var acc = response.getReturnValue();
                console.log('Accounts: ', acc); 
                //console.log('AccountID: ', acc[0].Id);           
                if(acc.length > 0){
                    var latitude = 0;
					var longitude = 0;
                    var n = acc.length;
                	for(var i=0; i<acc.length; i++){
                    	latitude += parseFloat(acc[i].BillingLatitude);
						longitude += parseFloat(acc[i].BillingLongitude);
                	}
                    //var mapOptionsCenter = {"lat":parseFloat(acc[0].BillingLatitude), "lng":parseFloat(acc[0].BillingLongitude)};
                    var mapOptionsCenter = {"lat":latitude/n, "lng":longitude/n};
                 	
                    var mapData = Array();
                    
                    for(var i=0; i<acc.length; i++){
                        //console.log('AccountID: ' + acc[i].Id);
                        var markerText = '<div id="content">' + '<div id="siteNotice">'+ '</div>';
                        markerText += '<h1 id="firstHeading" class="firstHeading">' + acc[i].Name + '</h1>';
                       	markerText += '<p><a href="/' + acc[i].Id +' "target="_blank">' + acc[i].Name + "</a></div>";
                        mapData.push({"lat":parseFloat(acc[i].BillingLatitude), "lng":parseFloat(acc[i].BillingLongitude), "markerText":markerText})
                    }
                    
                    component.set('v.mapOptionsCenter', mapOptionsCenter);
                    component.set('v.mapData', mapData);
                    component.set('v.acc', acc);
                }
            }

        });
        $A.enqueueAction(action);
	}
})