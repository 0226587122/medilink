import api from './client'
export async function login(username: string, password: string) {
  const { data } = await api.post('/auth/token/', { username, password })
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
}
export function logout(){
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}