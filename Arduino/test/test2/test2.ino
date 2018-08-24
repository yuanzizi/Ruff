int incomingByte = 0;   // for incoming serial data
String str;
void setup() {
        Serial.begin(9600);     // opens serial port, sets data rate to 9600 bps
}

void loop() {

getSerial();
        
}

void getSerial(){
  while (Serial.available() > 0) {
                // read the incoming byte:
                incomingByte = Serial.read();
                str += char(incomingByte);
                // say what you got:
//                Serial.print("I received: ");
//                Serial.println(incomingByte, DEC);
                delay(100);
        }
        if (str != NULL) {
          Serial.print("I received string: ");
          Serial.println(str);
          str = "";
        }
}

