module.exports = {
  parseCommentaries (file) {
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
        let prop;
        prop.type = type;
        prop.title = title;
        prop.description = description;
        object.props.push(prop);
      })

    })
  }
}