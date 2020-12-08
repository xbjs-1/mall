import {request} from "@/network/request";

const getCategoryData = function () {
  return request({
    url: 'category'
  })
}

//  子菜单里的品类数据
const getSubCategoryData = function (maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

const getCategoryDetail =  function(miniWallKey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallKey,
      type
    }
  })
}
export {
  getCategoryData,
  getSubCategoryData,
  getCategoryDetail
}
