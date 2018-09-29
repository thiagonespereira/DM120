require('mraa');
var requestify = require('requestify');
var sensorModule = require('jsupm_ttp223');
var groveSensor = require('jsupm_grove');
var upmBuzzer = require("jsupm_buzzer");

var temp = new groveSensor.GroveTemp(0);
var light = new groveSensor.GroveLight(1);
var touch = new sensorModule.TTP223(3);
var button = new groveSensor.GroveButton(2);

var myBuzzer = new upmBuzzer.Buzzer(5);

var count =0;

console.log("START!");
var buzzz = 0;

var thing = "coisaFabianeThiago";

readData();

function readData() {
    var celsius = temp.value();
    var lux = light.value();
    var isTouched = touch.isPressed()
    var isPressed = button.value();
    var url = "https://dweet.io:443/dweet/for/" + thing
    var status = "";
    if (celsius < 30 && lux > 20) {
        status = "Em funcionamento"

    }
    else {
        status = "Alarmado";
    }


    // Envia dados para servidor via método POST    
    requestify.post(url, {
        temperatura: celsius,
        luz: lux,
        sendoTocado: isTouched,
        botaoPressionado: isPressed,
        buzzer: buzz,
        status: status
    })
        .then(function (response) {
            //console.log(response);
            // Obtem resposta do servidor
            response.getBody();

            console.log("Enviando: " + response.body.with[0].content.status)
        });

        count++;

        if(count==5){
            alarm();
            count=0;
        }

    setTimeout(readData, 1000);
}

function alarm() {
    console.log("Alarm!");
    requestify.get("https://dweet.io:443/get/latest/dweet/for/coisabuzzertf")
        .then(function (response) {
            
            buzzz = response.getBody().with[0].content.buzzer;
            console.log(buzzz);
            if (buzzz == 1) {
                buzz();
            }
        });


    //Chama a função a cada 5 segundo 
    //setTimeout(alarm, 5000);
}

function buzz() {
    console.log(myBuzzer.playSound(1000, 500000));
}



