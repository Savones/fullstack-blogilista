import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLike = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const id = blogObject.id

  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const deleteBlog = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const id = blogObject.id

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, updateLike, deleteBlog }