export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  setItem(element) {
    this._container.append(element)
  }

  setNewItem(element) {
    this._container.prepend(element)
  }

  renderItems() {
    this._renderedItems.forEach((item) =>{
      this._renderer(item);
    });
  }
}