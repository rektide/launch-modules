#!/usr/bin/env node
"use strict"

var launchModules= require( ".")

function main( modules){
	modules= modules|| process.argv.slice(2)
	launchModules( modules, {greetings: "to you"}, function( err){
		if( err){
			// we'll only get this message for the name of the first module that fails
			console.error( err+ " failed!")
			// but we will continue trying to kick off remaining modules before we kick it
			process.nextTick( ()=> process.exit(1))
		}else{
			// success! note these modules might not be done running yet!
			process.exit()
		}
	})
}

module.exports= main
if( require.main=== module){
	main()
}
