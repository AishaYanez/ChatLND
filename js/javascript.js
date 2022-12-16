import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBWBYmRTs-BtabLtfixA-hGdpf2p9A-84w",
    authDomain: "chatlnd-15b2c.firebaseapp.com",
    databaseURL: "https://chatlnd-15b2c-default-rtdb.firebaseio.com",
    projectId: "chatlnd-15b2c",
    storageBucket: "chatlnd-15b2c.appspot.com",
    messagingSenderId: "1090937730397",
    appId: "1:1090937730397:web:6069e9a86f3d5cabae24b4"
  };

// Initialize Firebase
initializeApp(firebaseConfig);

function listenToNewMessages() {
  const db = getDatabase();
  const messagesRef = ref(db, 'messages/');
  onValue(messagesRef, showMessages);
}

function listenToSentMessageButton() {
  document.getElementById("form-send-message").addEventListener("submit", sendMessage);
}

function showMessages(snapshot) {
  let message = snapshot.val();

  let messageList = "";
  for (let i in message) {
    messageList = `
          <div>
            <div>${message[i].sentBy}:</div>
            <div>${message[i].text}</div>
          </div>
        ` + messageList;
  }

  let messageListElement = document.getElementById("message-list");
  messageListElement.innerHTML = messageList;
}

function sendMessage(event) {
  event.preventDefault();
  let formSendMessage = event.target;

  const db = getDatabase();
  const messagesRef = ref(db, 'messages/');
  const newMessageRef = push(messagesRef);
  set(newMessageRef, {
    text: formSendMessage["text"].value,
    sentBy: formSendMessage["sent-by"].value
  })
  formSendMessage["text"].value = "";
  formSendMessage["sent-by"].value = "";
}

listenToNewMessages();
listenToSentMessageButton();