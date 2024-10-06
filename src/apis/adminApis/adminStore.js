import request from '@/utils/request'

export const getStoreListService=(params)=>{
    return request.get('admin/store',{
        params:params
    })
}

export const addStoreService=(data)=>{
    return request.post('/admin/store',data)
}

export const editStoreService=(data)=>{
    return request.put('/admin/store',data)
}

export const delStoreService=(id)=>{
    return request.delete(`/admin/store/${id}`)
}