public class CampingListController {

    @AuraEnabled
    public static List<Camping_Item__c> doInit(){
        return getItems();
    }
    
    @AuraEnabled
    public static List<Camping_Item__c> getItems(){
        return [SELECT  ID,
                    NAME,
                    Quantity__c,
                    Price__c,
                    Packed__c
            FROM Camping_Item__c];
    }
    
    @AuraEnabled
    public static Camping_Item__c saveItem(Camping_Item__c item){
        System.Debug('Inside saveCamping Method');
    	Database.SaveResult[] result = Database.insert(new List<Camping_Item__c>{item}, false);
    	for (Database.SaveResult sr : result) {
        	if(sr.isSuccess()){
                System.Debug('Operation is successful');
            }else{
                for(Database.Error err : sr.getErrors()) {
                    System.Debug('Error message: ' + err.getMessage());
                    System.Debug('Failed for below fields: ' + err.getFields());
                }
            }
        }
        return item;
    }
}