const int InfraredSensorPin = 14;//Connect the signal pin to the digital pin 4
const int LedDisp = 13;

void setup()
{
  Serial.begin(9600); 
  pinMode(InfraredSensorPin,INPUT);
  pinMode(LedDisp,OUTPUT);
  digitalWrite(LedDisp,LOW);
}

void loop()
{
  if(digitalRead(InfraredSensorPin) == LOW)  digitalWrite(LedDisp,HIGH);
  else  digitalWrite(LedDisp,LOW);

  if(digitalRead(InfraredSensorPin) == 0) {
    Serial.print(digitalRead(InfraredSensorPin));
  }
  delay(50);
}
