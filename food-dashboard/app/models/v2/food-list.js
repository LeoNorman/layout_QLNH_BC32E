export class FoodList {
    constructor() {}
    foodList = []
    selectedType = 'all'

    addFood(food) {
        // ES5
        // this.foodList = this.foodList.push(food)

        // ES6 - sử dụng spread operator
        this.foodList = [...this.foodList, food]
    }

    removeFood(maMon) {
        //ES5
        // this.foodList.splice(index, 1)

        // ES6 = sử dụng hàm filter => trả về 1 mảng [food]
        // this.foodList = this.foodList.filter((food)=>{
        //     if(food.maMon === maMon){
        //         return false
        //     }
        //     return true
        // })

        this.foodList = this.foodList.filter((food) => food.maMon !== maMon)
    }

    updateFood(food) {
        this.foodList = this.foodList.map((value) => {
            // if(value.maMon === food.maMon){
            //     return food
            // }
            // return value
            return value.maMon === food.maMon ? food : value
        })
    }

    findFood(maMon) {
        //  find : nếu có => trả về phần tử trong mảng,
        // ngược lại trả về undefined
        // return this.foodList.find((food)=>{
        //     if(food.maMon === maMon){
        //         return true
        //     }
        //     return false
        // })
        return this.foodList.find((food) => food.maMon === maMon)
    }

    filterFood(){
        return this.foodList.filter((food)=>{
            if(this.selectedType === 'all'){
                return true
            }
            if(this.selectedType === food.loaiMon){
                return true
            }
            return false
        })

    }
}
