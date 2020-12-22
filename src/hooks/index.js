/*
 * @Author: your name
 * @Date: 2020-12-22 15:41:54
 * @LastEditTime: 2020-12-22 18:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hooks\src\hooks\index.js
 *
 * https://zhuanlan.zhihu.com/p/141673983
 */
import { useState, useCallback, useEffect, useRef } from 'react';

export const useAsync = (asyncFunction, options = {}) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { manual = true, onSuccess, onError } = options;
  const [useManual, setManual] = useState(manual);
  const [params, setParams] = useState({});
  const count = useRef(0);

  const fun = () => {
    setLoading(true);
    console.log('??????????');
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

    console.log(params, 'paramsparams')

    setParams(JSON.parse(JSON.stringify(params)));
  };

  return { data: value, loading, error, run };
};
