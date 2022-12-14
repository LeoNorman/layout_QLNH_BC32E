// import Food from "../../models/v2/food.js"
import { Food } from '../../models/v2/food.js'
import { FoodList } from '../../models/v2/food-list.js'

const getElement = (id) => document.getElementById(id)

const inputs = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea')

const foodServices = new FoodList()

const renderFoodList = () => {
    // ES5
    // let htmlContent = ''
    // for (let i = 0; i < foodServices.foodList.length; i++) {
    //     const food = foodServices.foodList[i]
    //     htmlContent += `
    //         <tr>
    //             <td>${food.maMon}</td>
    //             <td>${food.tenMon}</td>
    //             <td>
    //                 <img src="${food.hinhAnh}" alt="..." />
    //             </td>
    //             <td>${food.mapLoaiMon()}</td>
    //             <td>${food.giaMon}</td>
    //             <td>${food.khuyenMai}</td>
    //             <td>${food.tinhGiaKhuyenMai()}</td>
    //             <td>${food.mapTinhTrang()}</td>
    //         </tr>
    //     `
    // }
    // ES6
    const content = foodServices.filterFood().reduce((value, food) => {
        return (value += `
        <tr>
            <td>${food.maMon}</td>
            <td>${food.tenMon}</td>
            <td>
                <img src="${food.hinhAnh}" alt="..." />
            </td>
            <td>${food.mapLoaiMon()}</td>
            <td>${food.giaMon}</td>
            <td>${food.khuyenMai}</td>
            <td>${food.tinhGiaKhuyenMai()}</td>
            <td>${food.mapTinhTrang()}</td>
            <td>
                <button 
                    class="btn btn-warning"
                    data-toggle="modal" 
                    data-target="#exampleModal"
                    onclick="editFood('${food.maMon}')"
                >
                    EDIT
                </button>
                <button 
                    class="btn btn-danger" 
                    onclick="removeFood('${food.maMon}')"
                >
                    DELETE
                </button>
            </td>
        </tr>
        `)
    }, '')

    getElement('tbodyFood').innerHTML = content
}

// L??u ??: Localstore kh??ng l??u ???????c method, ch??? l??u ???????c c??c thu???c t??nh
// l??u m???ng m??n ??n xu???ng local
const setLocalStore = () => {
    localStorage.setItem('foodList', JSON.stringify(foodServices.foodList))
}

// Get value t??? local
const getLocalStore = () => {
    const data = localStorage.getItem('foodList')
    const dataParse = JSON.parse(data) || []
    console.log(dataParse)
    // foodServices.foodList = dataParse
    // C1
    // dataParse.forEach(value => {
    //     const food = new Food()
    //     for(let key in value){
    //         food[key] = value[key]
    //     }
    //     foodServices.addFood(food)
    // })

    // C2 s??? d???ng h??m map => return v??? 1 m???ng m???i
    foodServices.foodList = dataParse.map((value) => {
        const food = new Food()
        for (let key in value) {
            food[key] = value[key]
        }
        return food
    })

    renderFoodList()
}
getLocalStore()

//  l???y value t??? input

const getFormValues = () => {
    const food = new Food()
    inputs.forEach((val) => {
        // s??? d???ng destructuring
        const { name, value } = val
        food[name] = value
    })
    return food
}

getElement('btnThem').onclick = () => {
    getElement('exampleModalLabel').innerHTML = 'Th??m m??n ??n'
    getElement('btnCapNhat').style.display = 'none'
    getElement('btnThemMon').style.display = 'block'

    inputs.forEach((input) => {
        const { name } = input
        if (name === 'maMon') {
            input.disabled = false
        }
        input.value = ''
    })
}

// th??m m??n ??n
getElement('btnThemMon').onclick = () => {
    // const inputs = document.querySelectorAll(
    //     '#foodForm input, #foodForm select, #foodForm textarea'
    // )
    // const food = new Food()
    // inputs.forEach((val) => {
    //     // s??? d???ng destructuring
    //     const { name, value } = val
    //     food[name] = value
    // })

    const food = getFormValues()
    foodServices.addFood(food)

    // console.log(foodServices.foodList)

    renderFoodList()
    setLocalStore()
    //  ????ng modal sau khi th??m m??n th??nh c??ng
    getElement('btnClose').click()
}

// c???p nh???t m??n ??n
getElement('btnCapNhat').onclick = () => {
    // console.log('button cap nhat')
    // const inputs = document.querySelectorAll(
    //     '#foodForm input, #foodForm select, #foodForm textarea'
    // )
    // const food = new Food()
    // inputs.forEach((val) => {
    //     // s??? d???ng destructuring
    //     const { name, value } = val
    //     food[name] = value
    // })

    const food = getFormValues()
    foodServices.updateFood(food)
    renderFoodList()
    setLocalStore()

    // ????ng modal sau khi c???p nh???t th??nh c??ng
    getElement('btnClose').click()
}

window.removeFood = (maMon) => {
    // console.log(maMon)
    foodServices.removeFood(maMon)
    renderFoodList()
    setLocalStore()
}

// window.removeFood = removeFood

window.editFood = (maMon) => {
    // ???n button th??m
    getElement('btnThemMon').style.display = 'none'
    getElement('btnCapNhat').style.display = 'block'
    getElement('exampleModalLabel').innerHTML = 'C???p nh???t m??n ??n'

    //t??m m??n ??n ??ang ???????c nh???n edit
    const food = foodServices.findFood(maMon)

    // dom ?????n c??c inputs ??? modal
    // const inputs = document.querySelectorAll(
    //     '#foodForm input, #foodForm select, #foodForm textarea'
    // )

    // ch???y v??ng l???p, g??n gi?? tr??? cho c??c input
    inputs.forEach((input) => {
        // destructuring
        const { name } = input
        if (name === 'maMon') {
            input.disabled = true
        }
        input.value = food[name]
        // console.log(name)
    })
}

getElement("selLoai").onchange = () =>{
    const loai = getElement("selLoai").value 
    // console.log(loai)
    foodServices.selectedType = loai
    renderFoodList()
}

// const student = {
//     name: 'Viet Hai',
//     age: 18
// }

// // const name  = student.name
// // const age = student.age

// const {name: name123, age} = student
