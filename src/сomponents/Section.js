export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  setItem(element) {
    this._container.prepend(element)
  }

  //clear() {}

  renderItems() {
    //this.clear();
    this._renderedItems.forEach((item) =>{
      this._renderer(item);
    });
  }
}