import request from '@/utils/request'

export const getGoodsListService=(params)=>{
    return request.get('admin/goods',{
        params:params
    })
}

export const editGoodsService=(data)=>{
    return request.put('/admin/goods',data)
}

export const addGoodsService=(data)=>{
    return request.post('/admin/goods',data)
}

export const delGoodsService=(id)=>{
    return request.delete(`/admin/goods/${id}`)
}