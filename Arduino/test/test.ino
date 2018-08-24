// 定义2号引脚为按键插入引脚
int buttonPin = 2;
int ledPin = 13; // 定义针脚号，数字类型为整型
int beezerPin = 4;
int buttonState = 0;
int lastButtonState = 0;
int buttonPushCounter = 0;
// 对Arduino电路板或相关状态进行初始化方法
void setup() {
  // 开启串行通信，并设置其频率为9600。
  // 如果没有特别要求，此数值一般都为9600。
  Serial.begin(9600);
  // 设置2号引脚为信号输入引脚
  pinMode(buttonPin, INPUT);
    pinMode(ledPin, OUTPUT);
    pinMode(beezerPin,OUTPUT);
}

// 系统调用，无限循环方法
void loop() {
  // 读取按键的输入状态
  buttonState = digitalRead(buttonPin);
  // 判断当前的按键状态是否和之前有所变化
  if (buttonState != lastButtonState) {
    // 判断当前按键是否为按下状态，
    // 如果为按下状态，则记录按键次数的变量加一。
    if (buttonState == HIGH) {
      // 将记录按键次数的变量加一
      buttonPushCounter++;
      // 向串口调试终端打印字符串“on”，
      // 表示当前按键状态为按下接通状态，
      // 输出完成之后自动换行。
      Serial.println("on");
      // 向串口调试终端打印字符串
      // “number of button pushes: ”，此处没有换行。
      Serial.print("number of button pushes:  ");
      // 接着上一行尾部，打印记录按键次数变量的数值。
      Serial.println(buttonPushCounter);
    } else {
      // 向串口调试终端打印字符串“off”，
      // 表示当前按键状态为松开状态，也即断开状态。
      Serial.println("off");
    }
    // 为了避免信号互相干扰，
    // 此处将每次按键的变化时间间隔延迟50毫秒。
    delay(50);
  }
  // 将每次loop结束时最新的按键状态进行更新
  lastButtonState = buttonState;
  // 每点击4次，更新一次LED神灯状态。
  // 这里的百分号是求余数的意思，
  // 每次除以四，余数等于零说明按键点击的
  // 次数是四的整数倍，即此时更新LED神灯。
  if (buttonPushCounter % 4 == 0) {
    // 点亮LED神灯
    digitalWrite(ledPin, HIGH);
  } else {
    // 熄灭LED神灯
    digitalWrite(ledPin, LOW);
  }
}

