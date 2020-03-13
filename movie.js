export class Movie extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setMovie();
    }

    setMovie(){
        const div = document.createElement(`div`, { is: this.ELEMENT_NODE })
        div.textContent = this.getAttribute('movie');
        this.shadowRoot.appendChild(div)
    }

    static getObservedAttributes() {
        return ['movie'];
    }

    /**
    * Called when an attribute changes
    * @param {string} attrName 
    * @param {string} oldVal 
    * @param {string} newVal 
    */
    async attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "movie") {
            console.log('movie', newVal, oldVal)
            if (oldVal !== newVal) {
                this.shadowRoot.appendChild(document.createElement('div', { is: this.ELEMENT_NODE }))
                this.textContent = newVal;
            }
        }
    }
}