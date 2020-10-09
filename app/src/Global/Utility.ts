/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
class Utility {
  parseQueryString(path: string) {
    const parsedQueryString: any = {};

    const queryString = path?.split('?')[1];
    const queryStringList = queryString?.split('&');

        queryStringList?.forEach((item) => {
          const key = item.split('=')[0];
          const value = item.split('=')[1];
          parsedQueryString[decodeURIComponent(key)] = this.decodeValue(value);
        });

        return parsedQueryString;
  }

  decodeValue(value : any) {
    const decodedValue = decodeURIComponent(value || '');
    try {
      return JSON.parse(decodedValue);
    } catch (e) {
      return decodedValue;
    }
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
  }
}

export default new Utility();
