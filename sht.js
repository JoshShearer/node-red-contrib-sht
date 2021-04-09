const {SHT31} = require('sht31-node')

module.exports = function(RED) {
    function SHTNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;  
        node.status({});
        node.on('input', function(msg, send, done) {
			const s = new SHT31()
			if (config.shtaddress) s.address = parseInt(config.shtaddress, 16);
			node.status({fill:"yellow",shape:"dot",text:"querying..."});
			const data = s.readSensorData().then(daten => {
				// const temperature = daten.temperature.toFixed(2);
				// const humidity    = daten.humidity.toFixed(2);
				// node.warn("Temperatur: "+temperature+" °C");
				// node.warn("Luftfeuchtigkeit: "+humidity+" %");
				return daten;
			}).catch(function(err) {
          		node.status({fill: 'red', shape: 'dot', text: 'no sensor at 0x'+s.address.toString(16)});
          		done(err);
          		node.error;
        	});

			data.then(shtdaten => {
				if (isNaN(shtdaten.temperature)) {
					node.status({fill:"red",shape:"dot",text:"invalid data!"});
				} else {
					node.status({fill:"green",shape:"dot",text:shtdaten.temperature.toFixed(1)+"°C "+shtdaten.humidity.toFixed(1)+"%"});
				}
			    msg.payload = shtdaten;
			    node.send(msg);   
			});
        });     
    }
    RED.nodes.registerType("SHT3x",SHTNode);
}