class ApiFeatures {
  constructor(mongooseQuery, queryString, pagination) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.pagination = pagination;
  }

  filter() {
    let queryStr = { ...this.queryString };
    const excludesKeys = ["limit", "page", "fields", "sort", "keyword"];

    excludesKeys.forEach((key) => delete queryStr[key]);
    queryStr = JSON.stringify(queryStr);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);
    this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(`${sortBy}`);
    } else {
      this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitingFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(keywords) {
    if (this.queryString.keyword) {
      const query = {};
      query.$or = keywords;

      this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(itemsCount) {
    const pageIndex = +this.queryString.page || 1;
    const itemsPerPage = +this.queryString.limit || 50;
    const skip = itemsPerPage * (pageIndex - 1);
    const lastIndexOfReturnedItems = pageIndex * itemsPerPage;
    // Pagination Result
    const pagination = {};
    pagination.currentPage = pageIndex;
    pagination.limit = itemsPerPage;
    pagination.pagesCount = Math.ceil(itemsCount / itemsPerPage);

    if (lastIndexOfReturnedItems < itemsCount) {
      pagination.nextPage = pageIndex + 1;
    }
    if (skip > 0) {
      pagination.prev = pageIndex - 1;
    }
    this.mongooseQuery.skip(skip).limit(itemsPerPage);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
