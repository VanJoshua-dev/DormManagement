
let socket = null;

export function connectSocket() {
  if (!socket) {
    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      socket = null;
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };
  }

  return socket;
}
