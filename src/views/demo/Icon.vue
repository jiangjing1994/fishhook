<template>
  <div style="text-align: left">
    <KemTree :data="baseData" show-checkbox></KemTree>
    <ViewTree :data="baseData" show-checkbox></ViewTree>
  </div>
 </template>


 <script>
 export default {
   name: 'KemIcon',

   data () {
     return {
       baseData: [{
         expand: true,
         title: 'parent 1',
         children: [{
           title: 'parent 1-0',
           expand: true,
           disabled: true,
           children: [{
             title: 'leaf',
             disableCheckbox: true
           }, {
             title: 'leaf',
           }]
         }, {
           title: 'parent 1-1',
           expand: true,
           checked: true,
           children: [{
             title: '<span style="color: red">leaf</span>',
           }]
         }]
       }]
     }
   }
 }
 </script>

 <style lang="scss" scoped>

</style>
