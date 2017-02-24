var worker= require( "cluster").worker
if( worker){
	worker.on( "message", message=> console.log(JSON.stringify(message)))
}else{
	console.error( "expected to be a cluster worker")
}
