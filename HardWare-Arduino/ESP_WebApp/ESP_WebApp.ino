
//Required HTTPClientESP32Ex library to be installed  https://github.com/mobizt/HTTPClientESP32Ex

#include <WiFi.h>
#include "FirebaseESP32.h"

#define FIREBASE_HOST "i703-partco-default-rtdb.firebaseio.com" //Change to your Firebase RTDB project ID e.g. Your_Project_ID.firebaseio.com
#define FIREBASE_AUTH "zRL2KCFCVpfYWHu5rU7pDh1fHPmIcvN91Ah3kgy7" //Change to your Firebase RTDB secret password
#define WIFI_SSID "703-Innoscend"
#define WIFI_PASSWORD "3D1D8J9NN85"

bool systemActive;
int state = 0;
FirebaseData fbdo;

unsigned long sendDataPrevMillis = 0;
int count = 0;
String active = "online";
String stringValue="";
int LED_BUILTIN = 2;

void setup()
{
  Serial.begin(115200);
   Serial.println();
    Serial.println();
    pinMode (LED_BUILTIN, OUTPUT);
    
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(1000);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.RTDB.setString(&fbdo, "active/name", "online");
  Firebase.RTDB.setString(&fbdo, "active/state", "on");
  }
void loop()
{
    Firebase.RTDB.setBool(&fbdo, "activeState/name", true);
//    active = Firebase.RTDB.getString(&fbdo, "/active/name"); 
     if(Firebase.RTDB.getString(&fbdo, "/active/name"))
      {
         if(fbdo.dataType()=="string")
        {
           stringValue = fbdo.stringData(); 
           Serial.println("State : " + stringValue);
           Serial.println("Active : " + active);
           
          }
        }

     if(Firebase.RTDB.getBool(&fbdo, "/activeState/name"))
    {
       if(fbdo.dataType()=="boolean")
       {
         systemActive = fbdo.boolData(); 
         Serial.println("---:" + systemActive);
           
         if(systemActive){
          Serial.println("Led Turned ON" );    
          digitalWrite(LED_BUILTIN, HIGH); 
          delay(500);
          digitalWrite(LED_BUILTIN, LOW); 
         } 
         else{
          Serial.println("Led Turned Off");    

         } 
       }
    }
    else{
      Serial.println("Can't get");    
    }
}

void states(int i){
  switch(i){
    case 0: {
      state = 0;
    }
    break;
    case 1: {
      state = 1;  
    }
    break;
    case 2: {
      state = 2;
    }
    break;
    case 3: {
      state = 3;
    }
    break;
    case 4: {
      state = 4;
    }
    break;  
  } 
}
void read_Data(){

    
    
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setBool(&fbdo, "System/state", false)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
}

void write_Data(){
  
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setBool(&fbdo, "System/state", false)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    // Write an Float number on the database path test/float
    if (Firebase.RTDB.setFloat(&fbdo, "test/float", 0.01 + random(0,100))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    delay(5000);
}

void writeData(){
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setInt(&fbdo, "test/int", count)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;
    
    // Write an Float number on the database path test/float
    if (Firebase.RTDB.setFloat(&fbdo, "test/float", 0.01 + random(0,100))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }  
}
