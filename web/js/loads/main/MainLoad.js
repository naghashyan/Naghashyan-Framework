import AbstractLoad from '../../ngs/AbstractLoad.js';

export default class MainLoad extends AbstractLoad {

  constructor() {
    super();
    this.animationElementContainer = null;
  }


  getContainer() {
    return "initialLoad";
  }

  onError(params) {

  }

  afterLoad() {
  }

}