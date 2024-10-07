import request from '@/utils/request'

export const getUserListService=(params)=>{
    return request.get('admin/user',{
        params:params
    })
}

export const editUserService=(data)=>{
    return request.put('/admin/user',data)
}

export const addUserService=(data)=>{
    return request.post('/admin/user',data)
}

export const delUserService=(id)=>{
    return request.delete(`/admin/user/${id}`)
}