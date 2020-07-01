const electron = require("electron") ;
const app = electron.app ;
function createWindow() {
    const win = new electron.BrowserWindow({
        width : 800,
        height: 600 
    })


}
app.whenReady().then(createWindow) ;


// for windows users
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
// for macOs users
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
