/* 
	Simple JS script to setup on NFS shares on linux
*/

'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const array = require('lodash/array');
const serverIp = '10.0.0.30';

const nfs = [
	{
		folder:'neso', 
		remote:'/mnt/backup/neso/'
	},
	{
		folder:'raven-clients', 
		remote:'/mnt/backup/Ravenspec_clients'
	},
];

fs.readdir('/mnt', function(err, files) {
	if (err)
		console.log(err);

	/*
		Create Missing Folders.
	*/

	nfs.forEach(function(share) {
    	if(array.findIndex(files, share.folder) === -1){
    		exec('sudo mkdir /mnt/' + share.folder );
    	}
	});

});

/* 
	Create the NFS Shares
*/

nfs.forEach(function(share) {
	exec('sudo mount -t nfs ' + serverIp + ':' + share.remote + ' ' + '/mnt/' +share.folder, function(error, stdout, stderr) { 
		if(stderr)
			console.log(stderr);

	});
});