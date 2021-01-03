
import React, { useState, useEffect, useRef } from "react";

export default function Effect() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const latestCount = useRef(null);

    /**
     * 每次 count2 发生改变都会触发 useEffect 生成一个新的 Effect
     * 因此每次渲染的 Effect 都是不同的 Effect，Effect 中的 state 和 props，都是特定的那次渲染的 state 和 props
     * 
     * React 会在执行当前 effect 之前对上一个 effect 进行清除
     * 
     * tips：useEffect 第二个参数最好别传引用类型，如果在 useEffect 再次 set 引用类型参数会造成死循环。
     * {} === {} false 堆栈问题
     */
    useEffect(() => {
        // 如果想在异步请求中获取当前最新的 state 或者 props
        // hooks 中的 ref 不仅可以保存dom元素，他可以作为任何值的容器
        latestCount.current = count;

        setTimeout(() => {
            console.log(`count1=======${count}----count2=======${count2}-----useRef====${latestCount.current}`)
        }, 3000);
    }, [count2])

    return <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            count1
         </button>

        <button onClick={() => setCount2(count2 + 1)}>
            count2
         </button>
    </div>
}