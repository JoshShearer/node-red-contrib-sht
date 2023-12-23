const { SHT31 } = require('sht31-node');

module.exports = function (RED) {
    function SHTNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.status({});
        const sht = new SHT31(config.shtaddress ? parseInt(config.shtaddress, 16) : null, config.shtbus ? parseInt(config.shtbus, 10) : null);

        node.on('input', async function (msg) {
            node.status({ fill: "yellow", shape: "dot", text: "querying..." });

            try {
                const shtdata = await sht.readSensorData();

                if (!isNaN(shtdata.temperature) && !isNaN(shtdata.humidity)) {
                    const temp = shtdata.temperature.toFixed(1);
                    const hum = shtdata.humidity.toFixed(1);
                    node.status({ fill: "green", shape: "dot", text: `${temp}°C ${hum}%` });
                    msg.payload = shtdata;
                } else {
                    node.status({ fill: "red", shape: "dot", text: "invalid data!" });
                    msg.payload = { temperature: "N/A", humidity: "N/A" };
                }

                node.send(msg);
            } catch (err) {
                node.status({ fill: 'red', shape: 'dot', text: 'Error reading sensor' });
                node.error(err, msg);
            }
        });
    }

    RED.nodes.registerType("SHT3x", SHTNode);
};
