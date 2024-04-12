const { contextBridge, ipcRenderer,shell } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    openFile: (name) => {
        ipcRenderer.send('open-file', name);
    }
});

