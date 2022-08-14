const getElement = (id) => {
    return document.getElementById(id)
}

getElement('btnThemMon').onclick = () => {
    const maMon = getElement('foodID').value
    const tenMon = getElement('tenMon').value
    const loaiMon = getElement('loai').value
    const giaMon = getElement('giaMon').value
    const khuyenMai = getElement('khuyenMai').value
    const tinhTrang = getElement('tinhTrang').value
    const hinhAnh = getElement('hinhMon').value
    const moTa = getElement('moTa').value

    const food = new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)
    // console.log({food})

    getElement('imgMonAn').src = food.hinhAnh
    getElement('spMa').innerHTML = food.maMon
    getElement('spTenMon').innerHTML = food.tenMon
    getElement('spLoaiMon').innerHTML = food.mapLoaiMon()
    getElement('spGia').innerHTML = food.giaMon
    getElement('spKM').innerHTML = food.khuyenMai
    getElement('spGiaKM').innerHTML = food.giaKhuyenMai
    getElement('spTT').innerHTML = food.mapTinhTrang()
    getElement('pMoTa').innerHTML = food.moTa
}
