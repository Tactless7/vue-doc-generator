/**
* @name Example Component
* @desc This component is manily used to display 'Hello World'
* @prop {String} preMessage Message included before Hello World
* @prop {Integer} postMessage Message included after Hello World
* @component {Required} componentA
* @component {Optional} componentB
* @event eventName This event is emitted when message is printed
*/
<template>
  <div id="app">
    <div id="grid"></div>
    <div id="right"></div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        message: 'Hello Vue!'
      }
    },
    props: ['preMessage', 'postMessage'],
    created () {
      console.log(preMessage, message, postMessage)
    }
  }
</script>