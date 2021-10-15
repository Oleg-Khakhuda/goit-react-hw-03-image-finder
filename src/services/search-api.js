import axios from 'axios';

export class PixabayFetch {
  constructor() {
    this.base_url = `https://pixabay.com/api/`;
    this.api_key = `22572278-f825929a97bc5f7e53341dcc7`;
    this._searchQuery = '';
    this._page = 1;
    this._perPage = 12;
  }
  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    return (this._page = 1);
  }

  async searchImages() {
    const url = `${this.base_url}?q=${this._searchQuery}&page=${this.page}&key=${this.api_key}&image_type=photo&orientation=horizontal&per_page=${this._perPage}`;

    try {
      const result = await axios.get(url);
      const data = result.data.hits;
      return data;
    } catch (error) {
      return error.message;
    }
  }
}
