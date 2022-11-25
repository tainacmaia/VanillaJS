window.utils = {
    CreateElementWithAttribute: (elName, attrType, attrName) => {
        const newElement = document.createElement(elName);
        newElement.setAttribute(attrType, attrName)
        return newElement;
    },

    SetMultipleAttributes: (el, attrs) => {
        for(const key in attrs) {
        el.setAttribute(key, attrs[key]);
        }
    },

    CallLink: (type, reference) => {
        const link = document.createElement('link')
        utils.SetMultipleAttributes(link, {
            'rel': type,
            'href': reference  
        })
        document.head.appendChild(link);   
    },

    CreateButton: (btnText, className = '') => {
        const newButton = document.createElement('button');
        newButton.textContent = btnText;
        newButton.setAttribute('class', className);
        return newButton;
    }
}