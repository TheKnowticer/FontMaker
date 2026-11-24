const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');

app.setAppUserModelId('dev.glyphwright.desktop');
function createWindow() {
  const win = new BrowserWindow({
    width: 1500, height: 1000, minWidth: 800, minHeight: 600,
    backgroundColor: '#111318', title: 'Glyphwright',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.removeMenu();
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//i.test(url) || /^mailto:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (event, url) => {
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
      if (/^https:\/\//i.test(url) || /^mailto:/i.test(url)) shell.openExternal(url);
    }
  });
  win.loadFile(path.join(__dirname, '..', 'index.html'));
}
ipcMain.handle('save-file', async (event, { filename, data, kind }) => {
  if (!['project', 'font'].includes(kind) || typeof filename !== 'string' || !(typeof data === 'string' || data instanceof ArrayBuffer)) throw new Error('Invalid file data');
  const result = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
    defaultPath: path.join(app.getPath('documents'), path.basename(filename)),
    filters: kind === 'project' ? [{ name: 'Glyphwright project', extensions: ['json'] }] : [{ name: 'OpenType font', extensions: ['otf'] }]
  });
  if (result.canceled || !result.filePath) return null;
  await fs.writeFile(result.filePath, typeof data === 'string' ? data : Buffer.from(data));
  return result.filePath;
});
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
