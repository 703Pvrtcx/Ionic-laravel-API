
//Required HTTPClientESP32Ex library to be installed  https://github.com/mobizt/HTTPClientESP32Ex

#include <WiFi.h>
#include "FirebaseESP32.h"



#define FIREBASE_HOST "i703-partco-default-rtdb.firebaseio.com" //Change to your Firebase RTDB project ID e.g. Your_Project_ID.firebaseio.com
#define FIREBASE_AUTH "zRL2KCFCVpfYWHu5rU7pDh1fHPmIcvN91Ah3kgy7" //Change to your Firebase RTDB secret password
#define WIFI_SSID "703-Innoscend"
#define WIFI_PASSWORD "3D1D8J9NN85"


//Define Firebase Data objects
FirebaseData firebaseData1;
FirebaseData firebaseData2;

const int ledPin =  19; //GPIO19 for LED
const int swPin =  18; //GPIO18 for Switch
bool swState = false;
String path = "/Nodes";
String nodeID = "Node2"; //This is this node ID to receive control
String otherNodeID = "Node1"; //This is other node ID to control

void streamCallback(StreamData data)
{
  if (data.dataType() == "boolean") {
    if (data.boolData())
      Serial.println("Set " + nodeID + " to High");
    else
      Serial.println("Set " + nodeID + " to Low");
    digitalWrite(ledPin, data.boolData());
  }
}


void streamTimeoutCallback(bool timeout)
{
  if (timeout)
  {
    Serial.println();
    Serial.println("Stream timeout, resume streaming...");
    Serial.println();
  }
}


void setup()
{

  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  pinMode(swPin, INPUT);

  Serial.println();
  Serial.println();

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



  if (!Firebase.beginStream(firebaseData1, path + "/" + nodeID))
  {
    Serial.println("Could not begin stream");
    Serial.println("REASON: " + firebaseData1.errorReason());
    Serial.println();
  }

  Firebase.setStreamCallback(firebaseData1, streamCallback, streamTimeoutCallback);

}

void loop()
{

  if (digitalRead(swPin) != swState) {

    bool _swState = swState;
    swState = digitalRead(swPin);

    if (Firebase.setBool(firebaseData2, path + "/" + otherNodeID, swState)) {
      if (swState)
        Serial.println("Set " + otherNodeID + " to High");
      else
        Serial.println("Set " + otherNodeID + " to Low");
    } else {
      swState = _swState;
      Serial.println("Could not set " + otherNodeID);
    }

  }



}
