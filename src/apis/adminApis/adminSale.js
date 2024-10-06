import request from '@/utils/request'

export const getSaleListService=(parems)=>{
    return request.get('/admin/sale',{
        params:parems
    })
}

export const editSaleService=(data)=>{
    return request.put('/admin/sale',data)
}

export const addSaleService=(data)=>{
    return request.post('/admin/sale',data)
}

export const delSaleService=(storeId,goodsId)=>{
    return request.delete('/admin/sale',{
        params:{
            storeId:storeId,
            goodsId:goodsId
        }
    })
}
