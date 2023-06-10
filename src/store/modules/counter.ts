import { defineStore } from "pinia";
import { setStorage, setCookieItem } from '@/utils/common'
const useCounterStore = defineStore('counter', {
    persist: true,
    state: () => {
        return {
            count: 13,
            themeMode: "sun", //sun 日光模式 moon 月光模式
        }
    },
    actions: {
        increment() {
            this.count++
        },
        switch_themeMode() {
            if (this.themeMode == 'sun') {
                this.themeMode = 'moon'
                setCookieItem('themeMode', this.themeMode)
                return this.themeMode
            } else {
                this.themeMode = 'sun'  //日光模式
                setCookieItem('themeMode', this.themeMode)
                return this.themeMode
            }
        },
    }
})

export default useCounterStore