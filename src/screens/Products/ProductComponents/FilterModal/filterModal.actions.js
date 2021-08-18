export const handleCheck = (params) => {
  const exists = params.checked.find((e) => e.id == params.mealType);
  if (!exists) {
    params.setChecked([
      {
        id: params.mealType,
        check: true,
      },
    ]);
  }
  if (params.mealType == 'veg') {
    let filtered = params.products.filter((e) => e.is_veg);
    params.setProducts(filtered);
    params.setModalVisible(!params.modalVisible);
  } else if (params.mealType == 'nonveg') {
    let filtered = params.products.filter((e) => e.is_veg == 0);
    params.setProducts(filtered);
    params.setModalVisible(!params.modalVisible);
  } else if (params.mealType == 'all') {
    params.setProducts(params.products);
    params.setModalVisible(!params.modalVisible);
  }
};
