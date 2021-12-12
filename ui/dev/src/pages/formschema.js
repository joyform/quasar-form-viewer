const formSchema = {
  form: {
    header: "Contact Us",
    subHeader: "We'll get back to you as soon as possible",
    icon: "", // URL
    actionUrl: "https://api.form-data.com/f/s49oshid13l1ra427k3eqt",
    submitLabel: "Submit"
  },
  theme: {
    page: {
      backgroundType: "color",
      backgroundGradient: {
        color1: '#2F80ED',
        color2: '#091E3A',
        type: 'linear',
        position1: 0,
        position2: 67,
        direction: 174
      },
      backgroundColor: "#008CBF",
      backgroundImage: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNjgyNDN8MHwxfGFsbHx8fHx8fHx8fDE2MzQ0OTM0Mjk&ixlib=rb-1.2.1&q=85", // URL
    },
    card: {
      cornersRadius: 30, //0-50
      border: {
        color: "#e3e3e3",
        width: 10
      },
      shadow: 24, //0-24
      revertToVerticalIfWidthBelow: 650,
      maxWidth: 800,
      maxHeight: 600, //ONLY USE THIS WHEN cover.position === 'left' or 'right'
      cover: {
        backgroundColor: "#ffffff",
        backgroundImage: "",
        position: "left", // top | left | right - which side of the card. On mobile it will always fall back to top
        width: 300, // only used for left/right position (horizontal). Overridden by 'widthCols' if both are defined
        widthCols: 5, //out of 12. Overrides 'width' if both are defined
        height: 300, //only used for top position
      },
      backgroundColor: "#ffffff99",
      backgroundImage: "",
      backdrop: "blur(8px)", // e.g. blur(2px) only usable if the page has an image bg and the card is semi transparent
    },
    inputs: {
      cornersRadius: 15, //0-30 NEW
      fill: 30, //-100 - 100 NEW -100 = full black; 100 = full white; 35=rgba(255,255,255,0.35)
      borderless: false,//DEPRECATED
      style: 'full', // line | full //NEW . note - 'full'='outline' in quasar, because then the whole frame is in focus
      labelStyle: 'top', //floating, stacked, top
      labelSize: 100,
      dark: false,
      dense: false,
      clearable: true
    },
    buttons: {
      cornersRadius: 36, //0-30 NEW
      backgroundColor: "#ffffff99",
      border: {
        color: "#000000",
        width: 10
      },
      shadow: 0, //0-24 DONE
      size: 4, //1-4 ["sm", "md", "lg", "xl"]
      textColor: "#19ef49",
      backTextColor: "#ff0000",
      padding: 5 // 1-5 ["q-px-xs", "q-px-sm", "q-px-md", "q-px-lg", "q-px-xl"]
    }
  },
  /* pages > sections (cards) > blocks */
  pages: [
    {
      type: "page",
      header: "Contact Us",
      subHeader: "This is a sub header for a page",
      buttonLabel: "Next",
      name: "page1",
      cover: {
        backgroundColor: "#ffffff",
        backgroundImage: "https://cdn.quasar.dev/img/parallax2.jpg",
        parallax: true,
      },
      backgroundColor: "#ffffff99",
      // backgroundImage: "",
      blocks: [
        {
          type: "html",
          name: "title",
          label: "",
          html: "<h3>Contact Us</h3>",
          behavior: {
            displayed: "on",
          },
          validations: [

          ],
        },
        {
          type: "text",
          name: "name",
          label: "What is your name?",
          hint: "So we know how to call you",
          placeholder: "John Doe",
          validations: [
            {
              "required": true,
              message: "Please provide your name",
              trigger: "submit"
            }
          ],
          behavior: {
            readOnly: "off",
            required: "off",
            clearable: "off",
            disabled: "off",
            displayed: "on",
            counter: "off"
          }
        },
        {
          type: "text",
          name: "name2",
          label: "What is your name?",
          hint: "So we know how to call you",
          placeholder: "John Doe",
          validations: [
            {
              "required": true,
              message: "Please provide your name",
              trigger: "submit"
            }
          ],
          behavior: {
            readOnly: "off",
            required: "off",
            clearable: "off",
            disabled: "off",
            displayed: "on",
            counter: "off"
          }
        },
        {
          type: "text",
          name: "name3",
          label: "What is your name?",
          hint: "So we know how to call you",
          placeholder: "John Doe",
          validations: [
            {
              "required": true,
              message: "Please provide your name",
              trigger: "submit"
            }
          ],
          behavior: {
            readOnly: "off",
            required: "off",
            clearable: "off",
            disabled: "off",
            displayed: "on",
            counter: "off"
          }
        }
      ]
    },
    {
      type: "page",
      header: "Page2",
      subHeader: "Page2 sub header",
      buttonLabel: "Finish",
      name: "page2",
      cover: {
        backgroundColor: "#ffffff",
        backgroundImage: "https://cdn.quasar.dev/img/parallax2.jpg",
        parallax: true,
      },
      backgroundColor: "#ffffff99",
      // backgroundImage: "",
      blocks: [
        {
          type: "select",
          name: "color",
          label: "Favourite color",
          hint: "So we can send you a t-shirt",
          placeholder: "Choose color",
          validations: [],
          behavior: {
            readOnly: "off",
            clearable: "on",
            disabled: "off",
            displayed: "on",
            counter: "on",
            multiple: true
          },
          options: ["blue", "green", "red", "purple", "pink", "orange"]
        },
        {
          type: "select",
          name: "color3",
          label: "Favourite color",
          hint: "So we can send you a t-shirt",
          placeholder: "Choose color",
          validations: [],
          behavior: {
            readOnly: "off",
            clearable: "on",
            disabled: "off",
            displayed: "on",
            counter: "on",
            multiple: false
          },
          options: ["blue", "green", "red", "purple", "pink", "orange"]
        },
        {
          type: "slider",
          name: "range",
          label: "What is your range?",
          hint: "Just so we know",
          markers: true,
          snap: true,
          min: 10,
          max: 80,
          step: 5,
          defaultValue: 55,
          thumbLabelPrefix: "$",
          thumbLabelSuffix: " /month",
          showThumbLabel: "always",
          reverse: false,
          range: false,
          validations: [],
          behavior: {
            readOnly: "off",
            clearable: "on",
            disabled: "off",
            displayed: "on",
            counter: "on",
          },
        },
        {
          type: "slider",
          name: "range2",
          label: "What is your range?",
          hint: "Just so we know",
          markers: true,
          snap: true,
          min: 10,
          max: 80,
          step: 5,
          defaultValue: {min:55, max:77},
          thumbLabelPrefix: "$",
          thumbLabelSuffix: " /month",
          showThumbLabel: "always",
          reverse: false,
          range: true,
          validations: [],
          behavior: {
            readOnly: "off",
            clearable: "on",
            disabled: "off",
            displayed: "on",
            counter: "on",
          },
        },
        {
          type: "radio",
          name: "color1",
          label: "What is your favourite colour?",
          labelSide: "left",
          inline: true,
          options: [
            {label: "Blue", value: "blue"},
            {label: "Green", value: "green"},
            {label: "Red", value: "red"}],
          hint: "Just so we know",
          validations: [],
          behavior: {
            readOnly: "off",
            clearable: "on",
            disabled: "off",
            displayed: "on",
            counter: "on",
          },
        },
        {
          type: "checkbox",
          name: "color2",
          label: "What are your favourite colours?",
          labelSide: "right",
          inline: false,
          options: [
            {label: "Blue", value: "blue"},
            {label: "Green", value: "green"},
            {label: "Red", value: "red"}],
          hint: "Just so we know",
          validations: [],
          behavior: {
            readOnly: "off",
            clearable: "on",
            disabled: "off",
            displayed: "on",
          },
        },
        {
          type: "toggle",
          name: "terms",
          labelSide: "right",
          inline: false,
          options: [
            {label: "I agree to the terms of use", value: "agree"}
          ],
          validations: [],
          behavior: {
            readOnly: "off",
            disabled: "off",
            displayed: "on",
          },
        }
      ]
    }
  ]
}

export default formSchema;
