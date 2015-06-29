export default function mockRequest(err, res) {

  return {

    // Initial data
    url: null,
    headers: {},
    data: null,
    method: null,


    // Requests
    post(url) {
      this.url = url
      this.method = 'POST'
      return this
    },

    get(url) {
      this.url = url
      this.method = 'GET'
      return this
    },

    put(url) {
      this.url = url
      this.method = 'PUT'
      return this
    },

    del(url) {
      this.url = url
      this.method = 'DELETE'
      return this
    },


    // Set request headers and data
    set(key, val) {
      this.headers[key] = val
      return this
    },

    send(data) {
      this.data = data
      return this
    },

    query(query) {
      this.query = query
      return this
    },


    // Finish request
    end(cb) {
      cb(err, res)
      return this
    }
  }
}
