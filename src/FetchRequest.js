class FetchRequest {
  constructor(url) {
    this.url = url;
  }

  _doNothing() {}

  postJson(items, handleResponse = this._doNothing) {
    const config = { method: "POST", body: JSON.stringify(items) };
    fetch(this.url, config)
      .then(res => res.json())
      .then(json => {
        handleResponse(json);
      });
  }
}

export default FetchRequest;
