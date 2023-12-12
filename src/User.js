import { Random } from '@woowacourse/mission-utils';
import MENU from './Menu.js';
export default class User {
  #name = '';
  #hateMenu = [];
  #weekMenu = [];
  #weekCategory = [];

  constructor(name = '', hateMenu = [], weekCategory = []) {
    this.#name = name;
    this.#hateMenu = hateMenu;
    this.#weekCategory = weekCategory;
  }

  getWeekMenu() {
    this.pickMenu();
    return [...this.#weekMenu];
  }

  pickMenu() {
    this.#weekCategory.forEach((value) => {
      let shuffledMenus;
      const category = MENU.menu[value];
      do {
        const categoryIndexArray = this.createArray(category.length);
        shuffledMenus = Random.shuffle(categoryIndexArray);
      } while (
        this.isMenuInvalid(category[shuffledMenus[0]]) ||
        this.#weekMenu.includes(category[shuffledMenus[0]])
      );
      this.#weekMenu.push(category[shuffledMenus[0]]);
    });
  }

  isMenuInvalid(shuffledMenu = '') {
    return this.#hateMenu.includes(shuffledMenu);
  }

  createArray(length) {
    return Array.from({ length }, (_, index) => index);
  }

  getName() {
    return this.#name;
  }
}
