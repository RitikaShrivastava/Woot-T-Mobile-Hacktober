$(document).ready(function(){
    setInterval(function(){
        $.ajax({
            url: 'https://1eed0w5fyb.execute-api.us-west-2.amazonaws.com/prod/wootRestEndpoint?TableName=TruckInfo',
            dataType: 'json',
            success: function(response) {
                console.log("response");
            }, 
            error: function(error) {
            	console.log(error);
            }
        });
    }, 5000);
});