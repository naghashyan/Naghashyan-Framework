import AbstractLoad from '../../ngs/AbstractLoad.js';

export default class HomeLoad extends AbstractLoad {

  constructor() {
    super();
  }


  getContainer() {
    return "content";
  }

  onError(params) {

  }

  afterLoad() {
    alert(123456);
  }

}