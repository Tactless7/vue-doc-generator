const fs = require('fs');

module.exports = {
  parseFile (path) {
    const file = fs.readFileSync(path, 'utf8');
    const commentBlock = this.parseCommentaries(file);
  },
  parseCommentaries (text) {
    let object = {};
    text = text.replace(/(?:\/\*\*)((?:.|\n)*?)(?:\*\/)/gm, (match, content) => {

      content.replace(/(?:@name:(?: |))((.|\n)*?)(?:\n)/m, (match, name) => {
        object.name = name;
      });

      content.replace(/(?:@description:(?: |))((.|\n)*?)(?:\n)/m, (match, description) => {
        object.description = description;
      });

      content.replace(/(?:@prop )(?:{)(.*)(?:})(?:(?: |))(.*?(?= - ))(?: - )(.*)/gm, (match, type, title, description) => {
        if (!object.props) { object.props = [] }
        let prop = {};
        prop.type = type;
        prop.title = title;
        prop.description = description;
        object.props.push(prop);
      })

      content.replace(/(?:@component )(?:(?: |))(.*?(?= - ))(?: - )(.*)/gm, (match, name, required) => {
        if (!object.components) { object.components = [] }
        let component = {};
        component.name = name;
        component.required = required === 'required' ? true : false;
        object.components.push(component);
      })

      content.replace(/(?:@event)(?:(?: |))(.*?(?= \())(?: \()(.*?(?=\) - ))(?:\) - )(.*)/gm, (match, name, args, description) => {
        if(!object.events) { object.events = [] }
        let event = {};
        event.name = name;
        event.description = description;
        args.replace(/(?:\,\ |)(.*?(?=\ \{)) (?:\{)(.*?(?=\}))(?:\})/gm, (match, name, type) => {
          if(!event.arguments) { event.arguments = [] }
          let argument = {};
          argument.name = name;
          argument.type = type;
          event.arguments.push(argument);
        });
        object.events.push(event);
      })
    })

    return object;
  }
}