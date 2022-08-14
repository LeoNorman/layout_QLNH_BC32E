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

// Lưu ý: Localstore không lưu được method, chỉ lưu được các thuộc tính
// lưu mảng món ăn xuống local
const setLocalStore = () => {
    localStorage.setItem('foodList', JSON.stringify(foodServices.foodList))
}

// Get value từ local
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

    // C2 sử dụng hàm map => return về 1 mảng mới
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

//  lấy value từ input

const getFormValues = () => {
    const food = new Food()
    inputs.forEach((val) => {
        // sử dụng destructuring
        const { name, value } = val
        food[name] = value
    })
    return food
}

getElement('btnThem').onclick = () => {
    getElement('exampleModalLabel').innerHTML = 'Thêm món ăn'
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

// thêm món ăn
getElement('btnThemMon').onclick = () => {
    // const inputs = document.querySelectorAll(
    //     '#foodForm input, #foodForm select, #foodForm textarea'
    // )
    // const food = new Food()
    // inputs.forEach((val) => {
    //     // sử dụng destructuring
    //     const { name, value } = val
    //     food[name] = value
    // })

    const food = getFormValues()
    foodServices.addFood(food)

    // console.log(foodServices.foodList)

    renderFoodList()
    setLocalStore()
    //  đóng modal sau khi thêm món thành công
    getElement('btnClose').click()
}

// cập nhật món ăn
getElement('btnCapNhat').onclick = () => {
    // console.log('button cap nhat')
    // const inputs = document.querySelectorAll(
    //     '#foodForm input, #foodForm select, #foodForm textarea'
    // )
    // const food = new Food()
    // inputs.forEach((val) => {
    //     // sử dụng destructuring
    //     const { name, value } = val
    //     food[name] = value
    // })

    const food = getFormValues()
    foodServices.updateFood(food)
    renderFoodList()
    setLocalStore()

    // đóng modal sau khi cập nhật thành công
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
    // ẩn button thêm
    getElement('btnThemMon').style.display = 'none'
    getElement('btnCapNhat').style.display = 'block'
    getElement('exampleModalLabel').innerHTML = 'Cập nhật món ăn'

    //tìm món ăn đang được nhấn edit
    const food = foodServices.findFood(maMon)

    // dom đến các inputs ở modal
    // const inputs = document.querySelectorAll(
    //     '#foodForm input, #foodForm select, #foodForm textarea'
    // )

    // chạy vòng lặp, gán giá trị cho các input
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
