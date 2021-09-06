// @flow

type TToPromiseParams = (resolve: any, reject: any) => void;
const toPromise = (promise: TToPromiseParams) => new Promise < any > (promise);

export default toPromise;
