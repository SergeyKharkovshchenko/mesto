const cardsContainer = document.querySelector('.elements');

export class Section{
    constructor({ items, renderer }, containerSelector){
        this._initialArray = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    clear() {
      this._container.querySelectorAll('.element').forEach((item) => item.outerHTML = "");
      }
    
    renderItems() {
      this.clear();
      this._initialArray.forEach(item => {
          this._renderer(item); // вызываем renderer, передав item
        });
      }

    addItem(cardElement){
        this._container.append(cardElement);
    }

}



  
  