function testCode(request, response){
	
	response.contentType = 'application/json';
	var glassIns = ds.GlassIn.query('processed_at is null');
	response.body = JSON.stringify(glassIns);

}
