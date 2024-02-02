class Form {
  #fields = [];
  #formElement; 

  constructor(title, ) {
    this.title = title;
    this.#formElement = document.createElement("form"); 
  }

  #submit(e) {
    // Prevent page from refreshing on form submit.
    e.preventDefault();

    // Collect the values from the form fields. formData will be an array of objects
    // with key-value pairs referring to each field's name and value. 
    const formData = this.#fields.map((field) => {
      return {
        [field.name]: field.value 
      };
    });

    // Find the toast element and add the "show" class to it. 
    const toastElement = document.querySelector("#toast");

    toastElement.classList.add("show");
    // Set the text content of the toast element to be a JSON representation of formData.
    toastElement.textContent = formData.map((el) => JSON.stringify(el));

    // Wait 5 seconds, then remove the show class from the toast. 
    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 5000);

    return formData;
  }

  addField(field) {
    if (!(field instanceof Field)) {
      throw new Error (`Invalid argument, please provie field`); 
    }; 
    this.#fields.push(field); 
  }

  render() {
    const titleElement = document.createElement("h1"); 
    titleElement.textContent = this.title; 
    this.#formElement.append(titleElement); 

    this.#fields.forEach((field) => {
      const fieldElement = field.render(); 
      this.#formElement.append(fieldElement); 
    }); 

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    this.#formElement.append(submitButton);

    document.body.append(this.#formElement);

    this.#formElement.addEventListener(
      "submit",
      this.#submit.bind(this)
    );
  }
}

class Field {
  #inputElement;

  constructor(name, type, label) {
    this.name = name;
    this.type = type;
    this.label = label;
    this.#inputElement = document.createElement("input");
  }

  render() {
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("field-container");

    const labelElement = document.createElement("label");
    labelElement.textContent = this.label;

    this.#inputElement.name = this.name;
    this.#inputElement.type = this.type;

    fieldContainer.appendChild(labelElement);
    fieldContainer.appendChild(this.#inputElement);

    return fieldContainer;
  }

  get value() {
    return this.#inputElement.value;
  }
}
