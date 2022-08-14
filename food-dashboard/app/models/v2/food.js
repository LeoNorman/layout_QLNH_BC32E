/* 
    1. export default
        - Có thể đổi tên phần tử export khi import, không để trong dấu {}
        - Trong 1 file chỉ có thể sử dụng export default duy nhất 1 lần
    2. export ko default
        - không thể đổi tên khi import và phải nằm trong dấu {}
        - Trong 1 file có thể export nhiều thành phần
*/

export class Food {
    constructor() {}
    maMon = ''
    tenMon = ''
    loaiMon = ''
    giaMon = ''
    khuyenMai = ''
    tinhTrang = ''
    hinhAnh = ''
    moTa = ''

    tinhGiaKhuyenMai() {
        return this.giaMon * (1 - this.khuyenMai / 100)
    }

    mapTinhTrang() {
        return this.tinhTrang === '0' ? 'Hết' : 'Còn'

        // if(this.tinhTrang === '0'){
        //     return 'Hết'
        // }else{
        //     return 'Còn'
        // }
    }

    mapLoaiMon() {
        return this.loaiMon === 'loai1' ? 'Chay' : 'Mặn'
    }
}
