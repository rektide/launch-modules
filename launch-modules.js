#!/usr/bin/env node
"use strict"

var
  Caller= require( "caller"),
  cluster= require( "cluster"),
  path= require( "path"),
  resolve= require( "resolve"),
  _module= module

function launchModules( modules, message, done){
	// message is optional, passed to worker if provided
	if( typeof(message)=== "function"){
		done= message
		message= null
	}
	var
	  // number of remaining modules left to run
	  remaining= modules.length,
	  // find the calling module
	  caller= Caller(),
	  // find the calling module's directory
	  basedir= path.dirname( caller)
	function forkModule( module, index){
		// locate the target module from the perspective of the caller
		var file= resolve( module, {basedir}, function( err, exec){
			// handle errors
			if( err){
				if( done){
					done( module)
					done= null
				}
				return
			}
			// set up the target module to be executed
			cluster.setupMaster({exec})
			// fork the worker & pass them a message
			cluster.fork().send( Object.assign({ module, index, exec, basedir}, message))
			cluster.setupMaster()
			if( done&& !--remaining){
				done()
			}
		})
	}
	modules.forEach( forkModule)
}

module.exports= launchModules
if( require.main=== module){
	require( "./main")()
}
