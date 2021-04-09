# node-red-contrib-sht

This node for Node-RED provides easy access to read temperature and humidity values from the Sensirion SHT31 or SHT35 sensors.

## Requirements

* Raspberry Pi
* I2C must be enabled
* Sensirion SHT31 or SHT35 sensor
* Node.js v7.6 or newer
* [sht31-node](https://github.com/thomas-bouvier/sht31-node) from Thomas Bouvier

## Installation

### Prereqeuisites

```bash
# Run this in your favourite terminal
npm install sht31-node
```

Highly recommended: Run the Node-Red specific [bash script for the Raspberry Pi](https://nodered.org/docs/getting-started/raspberrypi) followed by

```bash
npm rebuild
npm update
```

### Installation of node-red-contrib-sht

Just install this module in your node-RED configuration folder

```bash
cd ~/.node-red
npm install node-red-contrib-sht
```

Or globally:

```bash
npm install -g node-red-contrib-sht
```

## Usage

You will find this node in the **i2c bus** section of the palette panel or just filter the nodes for "sht".

The `msg.payload` of the outgoing object will be a object with the key names `temperature` and `humidity` and the values, e.g. `{ "temperature" : 21.9, "humidity" : 37,5 }`. Temperature value unit is in °C, humidity in %RH.

The queried I2C address of 0x44 is changable.


![Demo Image](https://github.com/jelehmann/node-red-contrib-sht/blob/main/node-demo.png)

## Contributing

1. Fork it
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add new feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request

## Credits

This is just a very basic and simple Node-RED wrapper for Thomas Bouviers excelent [sht31-node](https://github.com/thomas-bouvier/sht31-node) Node.js library. He deserves all credits.

## License

MIT