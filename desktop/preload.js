const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('glyphwrightDesktop', {
  saveFile: (filename, data, kind) => ipcRenderer.invoke('save-file', { filename, data, kind })
});
