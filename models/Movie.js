

class Movie {
    constructor(id, title, director, year, notes) {
      this.id = id;
      this.title = title;
      this.director = director;
      this.year = year;
      this.notes = notes || '';
      this.created_at = new Date().toLocaleString();
      this.modified_at = new Date().toLocaleString();
    }
  }
  module.exports = Movie;