
 export default function getToken() {
    const tokenString = sessionStorage.getItem('moneyTrackertoken')
    return tokenString!==undefined && tokenString?tokenString.replace('"','').replace('"',''):false
  }