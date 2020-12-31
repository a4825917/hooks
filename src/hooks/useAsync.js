/* eslint-disable */
/**
 * useAsync 管理异步方法的 Hook
 * @param  asyncFunction  请求的 Promise
 * @param { options } 
 * @param options -> onSuccess  请求成功的回调
 * @param options -> onError  请求失败的回调
 * @param options -> manual  是否第一次进入时加载
 * 
 * @result data 成功
 * @result error 失败
 * @result run(param) 执行方法
 * @result loading loading 
 */
import { useState, useEffect, useRef } from 'react';

export const useAsync = (asyncFunction, options = {}) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { manual = true, onSuccess, onError } = options;
  const [useManual, setManual] = useState(manual);
  const [params, setParams] = useState({});
  const count = useRef(0);  // ref对象的值发生改变之后，不会触发组件重新渲染，他可以作为任何值的容器

  const fun = () => {
    setLoading(true);
    const currentCount = count.current;

    asyncFunction(params)
      .then((response) => {
        if (currentCount !== count.current) return;

        setValue(response);
        onSuccess && onSuccess(response, params);
      })
      .catch((error) => {
        if (currentCount !== count.current) return;
        setError(error);
        onError && onError(error, params);
      })
      .finally(() => {
        if (currentCount !== count.current) return;
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!useManual) {
      return;
    }



    fun();

    return () => {
      count.current += 1;
    };
  }, []);

  useEffect(() => {
    if (!useManual) {
      setManual(true);
      return;
    }

    fun();

    return () => {
      count.current += 1;
    };
  }, [params]);

  const run = (params = {}) => {
    // 判断第一次进入函数是否加载数据
    if (!useManual) {
      setManual(true);
      return;
    }

    console.log(params.flag, 'params---------------')

    setParams(JSON.parse(JSON.stringify(params)));
  };

  return { data: value, loading, error, run };
};
