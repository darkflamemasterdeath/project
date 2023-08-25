let Mypuls = {}
Mypuls.install = function (Vue, options) {
    Vue.directive(options.name, (element, params) => {
        console.log('执行')
        // element.innerHTML = params.value + '123'
        // console.log('element', element)
        // console.log('bbbbbbbbb', params)
    })
}
export default Mypuls