const formSchema = {
  "form": {},
  "theme": {
    "page": {
      "backgroundColor": "#1e2e1c",
      "backgroundType": "gradient",
      "backgroundGradient": {
        "position1": 0,
        "direction": 7,
        "type": "linear",
        "color1": "#091E3A",
        "color2": "#2F80ED",
        "position2": 100
      },
      "backgroundImage": "https://imagedelivery.net/bAvmm2B6r9as3tUUrr0Q1g/fe16c69b-fa3e-4f04-d238-d3c464c49300/full"
    },
    "card": {
      "border": {"width": 0, "color": "#707070"},
      "cover": {
        "position": "top",
        "maxHeight": 190, /*only used when cover.position="top"*/
        "widthCols": 5 /*only used when cover.position="left|right"*/
      },
      "shadow": 2,
      "maxWidth": 800,
      "maxHeight": 600,
      "minHeight": 400,
      "cornersRadius": 11,
      "backgroundColor": "#e8f7ff",
      "position": "center"
    },
    "inputs": {
      "style": "full",
      "labelStyle": "top",
      "labelSize": 4,
      "cornersRadius": 8,
      "fill": 100,
      "dense": false
    },
    "buttons": {
      "border": {"color": "#303030", "width": 1},
      "size": 3,
      "padding": 3,
      "shadow": 2,
      "backgroundColor": "#0051c9",
      "cornersRadius": 7,
      "textColor": "#ffffff",
      "backTextColor": "#141c3d"
    }
  },
  "pages": [{
    "type": "page",
    "header": "",
    "subHeader": "",
    "buttonLabel": "Submit",
    "name": "page1",
    "cover": {
      "backgroundColor": "#ffffff",
      "backgroundImage": "https://via.placeholder.com/700x280.png?text=one+two+three+four+five+six+seven+eight+nine+ten",
      "header": "page1",
      "subHeader": ""
    },
    "backgroundColor": "#ffffff99",
    "blocks": [{
      "type": "html",
      "name": "html",
      "label": "",
      "html": "<h4>Hello</h4>",
      "validations": {"format": "anything"},
      "behavior": {"displayed": "on"}
    }, {
      "type": "slider",
      "name": "slider",
      "label": "Slide it",
      "hint": "",
      "range": false,
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }]
  }, {
    "type": "page",
    "header": "",
    "subHeader": "",
    "buttonLabel": "Submit",
    "name": "page1",
    "cover": {
      "backgroundColor": "#ffffff",
      "backgroundImage": "https://via.placeholder.com/700x280.png?text=one+two+three+four+five+six+seven+eight+nine+ten",
      "header": "page1",
      "subHeader": ""
    },
    "backgroundColor": "#ffffff99",
    "blocks": [{
      "type": "html",
      "name": "html",
      "label": "",
      "html": "<h4>Hello</h4>",
      "validations": {"format": "anything"},
      "behavior": {"displayed": "on"}
    }, {
      "type": "slider",
      "name": "slider",
      "label": "Slide it",
      "hint": "",
      "range": false,
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "rating",
      "name": "rating",
      "label": "Please rate us",
      "hint": "",
      "shape": "gem", //heart, star, thumb, battery, dice, emoji, gem, bulb, lemon, moon, sun, hand-spock
      "max": 5,
      "size": "3em",
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "date",
      "name": "date",
      "label": "Choose a date",
      "hint": "",
      "placeholder": "",
      "range": true,
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "address",
      "name": "address",
      "label": "What is your address?",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "email",
      "name": "email",
      "label": "What is your eMail?",
      "hint": "We hate spammers too, we will not spam you",
      "placeholder": "john.doe@gmail.com",
      "validations": {"format": "email"},
      "behavior": {
        "readOnly": "off",
        "required": "on",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "tel",
      "name": "tel",
      "label": "What is your phone number?",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "password",
      "name": "password",
      "label": "Choose a password",
      "hint": "Minimum 8 characters",
      "placeholder": "",
      "validations": {"format": "anything", "minLength": 8},
      "behavior": {
        "readOnly": "off",
        "required": "on",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "on"
      }
    }, {
      "type": "signature",
      "name": "signature",
      "label": "Please sign",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "text",
      "name": "text",
      "label": "Enter some text",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "textarea",
      "name": "textarea",
      "label": "Tell us more",
      "hint": "Maximum 1000 characters",
      "placeholder": "",
      "validations": {"format": "anything", "maxLength": 1000},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "on"
      }
    }, {
      "type": "url",
      "name": "url",
      "label": "What is your website address?",
      "hint": "",
      "placeholder": "https://...",
      "validations": {"format": "url"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "number",
      "name": "number",
      "label": "Enter a number",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "number"},
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "checkbox",
      "name": "checkbox",
      "label": "Please choose some",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "options": [{"label": "Option 1", "value": "option1"}, {
        "label": "Option 2",
        "value": "option2"
      }, {"label": "Option 3", "value": "option3"}],
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "radio",
      "name": "radio",
      "label": "Please choose one",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "options": [{"label": "Option 1", "value": "option1"}, {
        "label": "Option 2",
        "value": "option2"
      }, {"label": "Option 3", "value": "option3"}],
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }, {
      "type": "select",
      "name": "select",
      "label": "Please choose",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "options": [{"label": "Option 1", "value": "option1"}, {
        "label": "Option 2",
        "value": "option2"
      }, {"label": "Option 3", "value": "option3"}],
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "on",
        "disabled": "off",
        "displayed": "on",
        "counter": "off",
        "multiple": true
      }
    }, {
      "type": "toggle",
      "name": "toggle",
      "label": "Please choose some",
      "hint": "",
      "placeholder": "",
      "validations": {"format": "anything"},
      "options": [{"label": "Option 1", "value": "option1"}, {
        "label": "Option 2",
        "value": "option2"
      }, {"label": "Option 3", "value": "option3"}],
      "behavior": {
        "readOnly": "off",
        "required": "off",
        "clearable": "off",
        "disabled": "off",
        "displayed": "on",
        "counter": "off"
      }
    }]
  }]
}

export default formSchema;
