let socketInstance = {
  broadcast: null,
  getClientCount: null
};

export function setSocketInstance(instance) {
  socketInstance = instance;
}

export function getSocketInstance() {
  return socketInstance;
}
