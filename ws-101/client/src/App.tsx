import ChatContainer from "./ChatContainer";

function App() {
  const connection = new WebSocket("www.test.com");

  return <ChatContainer />;
}

export default App;
