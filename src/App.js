import MenuControl from "./MenuControl.js";

export default class App {
  async play() {
    const menuControl = new MenuControl();
    menuControl.start();
  }

}


