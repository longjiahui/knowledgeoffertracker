import $ from 'jquery'

// Setting global variables
var loadTrackerSP = 0;
var user = {};

// Start script
$( document ).ready(function() {
	$.getScript( "js/MicrosoftAjax.js" )
	  .done(function( script, textStatus ) {
		console.log( 'AJAX JS LOADED' );
		loadTrackerSP += 1;
		checkLoadStatusSP();
		
		// Trigger additional SP Runtime JS load
		$.getScript( "https://mysite.na.xom.com/_layouts/15/sp.runtime.js" )
		  .done(function( script, textStatus ) {
			console.log( 'SP RUNTIME JS LOADED' );
			loadTrackerSP += 1;
			checkLoadStatusSP();
			
			// Trigger additional SP Runtime JS load
			$.getScript( "https://mysite.na.xom.com/_layouts/15/sp.js" )
			  .done(function( script, textStatus ) {
				console.log( 'SP JS LOADED' );
				loadTrackerSP += 1;
				checkLoadStatusSP()
			  })
			  .fail(function( jqxhr, settings, exception ) {
				alert("Yikes! Something didn't work. Try again or contact your administrator.");
			});
		  })
		  .fail(function( jqxhr, settings, exception ) {
			alert("Yikes! Something didn't work. Try again or contact your administrator.");
		});
	  })
	  .fail(function( jqxhr, settings, exception ) {
		alert("Yikes! Something didn't work. Try again or contact your administrator.");
	});
});

// FUNCTIONS
function checkLoadStatusSP() {
	if(loadTrackerSP == 3) { startSP(); }
}

function startSP() {
	console.log('START SP LOGIC')
	CallClientOM();
}

//  SHAREPOINT LOGIC

function CallClientOM(){
	var context = new SP.ClientContext.get_current();
	this.website = context.get_web();
	this.currentUser = website.get_currentUser();
	context.load(currentUser);
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded(sender, args)
 {
	 // Set user object
	 user.lanid = currentUser.get_loginName().substr(currentUser.get_loginName().length - 7);
	 user.name = currentUser.get_title().split(', ')[1].split(' ')[0];
	 user.email = currentUser.get_email();
	 user.login = currentUser.get_loginName().split('|')[1].replace(/\\/g, '_');
	
	console.log('Retrieved user')
 }

function onQueryFailed(sender, args)
{
alert('request failed ' + args.get_message() + '\n'+ args.get_stackTrace());
}

// EXAMPLE GET REQUEST
//https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/hh185007(v=office.14)
function retrieveListItemsVideos() {

    var clientContext = new SP.ClientContext(siteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(String(listNameVideo));
        
    var camlQuery = new SP.CamlQuery();
	
    camlQuery.set_viewXml('<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' + 
        '<Value Type=\'Number\'>1</Value></Geq></Where></Query><RowLimit>50</RowLimit></View>');

	collListItems = oList.getItems(camlQuery);
    clientContext.load(collListItems);
    //this.collListItem = oList.getItems(camlQuery);
        
    //clientContext.load(collListItem);
        
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededVideo), Function.createDelegate(this, this.onQueryFailed));        
}

function onQuerySucceededVideo(sender, args) {
	var listItemInfo = '';
    var listItemEnumerator = collListItems.getEnumerator();
	while (listItemEnumerator.moveNext()) {
		
		// Create object
		var item = {};
		item.id = listItemEnumerator.get_current().get_id();
		item.sheet = listItemEnumerator.get_current().get_item(String(sheetVideoName));
		item.url = listItemEnumerator.get_current().get_item(String(urlVideoName));
		item.desc = listItemEnumerator.get_current().get_item(String(descVideoName));
		helpVideos.push(item);
    }
}

// EXAMPLE POST
// https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/hh185011(v=office.14)