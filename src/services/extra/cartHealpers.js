export const getItemTotal = item => {
  if (item) {
    if (item.saleprice)
      return parseFloat(item.saleprice) * parseFloat(item.qty.value);
    else if (item.regularprice)
      return parseFloat(item.regularprice) * parseFloat(item.qty.value);
  }
  return 0;
};

export const returnSubTotal = items => {
  // amount =
  return items
    .map(el => {
      if (el) {
        if (el.saleprice)
          return parseFloat(el.saleprice) * parseFloat(el.qty.value);
        else if (el.regularprice)
          return parseFloat(el.regularprice) * parseFloat(el.qty.value);
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
};

export const variablePriceSet = productItem => {
  if (productItem) {
    let tempVariable = { ...productItem };
    if (productItem.producttype === "variable") {
      if (productItem.size && productItem.extract_flavor) {
        productItem.variation.map(el => {
          if (el) {
            if (
              el.size === productItem.size.value &&
              el.extract_flavor === productItem.extract_flavor.value
            ) {
              tempVariable = {
                ...productItem,
                regularprice: el.regular_price,
                saleprice: el.sale_price
              };
            }
          }
        });
      } else if (productItem.size) {
        productItem.variation.map(el => {
          if (el) {
            if (el.size === productItem.size.value) {
              tempVariable = {
                ...productItem,
                regularprice: el.regular_price,
                saleprice: el.sale_price
              };
            }
          }
        });
      } else if (productItem.extract_flavor) {
        productItem.variation.map(el => {
          if (el) {
            if (el.extract_flavor === productItem.extract_flavor.value) {
              tempVariable = {
                ...productItem,
                regularprice: el.regular_price,
                saleprice: el.sale_price
              };
            }
          }
        });
      }
    }
    // console.log({tempVariable})
    return tempVariable;
  }
};
