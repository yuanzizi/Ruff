
 
void setup() {
   Serial.begin(115200);
   while (!Serial) {
      Serial.println("Waiting Serial Port.....");; // wait for serial port to connect. Needed for native USB port only
  }  // initialize serial communications

}


void loop() {
  // put your main code here, to run repeatedly:
    Serial.println("Loop.....");
    getSerial();
//    sendMsg();
  delay(15*1000);
}

void sendMsg()
  {
   
  Serial.println("AT");
 delay(5000);
    //getSerial();
  Serial.println("AT+CMGF=1");
  delay(2000);
 Serial.println("AT+CMGS=\"13509889894\"");//这里改成你的号码
  delay(2000);
  Serial.print("Test\r\n");//这里写内容
  delay(2000);
  Serial.write(0x1A); //原来这里我是“Serial.print(0x1A);”，一直调不出来，后来改了才成功了，那酸爽
    delay(2000);
  getSerial();
 }

 String str = "";    // string to hold input
 

void getSerial() {
  // Read serial input:
  while (Serial.available() > 0) {
    char inChar = Serial.read();
    while (isDigit(inChar)) {
      // convert the incoming byte to a char 
      // and add it to the string:
      str += (char)inChar; 
    
      delay(500);
    }
      Serial.print("String: ");
      Serial.println(str);
      // clear the string for new input:
       
    }
    str = "";
    delay(500);
    
}




