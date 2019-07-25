import request from '@/utils/request'

/**
 *
 * 获取公开课列表
 *
 */
export function getPublicClass(data) {
  return request({
    url: '/cms/publicClass/getPublicClass',
    method: 'post',
    data,
  })
}

/**
 *
 * 新增公开课
 *
 */
export function createPublicClass(data) {
  return request({
    url: '/cms/publicClass/createPublicClass',
    method: 'post',
    data,
  })
}

/**
 *
 * 编辑公开课
 *
 */
export function editPublicClass(data) {
  return request({
    url: '/cms/publicClass/editPublicClass',
    method: 'post',
    data,
  })
}

/**
 *
 * 删除公开课
 *
 */
export function deletePublicClass(data) {
  return request({
    url: '/cms/publicClass/deletePublicClass',
    method: 'post',
    data,
  })
}


/**
 *
 * 公开课排序
 *
 */
export function publicClassSort(data) {
  return request({
    url: '/cms/publicClass/publicClassSort',
    method: 'post',
    data,
  })
}


/**
 *
 * 新增公开课上传图片
 *
 */
export function uploadFile(data) {
  return request({
    url: '/cms/publicClass/uploadFile',
    method: 'post',
    data,
  })
}

/**
 *
 * 获取科目
 *
 */
export function getSubject(data) {
  return request({
    url: '/cms/publicClass/getSubject',
    method: 'post',
    data,
  })
}

/**
 *
 * 获取年级
 *
 */
export function getGrade(data) {
  return request({
    url: '/cms/publicClass/getGrade',
    method: 'post',
    data,
  })
}
