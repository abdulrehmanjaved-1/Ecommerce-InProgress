// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("/products");
//     const data = await response.json();
//     resolve({ data });
//   });
// }
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsBySearch(search) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/product/search?product=${search}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(searchQuery, filter, sort, pagination, admin) {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // Check if searchQuery is defined before adding it to queryString
  if (searchQuery !== undefined) {
    queryString += `product=${searchQuery}&`;
  }

  console.log(pagination);
  console.log('search is', searchQuery);

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    // TODO: we will not hard-code server URL here
    const response = await fetch(`/products?${queryString}`);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
// export function fetchProductsByFilters(searchQuery,filter, sort, pagination,admin) {
//   let queryString = "";
//   for (let key in filter) {
//     const categoryValues = filter[key];
//     if (categoryValues.length) {
//       queryString += `${key}=${categoryValues}&`;
//     }
//   }
//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }
//   // for (let key in searchQuery) {
//   //   queryString += `product=${searchQuery[key]}&`;
//   // }
//   console.log(pagination)
//   console.log('search is',searchQuery)

//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }
//   if(admin){
//     queryString += `admin=true`;
//   }
//   return new Promise(async (resolve) => {
//     //TODO: we will not hard-code server URL here
//     if(searchQuery!==undefined){
//       const response = await fetch(
//         `/products?` + queryString + `product=${searchQuery}&`
//       );
//     }else{
//       const response = await fetch(
//         `/products?` + queryString + `product=${searchQuery}&`
//       );
//     }
//     const data = await response.json();
//     const totalItems = await response.headers.get('X-Total-Count')
//     resolve({data:{products:data,totalItems:+totalItems}})
//   });
// }
