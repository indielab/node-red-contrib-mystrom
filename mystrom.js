module.exports = function(RED) {	
	
	function MyStromConfig(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;
        this.name = n.name;	
	}
	
	function MyStromOn(config) {
		
		var http = require('http');
		
		RED.nodes.createNode(this,config);
        this.server = RED.nodes.getNode(config.server);	
        
        var node = this;
        
        this.on('input', function(msg) {
        	http.get({
        		hostname : node.server.host,
        		path : '/relay?state=1'
        	}, function(response) {}).end();
        });
        
	}
	
	function MyStromOff(config) {
		
		var http = require('http');
		
		RED.nodes.createNode(this,config);
        this.server = RED.nodes.getNode(config.server);	
        
        var node = this;
        
        this.on('input', function(msg) {
        	http.get({
        		hostname : node.server.host,
        		path : '/relay?state=0'
        	}, function(response) {}).end();
        });
        
	}
	
	function MyStromState(config) {
		
		var http = require('http');
		
		RED.nodes.createNode(this,config);
        this.server = RED.nodes.getNode(config.server);	
        
        var node = this;
        
        this.on('input', function(msg) {
        	http.get({
        		hostname : node.server.host,
        		path : '/report'
        	}, function(response) {
        		var body = '';
        		
        		response.on('data', function(data) {
        			body += data;
        		});
        		
        		response.on('end', function() {
        			msg.payload = JSON.parse(body);
        			node.send(msg);
        		});
        		
        	}).end();
        });
        
	}		
	
	RED.nodes.registerType("mystrom-config", MyStromConfig);
	RED.nodes.registerType("mystrom-on", MyStromOn);
	RED.nodes.registerType("mystrom-off", MyStromOff);
	RED.nodes.registerType("mystrom-state", MyStromState);	
	
}