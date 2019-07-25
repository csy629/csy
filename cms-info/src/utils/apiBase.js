/**
 * Created by Hang on 2018/5/30 0030.
 */
import Vue from 'vue'

export default function apiBase() {
  let api='https://getaway.krhanedu.com'

  if(location.host === '192.168.0.112:9528' || location.host === 'newscmstest.krhanedu.com') {

    api='http://getawaytest.krhanedu.com'

  }
  
  return api
}

Vue.prototype.apiBase = apiBase();                                                                 
