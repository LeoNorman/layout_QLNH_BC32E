class Food {
    constructor(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa) {
        this.maMon = maMon
        this.tenMon = tenMon
        this.loaiMon = loaiMon
        this.giaMon = giaMon
        this.khuyenMai = khuyenMai
        this.tinhTrang = tinhTrang
        this.hinhAnh = hinhAnh
        this.moTa = moTa

        this.giaKhuyenMai = this.tinhGiaKhuyenMai()
    }
    tinhGiaKhuyenMai() {
        return this.giaMon * (1 - this.khuyenMai / 100)
    }

    mapTinhTrang() {
        return this.tinhTrang === '0' ? 'Hết' : 'Còn'
    }

    mapLoaiMon() {
        return this.loaiMon === 'loai1' ? 'Chay' : 'Mặn'
    }
}
