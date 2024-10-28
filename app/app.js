const { app, BrowserWindow } = require('electron');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadFile(path.join(__dirname, 'src/index.html'));
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});