/* eslint-disable */
/**
 * useEventListener 优雅使用 addEventListener 的 Hook。
 * @param eventName  事件名称
 * @param handler  处理函数 
 * @param target Ref 对象（可选）
 * @param options -> target Ref 对象
 */
import { useState, useEffect, useRef } from 'react';

const useEventListener = (eventName, handler, target = '') => {
    const [first, setFirst] = useState(1); // 防止第一次执行 

    useEffect(() => {
        setFirst(0)
    }, [])

    useEffect(() => {
        if (!eventName) return

        // 返回的 target 为空则绑定到 addEventListener
        if (!target) {
            document.addEventListener("keydown", (e) => {
                return handler(e)
            })

            return
        }

        target.current[eventName] = () => handler()

    })


};


export default useEventListener