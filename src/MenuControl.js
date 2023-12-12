import { Console, Random } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import User from './User.js';
import MENU from './Menu.js';

export default class MenuControl {
  #categoryHistory = [0, 0, 0, 0, 0];
  #weekCatergory = [];

  async start() {
    OutputView.printIntroduce();
    const nameArray = await MenuControl.getNameArray();
    this.pickCategory();
    const userArray = await this.getuserArray(nameArray);
    OutputView.printResultTitle([...this.#weekCatergory]);
    OutputView.printUserArray([...userArray]);
    OutputView.printComplete();
  }

  static async getNameArray() {
    while (true) {
      try {
        const nameString = await InputView.readName();
        const nameArray = MenuControl.stringToNameArray(nameString);
        return nameArray;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static stringToNameArray(nameString = '') {
    const nameArray = nameString.split(',');
    MenuControl.checkNameArrayValidate(nameArray);
    nameArray.forEach((value) => {
      MenuControl.checkNameValidate(value);
    });
    return nameArray;
  }

  static checkNameArrayValidate(nameArray = []) {
    if (nameArray.length < 2 || nameArray.length > 4) {
      throw new Error('[Error]');
    }
  }

  static checkNameValidate(name = '') {
    if (name.length < 2 || name.length > 4) {
      throw new Error('[Error]');
    }
  }

  async getuserArray(nameArray = []) {
    return await nameArray.reduce(async (acc, name) => {
      const users = await acc;
      await this.getUserArray2(name, users);
      return users;
    }, []);
  }

  async getUserArray2(name = '', users = []) {
    while (true) {
      try {
        const menuString = await InputView.readMenu(name);
        const menuArray = MenuControl.stringToUserArray(menuString);
        users.push(new User(name, menuArray, [...this.#weekCatergory]));
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static stringToUserArray(menuString = '') {
    if (menuString.length === 0) {
      return [];
    }
    const menuArray = menuString.split(',');
    MenuControl.checkMenuArrayvaliate(menuArray);
    menuArray.forEach((menu) => {
      MenuControl.checkMenuvalidate(menu);
    });
    return menuArray;
  }

  static checkMenuArrayvaliate(menuArray = []) {
    if (menuArray.length > 2 || new Set(menuArray).size !== menuArray.length) {
      throw new Error('[Error]');
    }
  }

  static checkMenuvalidate(menu = '') {
    let flag = false;
    MENU.menu.forEach((value) => {
      if (value.includes(menu)) {
        flag = true;
      }
    });
    if (!flag) {
      throw new Error('Error');
    }
  }

  pickCategory() {
    for (let i = 0; i < 5; i += 1) {
      let categoryIndex;
      do {
        categoryIndex = Random.pickNumberInRange(1, 5) - 1;
      } while (this.#categoryHistory[categoryIndex] >= 2);

      this.#categoryHistory[categoryIndex] += 1;
      this.#weekCatergory.push(categoryIndex);
    }
  }
}
