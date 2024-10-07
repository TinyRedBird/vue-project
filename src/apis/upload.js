import request from '@/utils/request'

export const uploadService = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}