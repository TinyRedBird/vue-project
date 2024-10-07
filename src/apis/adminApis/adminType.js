import request from '@/utils/request'

export const getTypeListService=(key)=>{
    return request.get('/admin/type',{
        params:key
    })
}

export const editTypeService=(data)=>{
    return request.put('/admin/type',data)
}

export const addTypeService=(data)=>{
    return request.post('/admin/type',data)
}

export const delTypeService=(id)=>{
    return request.delete(`/admin/type/${id}`)
}
