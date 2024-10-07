import request from '@/utils/request'

export const getBannerService=()=>{
    return request.get('/sys/banner')
}

export const addBannerService=(url)=>{
    const params=new URLSearchParams()
    params.append('url',url)
    return request.post('/sys/banner',params)
}

export const changeShowBannerService=(id)=>{
    const params=new URLSearchParams()
    params.append('id',id)
    return request.put('/sys/banner',params)
}

export const delBannerService=(id)=>{
    return request.delete(`/sys/banner/${id}`)
}