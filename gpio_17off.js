var gpio = require("pi-gpio")

gpio.open(11, "output", function(err) {
	gpio.write(11, 0, function() {
		gpio.close(11);
	});

});
