import config from '@/configs'
import request from '@/utils/request';
import AuthenticationUtils from '@/utils/AuthenticationUtils'
import { AxiosResponse } from 'axios';

export default class BaseRequest {
  getModelName() {
    throw new Error('This method should be implemented in derived method.')
  }
  
  getUrlPrefix() {
    return `${config.API_DOMAIN}/api`
  }

  async get(url: string, params = {}) {
    try {
      const config = { params: params }
      const response = await request.get(this.getUrlPrefix() + url, config)
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async put(url: string, data = {}) {
    try {
      let response: AxiosResponse
      if (data.toLocaleString() === '[object FormData]') {
        response = await request.put(this.getUrlPrefix() + url, data)
      } else {
        response = await request.put(this.getUrlPrefix() + url, data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      }
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async post(url: string, data = {}) {
    try {
      const response = await request.post(this.getUrlPrefix() + url, data)
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async delete(url: string, data = {}) {
    try {
      const response = await request.delete(this.getUrlPrefix() + url, { data })
      return this._responseHandler(response)
    } catch (error) {
      this._errorHandler(error)
    }
  }

  async _responseHandler(response: AxiosResponse) {
    return response.data
  }

  _errorHandler(err: any) {
    // if (err.response && err.response.status === 401) {
    //   window.location.reload()
    // }
    if (err.response && err.response.status === 500) {
      AuthenticationUtils.removeAuthenticationData()
      window.localStorage.clear();
    }
    throw err
  }
}
